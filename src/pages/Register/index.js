import React, { useState } from "react";
import styles from "./register.module.css";
import Input from "../../components/base/input";
import Button from "../../components/base/button";
import { useDispatch } from "react-redux";
import { loginUser } from "../../configs/redux/actions/userAction";

const Login = () => {
  const dispatch = useDispatch();
  // const { isloading } = useSelector((state) => state.user);
  const [dataUser, setDataUser] = useState({
    name: "",
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
    dispatch(loginUser(dataUser));
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
        <form onSubmit={handleLogin}>
          <div>
            <Input label="Name" type="text" name="name" className="inputLogin" placeholder="Telegram app" value={dataUser.name} onChange={handleChange} />
          </div>
          <div>
            <Input label="Email" type="email" name="email" className="inputLogin" placeholder="telegram@gmail.com" value={dataUser.email} onChange={handleChange} />
          </div>
          <div>
            <Input label="Password" type="password" name="password" className="inputLogin" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" value={dataUser.password} onChange={handleChange} />
          </div>
          <div className={styles.butonlogin}>
            <Button title="Login" btn="login" color="blue" />
          </div>
        </form>
        <div className={styles.textlogin}>
          <hr />
          Login
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
