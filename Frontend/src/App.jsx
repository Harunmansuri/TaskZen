import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import "./App.css";

const App = () => {
  const navigate = useNavigate(); // ✅ missing

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userLoggedIn") === "yes";

    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
