import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import "../styles/Navbar.css";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../assets/logo3.avif";
import { Modal } from "react-bootstrap";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import "../styles/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import foodService from "../services/foodService";
import ProfileModal from "./ProfileModal";
{
  /* change */
}

const Navbar = ({ setCartOpen, cartItemCount, onSearch }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [search, setSearch] = useState(""); //change
  const [searchResults, setSearchResults] = useState([]); //change
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileOpen = () => setShowProfile(true);
  const handleProfileClose = () => setShowProfile(false);

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => {
    setShowLogin(true);
    console.log(currentUser); 
  };
  const handleSignupClose = () => setShowSignup(false);
  const handleSignupShow = () => setShowSignup(true);

  const currentUser = authService.getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/");
    toast("Logged Out successfully.", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  // Change
  const handleSearch = async (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      onSearch([]);
      return;
    }

    try {
      const response = await foodService.serchFoodItem(search);
      onSearch(response.data);
      console.log("Search Results:", response.data); // You can use this data to display results on the UI
    } catch (error) {
      console.error("Error fetching search results", error);
      toast.error("No results found.");
    }
  };

  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/">
        <img
          className="navbar-logo"
          src={logo}
          alt="Logo"
          style={{ width: "40px", height: "40px", marginRight: "10px" }}
        />
        <span className="menu-logo">HotByte</span>
      </Link>
      <ul className="navbar-nav">
        {!currentUser ? (
          <>
            <li className="nav-item">
              <button className="nav-link" onClick={handleLoginShow}>
                Login
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={handleSignupShow}>
                Signup
              </button>
            </li>
          </>
        ) : (
          <>
            {currentUser.userRole === "ADMIN" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin
                </Link>
              </li>
            )}
            {currentUser.userRole === "USER" && (
              <li className="nav-item">
                {/* Search Bar */}
                {/* <li className="nav-item search-bar"> */}
                <form onSubmit={handleSearch} className="search-form">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>
                {/* </li> */}

                <button
                  className="nav-link"
                  onClick={() => {
                    setCartOpen(true);
                  }}
                >
                  <FaShoppingCart />
                  {cartItemCount > 0 && (
                    <span className="cart-count">{cartItemCount}</span>
                  )}
                </button>

                {/* change */}
                <button className="nav-link" onClick={handleProfileOpen}>
                  <i class="bi bi-person-fill"></i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    fill="currentColor"
                    class="bi bi-person-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg>

                  {/* <span className="profile-name">{currentUser.userRole}</span> */}
                </button>
                {/* change */}
              </li>
            )}
            <li className="nav-item">
              <button
                className="nav-link btn btn-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>

      <Modal
        show={showLogin}
        onHide={handleLoginClose}
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginModal closeModal={handleLoginClose} />
        </Modal.Body>
      </Modal>

      <Modal
        show={showSignup}
        onHide={handleSignupClose}
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignupModal closeModal={handleSignupClose} />
        </Modal.Body>
      </Modal>

      <ProfileModal
        show={showProfile}
        handleClose={handleProfileClose}
        user={currentUser}
      />
    </nav>
  );
};

export default Navbar;
