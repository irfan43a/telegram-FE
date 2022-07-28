import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";

const ChatRoom = () => {
  const [socket, setSocket] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [username, setUsername] = useState("");
  const [group, setGroup] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const resultSocket = io("http://localhost:4000");
    setSocket(resultSocket);
    resultSocket.emit("initialRoom", { room: searchParams.get("group"), username: searchParams.get("username") });
    setUsername(searchParams.get("username"));
    setGroup(searchParams.get("group"));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.off("newMessage");
      socket.on("newMessage", (data) => {
        setMessages((current) => [...current, data]);
      });
      socket.on("notifAdmin", (data) => {
        setMessages((current) => [...current, data]);
      });
    }
  }, [socket]);

  const handleSendMessage = () => {
    const dataMessage = {
      sender: username,
      message,
      room: group,
    };
    socket.emit("sendMessage", dataMessage);
    setMessage("");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <h3>Group : {group}</h3>
        </div>
        <div className="col-md-8">
          <div className="wrapper-chat">
            <ul className="list-group">
              <ScrollToBottom className="scroll-botom">
                {messages.map((item) => (
                  <li className={`list-group-item ${item.sender === username ? "bg-green" : ""}`}>
                    <h6>{item.sender}</h6>
                    <p>
                      ({item.date}) : {item.message}
                    </p>
                  </li>
                ))}
              </ScrollToBottom>
            </ul>
          </div>
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="isi pesan" aria-label="Recipient's username" aria-describedby="button-addon2" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSendMessage}>
              Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
