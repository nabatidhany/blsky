"use client";
import React, { useEffect, useRef, useState } from "react";

interface Chat {
  id: number;
  message: string;
  sender: string;
}

export default function Index({ id }: { id: string }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [message, setMessage] = useState("");
  const [isFlashing, setIsFlashing] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const savedChats = localStorage.getItem("chats");
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    }

    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.current.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);

        if (data.from && data.to && data.message) {
          if (data.from !== id) {
            setChats((prevChats) => {
              const updatedChats = [
                ...prevChats,
                {
                  id: prevChats.length + 1,
                  message: data.message,
                  sender: data.from,
                },
              ];
              localStorage.setItem("chats", JSON.stringify(updatedChats));
              return updatedChats;
            });

            setIsFlashing(true);
            setTimeout(() => setIsFlashing(false), 300);
          }
        }
      } catch (error) {
        console.error("Invalid JSON received:", event.data);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    return () => {
      ws.current?.close();
    };
  }, [id]);

  const handleSend = () => {
    if (ws.current && message.trim() !== "") {
      const payload = {
        senderId: id,
        targetId: id === "left" ? "right" : "left",
        message: message,
      };
      ws.current.send(JSON.stringify(payload));

      setChats((prevChats) => {
        const updatedChats = [
          ...prevChats,
          { id: prevChats.length + 1, message: message, sender: id },
        ];
        localStorage.setItem("chats", JSON.stringify(updatedChats));
        return updatedChats;
      });
      setMessage("");
    }
  };

  return (
    <div className="w-full border border-gray-300 bg-white h-full relative rounded-md overflow-hidden shadow-md">
      {
        isFlashing && (
          <div
            className={`absolute left-0 right-0 bottom-0 top-0 ${
              isFlashing ? "flash-background" : "display-none"
            } text-center text-sm px-2 py-1`}
          ></div>
        )
      }
      <div className="px-2 py-2 h-screen overflow-y-scroll pb-56">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-message flex gap-2 ${
              chat.sender === id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-2 py-2 rounded-md ${
                chat.sender === id
                  ? "bg-gray-200"
                  : "bg-blue-600 text-white"
              }`}
            >
              {chat.message}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 w-full bg-white px-2 py-2 shadow-md flex justify-between items-center gap-2">
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          type="text"
          className="w-full border border-gray-300 px-2 py-2 rounded-sm"
        />
        <button
          onClick={() => handleSend()}
          className="bg-blue-600 text-white px-2 py-2 rounded-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}
