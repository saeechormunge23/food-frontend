import React, { useState } from "react";
import "../styles/Auth.css";
import AuthService from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { toast } from "react-toastify";

const SignupModal = ({ closeModal }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    userRole: "USER",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    AuthService.signup(userData).then(
      () => {
        toast.success("User registered successfully", {
          position: "top-right",
          autoClose: 1000,
        });
        closeModal();
      },
      (error) => {
        toast.error("Signup failed! Try again.", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="label">Username</label>
        <input className="input"
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Username"
          required
        />
      </div>

      <div className="form-group">
        <label className="label">Email</label>
        <input className="input"
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </div>

      <div className="form-group">
        <label className="label">Password</label>
        <input className="input"
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </div>
      <label className="label">Select Role </label>
      <select className="input-select"
        name="userRole"
        value={userData.userRole}
        onChange={handleChange}
        required
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
      </select>
      <br></br>
      <button type="submit" className="button">
        Signup
      </button>
    </form>
  );
};

export default SignupModal;
