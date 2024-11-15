import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import "../styles/CustomSlider.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FoodCard = ({ foodItems }) => {
  const notify = () =>
    toast("Please log in or sign up to continue.", {
      position: "top-right",
      autoClose: 2000,
    });

  return (
    <div className="card-container">
      {foodItems.map((item, index) => (
        <div key={index} className="food-card">
          <img src={item.image} className="food-image" alt={item.name} />
          <h2>{item.name}</h2>
          <button onClick={notify} className="order-button">
            Order Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default FoodCard;
