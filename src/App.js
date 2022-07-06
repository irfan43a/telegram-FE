import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatRoom from "./pages/ChatRoom";
import Login from "./pages/Login";
import Signin from "./pages/Login/index";
import Register from "./pages/Register/index";
import Chat from "./pages/chat";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/room" element={<ChatRoom />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
