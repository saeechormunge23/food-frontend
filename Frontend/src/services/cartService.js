import axios from "axios";

let cart = [];

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.jwt;
};

export const addToCart = (foodItem) => {
  const existingItem = cart.find((item) => item.id === foodItem.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...foodItem, quantity: 1 });
  }
};

export const getCartItems = () => {
  return cart;
};

export const placeOrder = (cartItems) => {
  const user = JSON.parse(localStorage.getItem("user")); 
  console.log("User info:", user);
  if (!user || !user.userId) {
    console.error("User ID not found in localStorage.");
    return;
  }

  return Promise.all(
    cartItems.map((item) => {
      const orderData = {
        quantity: item.quantity,
        totalPrice: item.price * item.quantity, 
        user: { id: user.userId }, 
        foodItem: { id: item.id },
      };
      

      return axios
        .post("http://localhost:8080/api/order/place", orderData, {
          headers: {
            Authorization: `Bearer ${getToken()}`, 
          },
        })
        .then((response) => {
          console.log("Order placed successfully:", response.data);
          return response.data; 
        })
        .catch((error) => {
          console.error("Error placing order:", error);
          throw error; 
        });
    })
  );
};

export default { placeOrder, getCartItems, addToCart };
