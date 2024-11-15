import React from "react";
import { Navigate } from "react-router-dom";
import authService from "../services/authService";

const PrivateRoute = ({ children }) => {
  const currentUser = authService.getCurrentUser();
  const isAdmin = currentUser && currentUser.userRole === "ADMIN";

  return isAdmin ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
