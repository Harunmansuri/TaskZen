import React from "react";
import { IoLogOutOutline, IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = ({ setAddTaskDiv }) => {
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await axios.post(
      "http://localhost:3000/api/v1/users/logout",
      {},
      { withCredentials: true } // 🔥 MOST IMPORTANT
    );

    localStorage.removeItem("userLoggedIn");
    alert("Logged out successfully");
    navigate("/login");
  } catch (error) {
    console.error("Logout error:", error);
  }
};


  return (
    <header className="flex px-12 items-center justify-between h-20 border-b border-gray-200 bg-white">
      {/* Logo */}
      <h1 className="text-2xl font-semibold text-blue-800 cursor-pointer">
        TaskZen
      </h1>

      {/* Actions */}
      <div className="flex gap-8 items-center">
        <button
          onClick={() => setAddTaskDiv(true)}
          className="flex items-center gap-2 text-lg font-medium hover:text-blue-800 transition-all"
        >
          <IoAddCircleOutline size={24} />
          Add Task
        </button>

        <button
          onClick={handleLogout}
          className="text-2xl hover:text-red-600 transition-all"
          title="Logout"
        >
          <IoLogOutOutline />
        </button>
      </div>
    </header>
  );
};

export default Header;
