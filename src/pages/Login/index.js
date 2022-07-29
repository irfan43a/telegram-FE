import React, { useState } from "react";
import styles from "./login.module.css";
import Input from "../../components/base/input";
import Button from "../../components/base/button";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../configs/redux/actions/userAction";
import io from "socket.io-client";
import axios from "axios";

const Login = ({ setSocket }) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { isloading } = useSelector((state) => state.user);
  const [dataUser, setDataUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    // dispatch(loginUser(dataUser, navigate));
    axios
      .post(`${process.env.REACT_APP_TELE_BACKEND}/v1/users/login`, dataUser)
      .then((res) => {
        const respData = res.data.data;
        localStorage.setItem("token", respData.token);
        localStorage.setItem("refreshToken", respData.refreshToken);
        const resultSocket = io(process.env.REACT_APP_TELE_BACKEND, {
          query: { token: respData.token },
        });
        setSocket(resultSocket);
        alert("Login success");
        navigate("/private");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };
  return (
    <div className={styles.page}>
      <div className={styles.login}>
        <div className={styles.title}>
          <h1>Login</h1>
          <p>{process.env.REACT_APP_TELE_BACKEND}</p>
        </div>
        <div className={styles.hai}>
          <p>Hi, Welcome back!</p>
        </div>
        <form onSubmit={handleLogin}>
          <div>
            <Input label="Email" type="email" name="email" className="inputLogin" placeholder="telegram@gmail.com" value={dataUser.email} onChange={handleChange} />
          </div>
          <div>
            <Input label="Password" type="password" name="password" className="inputLogin" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" value={dataUser.password} onChange={handleChange} />
          </div>
          <div className={styles.forgot}>
            <Link to="#">Forgot password?</Link>
          </div>
          <div>
            <Button
              // title={isloading ? "Loading..." : "Login"}
              title="Login"
              btn="login"
              color="blue"
            />
          </div>
          <div className={styles.textlogin}>Login</div>
          <div>
            <Button title="Google" btn="login" color="white" />
          </div>
        </form>
        <div className={styles.signup}>
          Dont have an account?
          <Link to="/register"> Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
