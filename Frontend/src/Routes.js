import React from "react";
import { Route, Routes } from "react-router-dom";
import OrderForm from "./components/order/OrderForm";
import AdminPage from "./components/AdminPage";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Landing from "./components/Landing";
import PrivateRoute from "./utils/PrivateRoutes";
import LoginModal from "./components/LoginModal";

const SRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/order" element={<OrderForm />} />
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default SRoutes;
