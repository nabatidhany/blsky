"use client"
import React, { useState } from 'react'

export default function Index({id}: {id: string}) {
  const [chats, setChats] = useState([
    {id: 1, message: 'Hello', sender: 'left'},
    {id: 2, message: 'Hai', sender: 'right'},
  ])
  const [message, setMessage] = useState('')
  const handleSend = () => {
    setChats([...chats, {id: chats.length + 1, message: message, sender: id}]);
    setMessage('')
  }
  return (
    <div className='w-full border border-gray-300 h-full relative rounded-md overflow-hidden shadow-md'>
      <div className='px-2 py-2 h-screen overflow-y-scroll pb-56'>
        {
          chats.map((chat) => (
            <div key={chat.id} className={`flex gap-2 ${chat.sender === id ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-2 py-2 rounded-md ${chat.sender === id ? 'bg-gray-200' : 'bg-blue-600 text-white'}`}>
                {chat.message}
              </div>
            </div>
          ))
        }
      </div>
      <div className='absolute bottom-0 w-full bg-white px-2 py-2 shadow-md flex justify-between items-center gap-2'>
        <input
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend()
            }
          }} 
          onChange={(e) => setMessage(e.target.value)} value={message} type='text' className='w-full border border-gray-300 px-2 py-2 rounded-sm' />
        <button onClick={() => handleSend()} className='bg-blue-600 text-white px-2 py-2 rounded-sm'>Send</button>
      </div>
    </div>
  )
}
