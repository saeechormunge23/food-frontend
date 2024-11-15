import axios from "axios";

const API_URL = "http://localhost:8080/api/order";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.jwt;
};

const placeOrder = (orderData, token) => {
  return axios.post(`${API_URL}/place`, orderData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

const getAllOrders = (token) => {
  return axios.get(`${API_URL}/all`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

const getOrdersByUser = (userId) => {
  return axios.get(`/api/orders/user/${userId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

const updateOrderStatus = (id, status, token) => {
  return axios.put(
    `${API_URL}/update-status/${id}?status=${status}`,
    {},
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );
};

const deleteOrder = (id, token) => {
  return axios.delete(`${API_URL}/delete/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

const OrderService = {
  placeOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getOrdersByUser,
};

export default OrderService;
