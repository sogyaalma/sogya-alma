import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

const ProtectedRoute = () => {
  const [cookies] = useCookies(["apiKey"]);
  const cookiesToken = cookies.apiKey;
  return cookiesToken ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
