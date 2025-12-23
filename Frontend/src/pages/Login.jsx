import React from "react";
import { Link , useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        values,
        {
          withCredentials: true,
        }
      );
           localStorage.setItem("userLoggedIn", "yes");
           navigate("/dashboard");
    } catch (error) {
      alert(error.response.message || "Login Failed ❌");
    }
  };
  return (
    <div className="register-page flex h-screen items-center justify-center flex-col">
      <div className="w-[60vw] md:w-[50vw] lg:w-[30vw]">
        <h1 className="text-3xl font-bold text-center text-blue-800">
          {" "}
          TaskZen
        </h1>
        <h3 className="text-center font-semibold text-zinc-900">
          Login with TaskZen
        </h3>
      </div>
      <div className="w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4">
        <form className="flex flex-col gap-4 ">
          <input
            type="email"
            required
            placeholder="email"
            className="border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none"
            name="email"
            value={values.email}
            onChange={change}
          />
          <input
            type="password"
            required
            placeholder="password"
            className="border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none"
            name="password"
            value={values.password}
            onChange={change}
          />
          <button className="bg-blue-800 text-white py-2 font-semibold rounded hover:bg-blue-700 transition duration-300"
          onClick={login}>
            Login
          </button>
          <p className="text-center font-semibold text-gray-900">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-800">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
