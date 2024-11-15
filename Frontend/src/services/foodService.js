import axios from "axios";

const API_URL = "http://localhost:8080/api/food";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return user?.jwt;
};

const getAllFoodItems = () => {
  return axios.get(`${API_URL}/items`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const addFoodItem = (foodItem, token) => {
  console.log(foodItem);
  return axios.post(`${API_URL}/add`, foodItem, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

const updateFoodItem = (id, updatedFoodItem, token) => {
  return axios.put(`${API_URL}/update/${id}`, updatedFoodItem, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

const deleteFoodItem = (id, token) => {
  return axios.delete(`${API_URL}/delete/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

const serchFoodItem = (searchTerm, token) => {
  return axios.get(`${API_URL}/search/${searchTerm}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

const FoodService = {
  getAllFoodItems,
  addFoodItem,
  updateFoodItem,
  deleteFoodItem,
  serchFoodItem,
};

export default FoodService;
