import React from "react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import Test from "./pages/Test";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/authContext";

const App = () => {
  const { token } = useAuth();

  return (
    <Router>
      <div className="grid grid-cols-6">
        <SideBar />
        <div className="col-span-5 ">
          <TopBar />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/account" element={<Account />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/test" element={<Test />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Login />} exact />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
