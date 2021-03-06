import React from "react";
import styles from "./login.module.css";
import Input from "../../components/base/input";
import Button from "../../components/base/button";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../configs/redux/actions/userAction";
import io from "socket.io-client";
import axios from "axios";
import swal from "sweetalert";
import * as yup from "yup";
import { useFormik } from "formik";

const Login = ({ setSocket }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email format").required("Required"),
      password: yup.string().min(3, "Minimum 3 character").required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post(`${process.env.REACT_APP_TELE_BACKEND}/v1/users/login`, values)
        .then((res) => {
          const respData = res.data.data;
          localStorage.setItem("token", respData.token);
          localStorage.setItem("refreshToken", respData.refreshToken);
          const resultSocket = io(process.env.REACT_APP_TELE_BACKEND, {
            query: { token: respData.token },
          });
          setSocket(resultSocket);
          swal({
            title: "Good job!",
            text: `${res.data.message}`,
            icon: "success",
          });
          navigate("/private");
        })
        .catch((err) => {
          console.log(err);
          swal({
            title: "Oops!",
            text: `${err.response.data.message}`,
            icon: "error",
          });
        });
    },
  });

  // axios tanpa form data
  // const [dataUser, setDataUser] = useState({
  //   email: "",
  //   password: "",
  // });
  // const handleChange = (e) => {
  //   setDataUser({
  //     ...dataUser,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post(`${process.env.REACT_APP_TELE_BACKEND}/v1/users/login`, dataUser)
  //     .then((res) => {
  //       const respData = res.data.data;
  //       localStorage.setItem("token", respData.token);
  //       localStorage.setItem("refreshToken", respData.refreshToken);
  //       const resultSocket = io(process.env.REACT_APP_TELE_BACKEND, {
  //         query: { token: respData.token },
  //       });
  //       setSocket(resultSocket);
  //       swal({
  //         title: "Good job!",
  //         text: `${res.data.message}`,
  //         icon: "success",
  //       });
  //       navigate("/private");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       swal({
  //         title: "Oops!",
  //         text: `${err.response.data.message}`,
  //         icon: "error",
  //       });
  //     });
  // };
  return (
    <div className={styles.page}>
      <div className={styles.login}>
        <div className={styles.title}>
          <h1>Login</h1>
        </div>
        <div className={styles.hai}>
          <p>Hi, Welcome back!</p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            {/* <Input label="Email" type="email" name="email" className="inputLogin" placeholder="Telegram@gmail.com" value={dataUser.email} onChange={handleChange} /> */}
            <Input label="Email" type="email" name="email" className="inputLogin" placeholder="Telegram@gmail.com" value={formik.email} onChange={formik.handleChange} />
            {formik.errors.email && formik.touched.email && <p style={{ color: "red" }}>{formik.errors.email}</p>}
          </div>
          <div>
            {/* <Input label="Password" type="password" name="password" className="inputLogin" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" value={dataUser.password} onChange={handleChange} /> */}
            <Input label="Password" type="password" name="password" className="inputLogin" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" value={formik.password} onChange={formik.handleChange} />
            {formik.errors.password && formik.touched.password && <p style={{ color: "red" }}>{formik.errors.password}</p>}
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
              type="submit"
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
