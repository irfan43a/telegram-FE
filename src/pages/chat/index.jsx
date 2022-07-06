import React from "react";
import styles from "./chat.module.css";
const Chat = () => {
  return (
    <div className={styles.pagechat}>
      <div className={styles.contact}>
        <div>
          <h6>Telegram</h6>
        </div>
        <div>
          <input type="text" />
        </div>
        <div>
          <button>All</button>
          <button>important</button>
          <button>Unread</button>
        </div>
        <div>Contact</div>
      </div>
      <div className={styles.message}>
        <p>Please select a chat to start messaging</p>
      </div>
    </div>
  );
};

export default Chat;
