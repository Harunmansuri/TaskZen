import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/register",
        values
      );

      if (response.status === 201) {
        alert("Registration Successful 🎉");
      }
      navigate("/login");
    } catch (error) {
      alert(error.response.data.message || "Registration Failed ❌");
    }
  };

  return (
    <div className="register-page flex h-screen items-center justify-center flex-col">
      <div className="w-[60vw] md:w-[50vw] lg:w-[30vw]">
        <h1 className="text-3xl font-bold text-center text-blue-800">
          TaskZen
        </h1>
        <h3 className="text-center font-semibold text-zinc-900">
          Register with TaskZen
        </h3>
      </div>

      <div className="w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4">
        <form className="flex flex-col gap-4">
          <input
            type="text"
            required
            placeholder="Username"
            className="border rounded px-4 py-2 border-zinc-400 w-full outline-none"
            name="username"
            value={values.username}
            onChange={change}
          />

          <input
            type="email"
            required
            placeholder="Email"
            className="border rounded px-4 py-2 border-zinc-400 w-full outline-none"
            name="email"
            value={values.email}
            onChange={change}
          />

          <input
            type="password"
            required
            placeholder="Password"
            className="border rounded px-4 py-2 border-zinc-400 w-full outline-none"
            name="password"
            value={values.password}
            onChange={change}
          />

          <button
            type="submit"
            className="bg-blue-800 text-white py-2 font-semibold rounded hover:bg-blue-700 transition duration-300"
            onClick={register}
          >
            Register
          </button>

          <p className="text-center font-semibold text-gray-900">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-800">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
