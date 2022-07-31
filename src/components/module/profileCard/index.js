import React, { useState } from "react";
import axios from "axios";
import styles from "./friend.module.css";
import { chat, back, lock, data, device } from "../../../img";
import Button from "../../base/button";
import Input from "../../base/input";
const Profile = ({ onClick, img, name, phone, email, bio }) => {
  const [dataProfile, setDataProfile] = useState({
    name: "",
    email: "",
    bio: "",
    phone: "",
    status: "",
    img: "",
  });
  const [file, setFile] = useState({
    file: null,
    priview: "",
  });

  const handleUploadChange = (e) => {
    console.log(e.target.files[0]);
    let upload = e.target.files[0];
    setFile(upload);
  };

  const handleChange = (e) => {
    setDataProfile({
      ...dataProfile,
      [e.target.name]: e.target.value,
      // priview: URL.createObjectUrl(e.target.files[0]),
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();

    let bodyFormData = new FormData();
    bodyFormData.append("name", dataProfile.name);
    bodyFormData.append("email", dataProfile.email);
    bodyFormData.append("bio", dataProfile.bio);
    bodyFormData.append("phone", dataProfile.phone);
    bodyFormData.append("status", dataProfile.status);
    bodyFormData.append("img", file);

    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_BACKEND}/v1/users/profile/`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        alert("profile berhasil di rubah");
        console.log(res);
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };
  console.log(handleUploadChange);
  return (
    <div id="profile" className={styles.profile}>
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
        <Input type="text" className="inputProf" placeholder="waduh" name="name" value={name} onChange={handleChange} />
        <div>{bio}</div>
      </div>
      <div className={styles.phone}>
        <div>Account</div>
        <Input type="text" className="inputData" placeholder={phone} name="phone" value={phone} onChange={handleChange} />
      </div>
      <div className={styles.email}>
        <div>Email</div>
        <Input type="email" className="inputData" placeholder={email} name={email} value="email" onChange={handleChange} />
      </div>
      <div className={styles.bio}>
        <span>Bio</span>
        <Input type="text" className="inputData" placeholder={bio} name="bio" value={bio} onChange={handleChange} />
        <Button title="tap to change profile" btn="editProf" onClick={handleUpload}></Button>
      </div>
      <div className={styles.menu}>
        <h4>Settings</h4>
        <div className={styles.submenu}>
          <div className={styles.image}>
            <img src={device} alt="" />
          </div>
          <span>Notification and Sounds</span>
        </div>
        <div className={styles.submenu}>
          <div className={styles.image}>
            <img src={lock} alt="" />
          </div>
          <span>Privaty and Security</span>
        </div>
        <div className={styles.submenu}>
          <div className={styles.image}>
            <img src={data} alt="" />
          </div>
          <span>Data and Stronge</span>
        </div>
        <div className={styles.submenu}>
          <div className={styles.image}>
            <img src={chat} alt="" />
          </div>
          <span>Chat settings</span>
        </div>
        <div className={styles.submenu}>
          <div className={styles.image}>
            <img src={device} alt="" />
          </div>
          <span>Devices</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
