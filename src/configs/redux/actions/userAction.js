import axios from "axios";
// import io from "socket.io-client";
// import { useState } from "react";
export const loginUser = (dataFrom, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_PENDING" });
    const result = await axios.post("http://localhost:4000/v1/users/login", dataFrom);
    const user = result.data.data;
    // const [socket, setSocket] = useState(null);
    // const resultSocket = io("http://localhost:4000");
    localStorage.setItem("token", user.token);
    localStorage.setItem("refreshToken", user.refreshToken);
    // setSocket(resultSocket);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: user });
    alert("Login berhasil  ");
    navigate("/room");
  } catch (error) {}
};
export const register = (dataFrom, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "USER_REGISTER_PENDING" });
    const result = await axios.post("http://localhost:4000/v1/users/register", dataFrom);
    const user = result.data.data;
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: user });
    alert("register berhasil :) ");
    navigate("/");
  } catch (error) {}
};
