import React, { useEffect, useState } from "react";
import foodService from "../services/foodService";
import orderService from "../services/orderService";
import Navbar from "./Navbar";
import "../styles/AdminPage.css";
import { Modal } from "semantic-ui-react";
import { toast } from "react-toastify";

const AdminPage = () => {
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodQuantity, setFoodQuantity] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [foodURL, setFoodURL] = useState("");
  const [orders, setOrders] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingFoodItems, setLoadingFoodItems] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentFoodItem, setCurrentFoodItem] = useState(null);

  useEffect(() => {
    fetchOrders();
    fetchFoodItems();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderService.getAllOrders();
      setOrders(response?.data);
      console.log("afetr getting data");
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const fetchFoodItems = async () => {
    try {
      const response = await foodService.getAllFoodItems();
      console.log(response.data);
      setFoodItems(response.data);
    } catch (error) {
      console.error("Error fetching food items:", error);
    } finally {
      setLoadingFoodItems(false);
    }
  };

  const handleAddFoodItem = async (e) => {
    e.preventDefault();
    const foodItem = {
      name: foodName,
      category: foodCategory,
      price: parseFloat(foodPrice),
      quantityAvailable: parseInt(foodQuantity),
      foodImage: foodURL,
      hotelName: hotelName,
    };

    try {
      await foodService.addFoodItem(foodItem);
      setFoodName("");
      setFoodCategory("");
      setFoodPrice("");
      setFoodQuantity("");
      setFoodURL("");
      setHotelName("");
      fetchFoodItems();
      // alert("Food item added successfully!");
      toast.success("Food item added successfully!", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error adding food item:", error);
      // alert("Failed to add food item.");
      toast.error("Failed to add food item.", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      // alert(`Order ${orderId} status updated to ${newStatus}`);
      toast.success(`Order ${orderId} status updated to ${newStatus}`, {
        position: "top-right",
        autoClose: 1000,
      });
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
      // alert("Failed to update order status.");
      toast.error("Failed to update order status.", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  const handleDeleteFoodItem = async (foodId) => {
    try {
      await foodService.deleteFoodItem(foodId);
      fetchFoodItems();
      // alert("Food item deleted successfully.");
      toast.success("Food item deleted successfully.", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error deleting food item:", error);
      // alert("Failed to delete food item.");
      toast.error("Failed to delete food item.", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  const openUpdateModal = (foodItem) => {
    setCurrentFoodItem(foodItem);
    setFoodName(foodItem.name);
    setFoodCategory(foodItem.category);
    setFoodPrice(foodItem.price);
    setFoodQuantity(foodItem.quantityAvailable);
    setFoodURL(foodItem.foodImage);
    setHotelName(foodItem.hotelName);
    setModalOpen(true);
  };

  const closeUpdateModal = () => {};

  const handleUpdateFoodItem = async (e) => {
    e.preventDefault();
    const updatedFoodItem = {
      id: currentFoodItem.id,
      name: foodName,
      category: foodCategory,
      price: parseFloat(foodPrice),
      quantityAvailable: parseInt(foodQuantity),
      foodImage: foodURL,
      hotelName: hotelName,
    };

    try {
      await foodService.updateFoodItem(currentFoodItem.id, updatedFoodItem);
      setModalOpen(false);
      setCurrentFoodItem("");
      setFoodName("");
      setFoodCategory("");
      setFoodPrice("");
      setFoodQuantity("");
      setFoodURL("");
      setHotelName("");
      fetchFoodItems();
      // alert("Food item updated successfully!");
      toast.success("Food item updated successfully!", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error updating food item:", error);
      // alert("Failed to update food item.");
      toast.error("Failed to update food item.", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await orderService.deleteOrder(orderId);
      // alert(`Order ${orderId} deleted successfully`);
      toast.success(`Order ${orderId} deleted successfully`, {
        position: "top-right",
        autoClose: 1000,
      });
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order", error);
      // alert("Failed to delete order");
      toast.error("Failed to delete order.", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="admin-page">
        <h1 className="admin-title">Admin Dashboard</h1>
        <div className="first-section">
          <h2>Add Food Item</h2>
          <form onSubmit={handleAddFoodItem}>
            <input
              type="text"
              placeholder="Food Name"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
            />
            <br></br>

            <textarea
              placeholder="Category"
              value={foodCategory}
              onChange={(e) => setFoodCategory(e.target.value)}
              required
            />
            <br></br>
            <input
              type="number"
              placeholder="Price"
              value={foodPrice}
              onChange={(e) => setFoodPrice(e.target.value)}
              required
            />
            <br></br>
            <input
              type="number"
              placeholder="Quantity Available"
              value={foodQuantity}
              onChange={(e) => setFoodQuantity(e.target.value)}
              required
            />
            <br></br>
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              onChange={(e) => setFoodURL(e.target.value)}
              required
            />

            <input
              type="text"
              name="hotelName"
              value={hotelName}
              placeholder="Enter the hotel Name"
              onChange={(e) => setHotelName(e.target.value)}
              required
            />
            <br></br>
            <button className="button-admin add-button" type="submit">
              Add Food Item
            </button>
          </form>
        </div>
        <div className="second-section">
          <h2>Orders</h2>
          {loadingOrders ? (
            <p>Loading orders...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User ID</th>
                  <th>Food Item ID</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.user.id}</td>
                      <td>{order.foodItem.id}</td>
                      <td>{order.quantity}</td>
                      <td>${order.totalPrice.toFixed(2)}</td>
                      <td>{order.orderStatus}</td>
                      <td>
                        <button
                          className="button-admin"
                          onClick={() =>
                            handleUpdateOrderStatus(order.id, "COMPLETED")
                          }
                        >
                          Mark as Completed
                        </button>

                        <button
                          className="button-admin"
                          onClick={() => handleDeleteOrder(order.id)}
                        >
                          Delete Order
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="third-section">
          <h2>Food Items</h2>
          {loadingFoodItems ? (
            <p>Loading food items...</p>
          ) : (
            <div className="food-items-admin">
              {foodItems &&
                foodItems.map((item) => (
                  <div key={item.id} className="food-item-admin">
                    <img
                      src={item.foodImage || "/images/default.jpg"} // Use the imageUrl from the item
                      alt={item.name}
                      className="food-img"
                    />
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantityAvailable}</p>
                    <p>Hotel: {item.hotelName}</p>
                    <button
                      className="button-admin"
                      onClick={() => openUpdateModal(item)}
                    >
                      Update
                    </button>
                    <button
                      className="button-admin-right"
                      onClick={() => handleDeleteFoodItem(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>

        <Modal
          open={isModalOpen}
          onClose={() => setModalOpen(false)}
          size="small"
          style={{ marginLeft: "20vw" }}
        >
          <div className="update-form">
            <div className="form-container">
              <label className="label">Food Name</label>
              <input
                className="input"
                label="Food Name"
                type="text"
                placeholder="Food Name"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                required
              />

              <label className="label">Category</label>
              <input
                className="input"
                label="Category"
                type="text"
                placeholder="Category"
                value={foodCategory}
                onChange={(e) => setFoodCategory(e.target.value)}
                required
              />

              <label className="label">Price</label>
              <input
                className="input"
                label="Price"
                type="text"
                placeholder="Price"
                value={foodPrice}
                onChange={(e) => setFoodPrice(e.target.value)}
                required
              />

              <label className="label">Quantity Available</label>
              <input
                className="input"
                label="Quantity Available"
                type="number"
                placeholder="Quantity Available"
                value={foodQuantity}
                onChange={(e) => setFoodQuantity(e.target.value)}
                required
              />

              <label className="label">Hotel Name</label>
              <input
                className="input"
                label="Hotel Name"
                type="text"
                placeholder="Hotel Name"
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
                required
              />

              <button
                className="button-admin"
                onClick={handleUpdateFoodItem}
                type="submit"
                primary
              >
                Update Food Item
              </button>
            </div>
            <button
              className="button-admin"
              onClick={() => {
                setCurrentFoodItem("");
                setFoodName("");
                setFoodCategory("");
                setFoodPrice("");
                setFoodQuantity("");
                setFoodURL("");
                setHotelName("");
                setModalOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AdminPage;
