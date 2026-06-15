import { useState } from "react";
import axios from "axios";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const res =
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/login`,
            formData
          );

        localStorage.setItem(
          "token",
          res.data.token
        );

        toast.success(
          "Login Successful"
        );

        navigate(
          "/dashboard"
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
          "Login failed"
        );
      }
    };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <form
        onSubmit={
          handleSubmit
        }
        className="bg-gray-800 p-8 rounded-lg w-[400px]"
      >
        <h1 className="text-white text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={
            handleChange
          }
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={
            handleChange
          }
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 p-3 rounded text-white hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-gray-400 mt-4 text-center">
          Don't have an
          account?{" "}
          <Link
            to="/register"
            className="text-blue-400"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;