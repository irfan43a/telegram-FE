import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatRoom from "./pages/ChatRoom";
import Login from "./pages/Login";
import Signin from "./pages/Login/index";
import Register from "./pages/Register/index";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import PrivateChat from "./pages/PrivateChat";
import RequireAuth from "../src/components/base/RequireAuth";
import io from "socket.io-client";

const App = () => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!socket && token) {
      const resultSocket = io(`${process.env.REACT_APP_SOCKET_BACKEND}`, {
        query: {
          token: token,
        },
      });
      setSocket(resultSocket);
    }
  }, [socket]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/room" element={<ChatRoom socket={socket} />} />
        <Route
          path="/private"
          element={
            <RequireAuth>
              <PrivateChat socket={socket} />
            </RequireAuth>
          }
        />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Signin setSocket={setSocket} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
