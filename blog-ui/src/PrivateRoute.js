import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { decodeJwtToken } from "./store/auth";

const PrivateRoute = () => {
  const isLoggedIn = decodeJwtToken() 
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

