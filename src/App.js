import React, { useState, useEffect } from "react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import ProtectedRoutes from "./utils/PrivateRoutes";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [token, setToken] = useState("");

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
      // console.log(
      //   "app.js local storage",
      //   window.localStorage.getItem("sb-dxqrkmzagreeiyncplzx-auth-token")
      // );
    }
  }, []);

  return (
    <Router>
      <div className="flex relative">
        <SideBar />
        <div className="flex flex-col w-full">
          <TopBar />
          <Routes>
            <Route path={"/dashboard"} element={<Dashboard />} />
            <Route path={"/account"} element={<Account />} />

            <Route path={"/signup"} element={<SignUp />} />
            <Route path={"/"} element={<Login />} exact />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
