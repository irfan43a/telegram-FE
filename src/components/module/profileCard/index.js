import React, { useState } from "react";
import axios from "axios";
import styles from "./friend.module.css";
import { chat, back, lock, data, device } from "../../../img";
import Button from "../../base/button";
import Input from "../../base/input";
import swal from "sweetalert";
const Profile = ({ onClick, img, name, phone, email, bio }) => {
  const [dataProfile, setDataProfile] = useState({
    name: "",
    email: "",
    bio: "",
    phone: "",
    status: "",
    editimgprofile: "",
  });
  const [file, setFile] = useState({
    file: null,
    priview: "",
  });

  const handleUploadChange = (e) => {
    console.log("dari target file", e.target.files[0]);
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
    const token = localStorage.getItem("token");
    let bodyFormData = new FormData();
    bodyFormData.append("name", dataProfile.name);
    bodyFormData.append("email", dataProfile.email);
    bodyFormData.append("bio", dataProfile.bio);
    bodyFormData.append("phone", dataProfile.phone);
    bodyFormData.append("status", dataProfile.status);
    bodyFormData.append("profileimage", file);

    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_TELE_BACKEND}/v1/users/profile/`,
      data: bodyFormData,
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "multipart/form-data",
    })
      .then((res) => {
        // alert("profile berhasil di rubah");
        swal({
          title: "Good job!",
          text: `${res.data.message}`,
          icon: "success",
        });
        console.log(res);
      })
      .catch((e) => {
        swal({
          title: "Oops!",
          text: `${e.response.data.message}`,
          icon: "error",
        });
      });
  };
  console.log("dari file", file);
  return (
    <div id="profile" className={styles.profile}>
      <div className={styles.backemail}>
        <button className="btnmenu" onClick={onClick}>
          <img src={back} alt="back" />
        </button>
        <span>{email}</span>
      </div>
      <label>
        <div className={styles.imgProfile}>
          <Input type="file" name="editimgprofile" value={dataProfile.editimgprofile} onChange={(e) => handleUploadChange(e)} />
          <img src={img} alt="gambar" />
        </div>
      </label>
      <div className={styles.identity}>
        <Input type="text" className="inputProf" placeholder={name} name="name" value={dataProfile.name} onChange={(e) => handleChange(e)} />
        <div>{bio}</div>
      </div>
      <div className={styles.phone}>
        <div>Account</div>
        <Input type="text" className="inputData" placeholder={phone} name="phone" value={dataProfile.phone} onChange={(e) => handleChange(e)} />
      </div>
      <div className={styles.email}>
        <div>Email</div>
        <Input type="email" className="inputData" placeholder={email} name="email" value={dataProfile.email} onChange={(e) => handleChange(e)} />
      </div>
      <div className={styles.bio}>
        <span>Bio</span>
        <Input type="text" className="inputData" placeholder={bio} name="bio" value={dataProfile.bio} onChange={(e) => handleChange(e)} />
        <Button title="tap to change profile" btn="editProf" onClick={(e) => handleUpload(e)}></Button>
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
