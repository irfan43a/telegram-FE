import React from "react";
import styles from "./profile.module.css";
export const Profile = () => {
  return (
    <div className={styles.pagechat}>
      <div className={styles.contact}>
        <div>
          <div>
            <img src="" alt="image" />
          </div>
          <div>
            <h6>Gloria Mckey</h6>
            <p>+6200000000000</p>
          </div>
        </div>
        <div>
          <h6>Account</h6>
          <p>+62000XXXXXX</p>
          <button>Tap to change phone number</button>
        </div>
        <div>
          <h6>@wdlam</h6>
          <h6>@username</h6>
        </div>
        <div>
          <h6>I’m Senior Frontend Developer from Microsoft</h6>
          <p>Bio</p>
        </div>
        <div>
          <h6></h6>
          <div>
            <p>notif</p>
            <p>Provaty</p>
            <p>Data</p>
            <p>Chat</p>
            <p>Device</p>
          </div>
        </div>
      </div>
      <div className={styles.message}>
        <p>Please select a chat to start messaging</p>
      </div>
    </div>
  );
};

export default Profile;
