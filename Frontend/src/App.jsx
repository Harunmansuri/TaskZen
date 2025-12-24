import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./App.css";
const App = () => {
  const isLoggedIn = localStorage.getItem("userLoggedIn") === "yes";
  return (
    <Routes>
      {" "}
      {/* Default route */}{" "}
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" />
          ) : (
            <Navigate to="/register" />
          )
        }
      />{" "}
      <Route path="/register" element={<Register />} />{" "}
      <Route path="/login" element={<Login />} /> {/* Protected Route */}{" "}
      <Route
        path="/dashboard"
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
      />{" "}
    </Routes>
  );
};
export default App;
