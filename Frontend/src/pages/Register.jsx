import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register-page flex h-screen items-center justify-center flex-col">
      <div className="w-[60vw] md:w-[50vw] lg:w-[30vw]">
        <h1 className="text-3xl font-bold text-center text-blue-800">
          {" "}
          TaskZen
        </h1>
        <h3 className="text-center font-semibold text-zinc-900">
          Register with taskZen
        </h3>
      </div>
      <div className="w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4">
        <form className="flex flex-col gap-4 ">
          <input
            type="text"
            required
            placeholder="username"
            className="border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none"
            name="username"
          />
          <input
            type="email"
            required
            placeholder="email"
            className="border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none"
            name="email"
          />
          <input
            type="password"
            required
            placeholder="password"
            className="border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none"
            name="password"
          />
          <button className="bg-blue-800 text-white py-2 font-semibold rounded hover:bg-blue-700 transition duration-300">
            Register
          </button>
          <p className="text-center font-semibold text-gray-900">
            Already have an account? <Link to="/login" className="text-blue-800">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
