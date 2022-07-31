import axios from "axios";
import React, { useEffect, useState } from "react";
import { noimgprofile, ImgMenu, plus, menuprofile } from "../../img/index";
import ScrollToBottom from "react-scroll-to-bottom";
import Input from "../../components/base/input";
import moment from "moment";
import styles from "./privatechat.module.css";
import Menu from "../../components/module/menu";
import FriendDetail from "../../components/module/friendDetail";
import Profile from "../../components/module/profileCard";
// import Button from "../../components/base/button";

const Private = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [friends, setFriends] = useState([]);
  const [friend, setFriend] = useState({});
  const [profileDetail, setProfileDetail] = useState({});

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

    axios
      .get(`${process.env.REACT_APP_TELE_BACKEND}/v1/users/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const dataprofile = res.data.data;
        console.log("data profile", dataprofile.name);
        setProfileDetail(dataprofile);
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
    }
    setMessage("");
  };
  const chooseFriend = (friend) => {
    setFriend(friend);
  };

  const menu = () => {
    var x = document.getElementById("menu");
    if (x.style.display === "none") {
      x.style.display = "flex";
    } else {
      x.style.display = "none";
    }
  };
  const detail = () => {
    var x = document.getElementById("detail");
    if (x.style.display === "none") {
      x.style.display = "flex";
    } else {
      x.style.display = "none";
    }
  };
  const profile = () => {
    var x = document.getElementById("profile");
    if (x.style.display === "none") {
      x.style.display = "flex";
    } else {
      x.style.display = "none";
    }
  };
  console.log("data teman", friends);
  return (
    <div className={styles.private}>
      <div className={styles.menu}>
        <Profile onClick={() => profile()} name={profileDetail.name} email={profileDetail.email} img={profileDetail.img} phone={profileDetail.phone} bio={profileDetail.bio} />
        <div className="title-telegram">
          <h4>Telegram</h4>
          <div>
            <button className="btnmenu" onClick={() => menu()}>
              <img src={ImgMenu} alt="" />
            </button>
            <Menu id="menu" onClick={() => profile()} />
          </div>
        </div>
        <div className={styles.search}>
          <Input type="text" name="mesage" className="mesage" placeholder="Type your massage.." />
          <div>
            <img src={plus} alt="" />
          </div>
        </div>
        <div className="button-contact">
          <button>All</button>
          <button>Important</button>
          <button>Unread</button>
        </div>
        <div className={styles.contactList}>
          <ul className="list-group ">
            <ScrollToBottom className="scroll-botom ">
              {friends.map((item) => (
                <li className={`list-group-item pointer friendlist`} onClick={() => chooseFriend(item)}>
                  <div key={item.id} className="imgProfileFriend">
                    <img src={item.img ? item.img : noimgprofile} alt="" />
                  </div>
                  {item.name}
                </li>
              ))}
            </ScrollToBottom>
          </ul>
        </div>
      </div>
      <div className={styles.message}>
        <div className={styles.messageList}>
          <li className="active bg-friend">
            <div className={styles.name}>
              <div className="imgProfileFriend">
                <img src={friend.img ? friend.img : noimgprofile} alt="" />
              </div>
              {friend.name ? friend.name : "Pilih teman"}
            </div>
            <div>
              <button className="btnmenu" onClick={() => detail()}>
                <img src={menuprofile} alt="" />
              </button>
            </div>
          </li>
          <div className="wrapper-chat">
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
      <div id="detail" className={styles.detail}>
        <FriendDetail img={friend.img} name={friend.name} phone={friend.phone} email={friend.email} onClick={() => detail()} />
      </div>
    </div>
  );
};

export default Private;
