import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import AuthService from "../services/authService";
import "../styles/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginModal = ({ closeModal }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(credentials);
    AuthService.login(credentials).then(
      (response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 1000,
        });
        navigate("/home");
        closeModal();
      },
      (error) => {
        toast.error("Invalid username or password", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">Username</label>
          <input
            className="input"
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </div>

        <div className="form-group">
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" className="button">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginModal;
