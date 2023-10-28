import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

const PrivateRoutes = () => {
  const { token } = useAuth();

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
