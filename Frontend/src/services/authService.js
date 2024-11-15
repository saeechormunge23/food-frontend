import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const signup = (user) => axios.post(`${API_URL}/signup`, user);
const login = (user) => axios.post(`${API_URL}/login`, user);

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  console.log(JSON.parse(localStorage.getItem("user")));
  return JSON.parse(localStorage.getItem("user"));
};

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};

export default { signup, login, getToken, logout, getCurrentUser };
