import React from "react";
import "../styles/BillModal.css";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";

const BillModal = ({ isOpen, onClose, cartItems, totalPrice }) => {
  const dispatch = useDispatch();
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-header">Order Summary</h2>
        <div className="modal-items">
          {cartItems.map((item) => (
            <div key={item.id} className="modal-item">
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{(item.price * item.quantity).toFixed(2)}</p>
                <p className="item-restaurant">Restaurant: {item.hotelName}</p>
              </div>
            </div>
          ))}
        </div>
        <h3 className="modal-total">Total Price: ₹{totalPrice.toFixed(2)}</h3>

        <button
          className="button-close"
          onClick={() => {
            dispatch(clearCart());
            onClose();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BillModal;
