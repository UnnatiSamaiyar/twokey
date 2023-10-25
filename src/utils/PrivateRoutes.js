import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PrivateRoutes = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const auth = window.localStorage.getItem(
      "sb-dxqrkmzagreeiyncplzx-auth-token"
    );
    if (auth) {
      setToken(JSON.parse(auth));
    }
  }, []);

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
