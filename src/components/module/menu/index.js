import React from "react";
import { seting, contact, call, save, invite, FAQ } from "../../../img";
import styles from "./menu.module.css";
import Button from "../../base/button";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Menu = ({ id, onClick }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await localStorage.clear();
    swal({
      title: "Log Out",
      text: `Log Out Success`,
      icon: "success",
    });
    navigate("/");
  };
  return (
    <div id="menu" className={styles.menu}>
      <div className={styles.submenu}>
        <div className={styles.image}>
          <img src={seting} alt="" />
        </div>
        <Button btn="menu" title="Setting" onClick={onClick} />
      </div>
      <div className={styles.submenu}>
        <div className={styles.image}>
          <img src={contact} alt="" />
        </div>
        <Button btn="menu" title="Contact" />
      </div>
      <div className={styles.submenu}>
        <div className={styles.image}>
          <img src={call} alt="" />
        </div>
        <Button btn="menu" title="Calls" />
      </div>
      <div className={styles.submenu}>
        <div className={styles.image}>
          <img src={save} alt="" />
        </div>
        <Button btn="menu" title="Save message" />
      </div>
      <div className={styles.submenu}>
        <div className={styles.image}>
          <img src={invite} alt="" />
        </div>
        <Button btn="menu" title="Invite Friends" />
      </div>
      <div className={styles.submenu}>
        <div className={styles.image}>
          <img src={FAQ} alt="" />
        </div>
        <Button btn="menu" title="Telegram FAQ" />
      </div>
      <div className={styles.submenu}>
        <div className={styles.image}>
          <img src={FAQ} alt="" />
        </div>
        <Button btn="menu" title="Exit" onClick={() => handleLogout()} />
      </div>
    </div>
  );
};

export default Menu;
