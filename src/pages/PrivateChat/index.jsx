import axios from "axios";
import React, { useEffect, useState } from "react";
import profileimg from "../../img/profileimg3.png";
import profileimg2 from "../../img/profileimg2.png";
import ScrollToBottom from "react-scroll-to-bottom";
import Input from "../../components/base/input";
import moment from "moment";

const Private = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [friends, setFriends] = useState([]);
  const [friend, setFriend] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_TELE_BACKEND}/v1/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const users = res.data.data;
        setFriends(users);
      });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.off("newMessage");
      socket.on("newMessage", (message) => {
        setMessages((current) => [...current, message]);
      });
    }
  }, [socket]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_TELE_BACKEND}/v1/messages/${friend.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const messages = res.data.data;
        setMessages(messages);
      });
  }, [friend]);

  const handleSendMessage = () => {
    if (socket && message) {
      socket.emit(
        "sendMessage",
        {
          idReceiver: friend.id,
          messageBody: message,
        },
        (message) => {
          setMessages((current) => [...current, message]);
        }
      );
    } else {
      alert("Pesan belum terisi");
    }
  };
  const chooseFriend = (friend) => {
    setFriend(friend);
  };

  return (
    <div className="container">
      <div className="row contact-list">
        <div className="title-telegram">
          <h4>Telegram</h4>
        </div>
        <div>
          <Input type="text" name="mesage" className="mesage" placeholder="Type your massage.." />
        </div>
        <div className="button-contact">
          <button>All</button>
          <button>Important</button>
          <button>Unread</button>
        </div>
        <div className="col-md-4">
          <ul className="list-group">
            <ScrollToBottom className="scroll-botom">
              {friends.map((item) => (
                <li className={`list-group-item pointer friendlist`} onClick={() => chooseFriend(item)}>
                  <div className="imgProfileFriend">
                    <img key={item.id} src={friend.img ? friend.img : profileimg2} alt="" />
                  </div>
                  {item.name}
                </li>
              ))}
            </ScrollToBottom>
          </ul>
        </div>
        <div className="col-md-8 chat-list">
          <div className="wrapper-chat">
            <li className="active bg-friend">
              <div className="imgProfileFriend">
                <img src={friend.img ? friend.img : profileimg} alt="" />
              </div>
              {friend.name ? friend.name : "pilih teman"}
            </li>
            <ul className="list-group">
              <ScrollToBottom className="scroll-botom">
                {messages.map((item) => (
                  <li className={`list-group-item ${item.receiver_id !== friend.id ? "bg-violet" : "bg-green"}`} key={item.id}>
                    <p>
                      {moment(item.created_at).format("LT")} - {item.message}
                    </p>
                  </li>
                ))}
              </ScrollToBottom>
            </ul>
          </div>
          <div className="input-group mb-3 input">
            <input type="text" className="form-control" placeholder="Type your message..." aria-label="Recipient's username" aria-describedby="button-addon2" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSendMessage}>
              Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Private;
