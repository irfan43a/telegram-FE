import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

function App() {
  const [message, setMessage] = useState("");
  const [idSocket, setIdSocket] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const resultSocket = io("http://localhost:4000");
    console.log(resultSocket.id);
    setSocket(resultSocket);
    resultSocket.on("messageBE", (data) => {
      setMessages((current) => [...current, data]);
    });
  }, []);

  const handleSendMessage = () => {
    socket.emit("message", {
      idSocket,
      message,
    });
    setMessage("");
  };
  const handleCekId = () => {
    alert(socket.id);
  };
  return (
    <div className="App">
      <ul>
        {messages.map((item) => (
          <li>
            {item.message} - {new Date(item.date).getHours()}:{new Date(item.date).getMinutes()}
          </li>
        ))}
      </ul>
      <input type="text" value={idSocket} placeholder="isikan id soclet" onChange={(e) => setIdSocket(e.target.value)} />
      <input type="text" value={message} placeholder="isikan id pesan" name="message" id="message" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSendMessage}>send message</button>
      <button onClick={handleCekId}>cek idSocket</button>
    </div>
  );
}

export default App;
