import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import orderService from "../services/orderService"; // Import your order service

const ProfileModal = ({ show, handleClose, user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderService.getOrdersByUser(user?.userId);
        console.log(response);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (show) fetchOrders();
  }, [show, user?.userId]);

  return (
    <Modal show={show} onHide={handleClose} className="profile-modal">
      <Modal.Header closeButton>
        <Modal.Title>User Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="profile-info">
          <p>
            <strong>Username:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Role:</strong> {user?.userRole}
          </p>
        </div>
        <div className="order-history">
          <h5>Past Orders</h5>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <ul className="order-list">
              {orders.map((order, index) => (
                <li key={index} className="order-item">
                  <p>
                    <strong>Order ID:</strong> {order.id}
                  </p>
                  <p>
                    <strong>Items:</strong> {order.items.join(", ")}
                  </p>
                  <p>
                    <strong>Total:</strong> ${order.total}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => alert("Update functionality to be implemented")}
        >
          Update Profile
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileModal;
