import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import "../styles/CustomSlider.css";
import FoodCard from './FoodCard'

const CustomSlider = () => {
  const foodItems = [
    { name: "Pizza", image: "/images/pizza.jpg" },
    { name: "Burger", image: "/images/burger.jpg" },
    { name: "Pasta", image: "/images/pasta.jpeg" },
    { name: "Sushi", image: "/images/sushi.webp" },
    { name: "Salad", image: "/images/salad.jpg" },
    { name: "Biryani", image: "/images/biryani.jpg" },
    { name: "Dessert", image: "/images/dessert.jpeg" },
    { name: "Fries", image: "/images/fries.jpg" },
    { name: "Sandwich", image: "/images/sandwich.jpg" },
    { name: "Chinese", image: "/images/chinese.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage < foodItems.length ? prevIndex + itemsPerPage : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage >= 0
        ? prevIndex - itemsPerPage
        : foodItems.length - itemsPerPage
    );
  };

  return (
    <div className="slider-container">
      <div className="slider-content">
        <Button
          onClick={prevSlide}
          icon="arrow left"
          className="slider-button left"
        />
        <div className="slider-cards">
          <FoodCard foodItems={foodItems.slice(currentIndex, currentIndex + itemsPerPage)} />
        </div>
        <Button
          onClick={nextSlide}
          icon="arrow right"
          className="slider-button right"
        />
      </div>
    </div>
  );
};

export default CustomSlider;
