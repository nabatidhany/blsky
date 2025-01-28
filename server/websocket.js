const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received:', message);
    const parsedMessage = JSON.parse(message);
    const response = JSON.stringify({
      from: parsedMessage.senderId,
      to: parsedMessage.targetId,
      message: parsedMessage.message,
    });
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(response);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
