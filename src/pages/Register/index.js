import React, { useState } from "react";
import styles from "./register.module.css";
import Input from "../../components/base/input";
import Button from "../../components/base/button";
// import { useDispatch } from "react-redux";
// import { loginUser } from "../../configs/redux/actions/userAction";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formRegister, setformRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setformRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_TELE_BACKEND}users/register`, formRegister)
      .then(() => {
        alert("Register berhasil");
        navigate("/");
      })
      .catch((e) => {
        // console.log(e.response.data.message);
        alert(e.response.data.message);
      });
  };
  return (
    <div className={styles.page}>
      <div className={styles.login}>
        <div className={styles.title}>
          <h1>Register</h1>
        </div>
        <div className={styles.hai}>
          <p>Lets create your account!</p>
        </div>
        <form onSubmit={handleRegister}>
          <div>
            <Input label="Name" type="text" name="name" className="inputLogin" placeholder="Telegram app" value={formRegister.name} onChange={handleChange} />
          </div>
          <div>
            <Input label="Email" type="email" name="email" className="inputLogin" placeholder="telegram@gmail.com" value={formRegister.email} onChange={handleChange} />
          </div>
          <div>
            <Input label="Password" type="password" name="password" className="inputLogin" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" value={formRegister.password} onChange={handleChange} />
          </div>
          <div className={styles.butonlogin}>
            <Button title="Register" btn="login" color="blue" />
          </div>
        </form>
        <div className={styles.textlogin}>
          <hr />
          Register with
          <hr />
        </div>
        <div>
          <Button title="Google" btn="login" color="white" />
        </div>
      </div>
    </div>
  );
};

export default Login;
