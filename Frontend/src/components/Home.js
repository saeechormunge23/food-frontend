import React, { useState, useEffect } from "react";
import foodService from "../services/foodService";
import cartService from "../services/cartService";
import CartModal from "./Cart";
import Navbar from "./Navbar";
import authService from "../services/authService";
import { useDispatch, useSelector } from "react-redux";
import BillModal from "./BillModal";
import { addToCart, clearCart } from "../redux/cartSlice"; // Import Redux action
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const foodImageMap = {
  Pizza: "/images/pizza.jpg",
  Burger: "/images/burger.jpg",
  Pasta: "/images/pasta.jpeg",
  Sushi: "/images/sushi.webp",
  Salad: "/images/salad.jpg",
  Biryani: "/images/biryani.jpg",
  Chinese: "/images/chinese.jpg",
  Dessert: "/images/dessert.jpeg",
  Fries: "/images/fries.jpg",
  Sandwich: "/images/sandwich.jpg",
};

const Home = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const currentUser = authService.getCurrentUser();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const Navigate = useNavigate();
  const [isBillOpen, setBillOpen] = useState(false); // State to manage bill modal visibility
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    currentUser.userRole === "USER" &&
      foodService
        .getAllFoodItems()
        .then((response) => {
          toast(`${currentUser.name} Welcome to hotbyte.`, {
            position: "top-right",
            autoClose: 2000,
          });
          setFoodItems(response.data);
          setFilteredItems(response.data);
        })
        .catch((error) => console.error("Error fetching food items:", error));

    currentUser.userRole === "ADMIN" && Navigate("/admin");
  }, []);

  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleAddToCart = (foodItem) => {
    if (foodItem.quantityAvailable > 0) {
      dispatch(addToCart(foodItem)); // Dispatch Redux action
      toast(`${foodItem.name} added to cart.`, {
        position: "top-right",
        autoClose: 2000,
      });

      // Update the available quantity immediately in the frontend
      setFoodItems((prevFoodItems) =>
        prevFoodItems.map((item) =>
          item.id === foodItem.id
            ? { ...item, quantityAvailable: item.quantityAvailable - 1 }
            : item
        )
      );
      setFilteredItems((prevFilteredItems) =>
        prevFilteredItems.map((item) =>
          item.id === foodItem.id
            ? { ...item, quantityAvailable: item.quantityAvailable - 1 }
            : item
        )
      );
    } else {
      toast(`${foodItem.name} is not available right now.`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handlePlaceOrder = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
    cartService
      .placeOrder(items)
      .then((response) => {
        console.log("Order placed successfully:", response);
        toast.success("Order placed successfully.", {
          position: "top-right",
          autoClose: 2000,
        });
        setBillOpen(true);
        setCartOpen(false);

        setFoodItems((prevFoodItems) => {
          return prevFoodItems.map((foodItem) => {
            const orderedItem = items.find(
              (cartItem) => cartItem.id === foodItem.id
            );
            if (orderedItem) {
              return {
                ...foodItem,
                quantityAvailable:
                  foodItem.quantityAvailable - orderedItem.quantity,
              };
            }
            return foodItem;
          });
        });
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        toast.error("Insufficient Quantity! Order cannot be placed.", {
          position: "top-right",
          autoClose: 2000,
        });
      });
  };

  const handleSearch = (results) => {
    if (results.length > 0) {
      setFilteredItems(results);
    } else {
      setFilteredItems(foodItems);
    }
  };

  return (
    <>
      <Navbar
        setCartOpen={setCartOpen}
        cartItemCount={totalCartItems}
        onSearch={handleSearch}
      />
      <div className="home-container">
        <div className="background-image">
          <h1 className="welcome-text">Welcome Foodies!</h1>
        </div>
        <div className="second-container">
          <div className="second">
            <h1 className="second-title">
              Craving something delicious? We’ve got you covered!
            </h1>
            <p className="second-para">
              Founded on the love for food and community, HotByte connects you
              with a variety of eateries, ensuring that every meal is a
              delightful experience. Our mission is to make dining out as easy
              as a few taps on your phone.
            </p>
            <div className="second-img">
              <img src="/images/chinese.jpg" />
              <img src="/images/restro.jpg" />
              <img src="/images/cooking.jpg" />
            </div>
          </div>
        </div>
        <h1 className="title">Explore our dishes</h1>
        <div className="food-items">
          {currentUser.userRole === "USER" &&
            (filteredItems.length > 0 ? filteredItems : foodItems).map(
              (item) => (
                <div key={item.id} className="food-item">
                  <img
                    src={item.foodImage || "/images/default.jpg"} // Use the imageUrl from the item
                    alt={item.name}
                    className="food-img"
                  />
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price.toFixed(2)}</p>
                  <p>Available Quantity: {item.quantityAvailable}</p>{" "}
                  <p>Restaurant : {item.hotelName}</p>{" "}
                  <button
                    className="button-home"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              )
            )}
        </div>

        <div className="offer">
          <h1>Limited offers</h1>
          <p>Get free desert on all orders above ₹3000!</p>
        </div>

        <footer className="footer">
          <p>&copy; 2024 HotByte. All Rights Reserved.</p>
        </footer>
        <CartModal
          isOpen={isCartOpen}
          onClose={() => setCartOpen(false)}
          cartItems={cartItems}
          onPlaceOrder={handlePlaceOrder}
        />

        <BillModal
          isOpen={isBillOpen}
          onClose={() => setBillOpen(false)}
          cartItems={cartItems}
          totalPrice={totalPrice}
        />
      </div>
    </>
  );
};

export default Home;
