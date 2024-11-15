import React from "react";
import CustomSlider from "./CustomSlider";
import Navbar from "./Navbar";
import { useState } from "react";


const Home = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleLoginModal = () => setShowLoginModal(!showLoginModal);
  const handleSignupModal = () => setShowSignupModal(!showSignupModal);

  return (
    <div className="home-container">
      <Navbar onLoginClick={handleLoginModal} onSignupClick={handleSignupModal} />
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
            with a variety of eateries, ensuring that every meal is a delightful
            experience. Our mission is to make dining out as easy as a few taps
            on your phone.
          </p>
          <div className="second-img">
            <img src="/images/chinese.jpg" />
            <img src="/images/restro.jpg" />
            <img src="/images/cooking.jpg" />
          </div>
        </div>
      </div>
      <h1 className="title">Explore our dishes</h1>
      <CustomSlider />

      <div className="offer">
        <h1>Limited offers</h1>
        <p>Get free desert on all orders above ₹3000!</p>
      </div>

      <footer class="footer">
        <p>&copy; 2024 HotByte. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
