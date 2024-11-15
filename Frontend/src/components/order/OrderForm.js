import React, { useState } from "react";
import OrderService from "../../services/orderService";

const OrderForm = () => {
  const [foodId, setFoodId] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      await OrderService.placeOrder({ foodId, quantity });
      alert("Order placed successfully");
    } catch (error) {
      alert("Order failed");
    }
  };

  return (
    <form onSubmit={handleOrder}>
      <h2>Place an Order</h2>
      <input
        type="text"
        placeholder="Food ID"
        value={foodId}
        onChange={(e) => setFoodId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button type="submit">Place Order</button>
    </form>
  );
};

export default OrderForm;
