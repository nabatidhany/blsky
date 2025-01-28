
# Left & Right Chat

This project is a simple chat application where two chat windows (left and right) can send and receive messages in real-time using WebSockets. When one user sends a message, the other window flashes to indicate a new message. All messages are stored persistently, so even when you close and reopen the tab, old messages are still available.





## Features

- Two chat windows (left and right)
- Real-time message sending and receiving
- Flashing effect on the receiving window when a new message is sent
- Message persistence even after closing and reopening the tab


## Steps to Run the Project Locally

Follow these steps to clone and run the project on your local machine:

- Clone the repository
- Enter the project directory
- Install all dependency
```bash
  npm install or yarn install
```
- Run the client
```bash
  npm run dev or yarn dev
```
This will start the client on http://localhost:3000.
- Run the server
```bash
  npm run server or yarn server
```
This will start the server on http://localhost:8080.
- Open the client in the browser
Once both the client and server are running, open the browser and navigate to http://localhost:3000 to start using the chat application.
## Message Persistence

Messages are stored in localstorage for simplicity.


## Libraries Used

- Next.js for the client-side (UI) framework
- Node.js for the backend server
- WebSocket for real-time communication

