import React from "react";
import "../styles/CartModal.css";
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/cartSlice"; 

const CartModal = ({ isOpen, onClose, cartItems, onPlaceOrder }) => {
  const dispatch = useDispatch(); // Initialize useDispatch hook

  if (!isOpen) return null; 

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id)); // Dispatch increaseQuantity action
  };

  const handleDecreaseQuantity = (id, quantity) => {
    if (quantity === 1) {
      dispatch(removeFromCart(id)); // If quantity is 1, remove the item from cart
    } else {
      dispatch(decreaseQuantity(id)); // Otherwise, decrease the quantity
    }
  };

  const handlePlaceOrder = () => {
    onPlaceOrder(cartItems); // Handle order placement
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>No items in your cart.</p>
        ) : (
          <div>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <img src={item.foodImage} className="cart-food-image"/>
                  <span className="text">{item.name}</span>
                  <span className="text">Price: ₹{item.price * item.quantity}</span>
                  <div className="quantity-controls">
                    <button
                      className="button-cart"
                      onClick={() =>
                        handleDecreaseQuantity(item.id, item.quantity)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="button-cart"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button className="button-cart" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        )}
        <button
          className="button-cart"
          style={{ width: "fit-content", marginLeft: "auto" }}
          onClick={onClose}
        >
          Close Cart
        </button>
      </div>
    </div>
  );
};

export default CartModal;
