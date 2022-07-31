import React from "react";
import styles from "./friend.module.css";
// import back from "../../../img/back.svg";
// import chat from "../../../img/Chat.svg";
import { imgprev1, imgprev2, chat, back, imgprev3, imgprev4, imgprev5, imgprev6, imgprev7 } from "../../../img";
const FriendDetail = ({ onClick, img, name, phone, email }) => {
  return (
    <div id="detail" className={styles.detail}>
      <div className={styles.backemail}>
        <button className="btnmenu" onClick={onClick}>
          <img src={back} alt="back" />
        </button>
        <span>{email}</span>
      </div>
      <div className={styles.imgProfile}>
        <img src={img} alt="gambar" />
      </div>
      <div className={styles.identity}>
        <div>
          <div>{name}</div>
          <div>status</div>
        </div>
        <div>
          <img src={chat} alt="gambar" />
        </div>
      </div>
      <div className={styles.phone}>
        <div>Phone number</div>
        <div>{phone}</div>
      </div>
      <div className={styles.menu}>
        <div>Location</div>
        <div>Image</div>
        <div>Documents</div>
      </div>
      <div className={styles.prev}>
        <div className={styles.imgProfile}>
          <img src={imgprev1} alt="gambar" />
        </div>
        <div className={styles.imgProfile}>
          <img src={imgprev2} alt="gambar" />
        </div>
        <div className={styles.imgProfile}>
          <img src={imgprev3} alt="gambar" />
        </div>
        <div className={styles.imgProfile}>
          <img src={imgprev4} alt="gambar" />
        </div>
        <div className={styles.imgProfile}>
          <img src={imgprev5} alt="gambar" />
        </div>
        <div className={styles.imgProfile}>
          <img src={imgprev6} alt="gambar" />
        </div>
        <div className={styles.imgProfile}>
          <img src={imgprev7} alt="gambar" />
        </div>
        <div className={styles.imgProfile}>
          <img src={imgprev2} alt="gambar" />
        </div>
        <div className={styles.imgProfile}>
          <img src={imgprev4} alt="gambar" />
        </div>
      </div>
    </div>
  );
};

export default FriendDetail;
