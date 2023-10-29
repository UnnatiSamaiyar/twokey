import React, { useState, useEffect } from "react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import PrivateRoutes from "./utils/PrivateRoutes";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/authContext";

const App = () => {
  const { token } = useAuth();
  const [screenshotDetected, setScreenshotDetected] = useState(false);

  // Prevent right-click context menu
  useEffect(() => {
    const preventRightClick = (e) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", preventRightClick);

    return () => {
      document.removeEventListener("contextmenu", preventRightClick);
    };
  }, []);

  // Detect the keypress
  useEffect(() => {
    const handleKeyPress = (e) => {
      console.log("Key pressed:", e.key);
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const preventPrintScreen = (e) => {
      try {
        const forbiddenKeys = [
          "PrintScreen",
          "Snapshot",
          "PrtSc",
          "Meta",
          "Escape",
          "PrtSc",
          "Control",
          "Alt",
          "Shift",
          "Insert",
        ];
        if (forbiddenKeys.includes(e.key)) {
          e.preventDefault();

          console.log(
            "Hehehe",
            token ? token.user.user_metadata.full_name : "Unknown User",
            "took the ScreenShot."
          );

          setScreenshotDetected(true);

          // Remove the blur class after 2 seconds
          setTimeout(() => {
            setScreenshotDetected(false);
          }, 2000);
        }
      } catch (error) {
        console.error(
          "An error occurred while preventing Print Screen:",
          error
        );
      }
    };

    document.addEventListener("keydown", preventPrintScreen);

    return () => {
      document.removeEventListener("keydown", preventPrintScreen);
    };
  }, [token]);

  return (
    <Router>
      <div className={`flex relative ${screenshotDetected ? "blur" : ""}`}>
        <SideBar />
        <div className="flex flex-col w-full ">
          <TopBar />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/account" element={<Account />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/xyz" element={<Navigate to="/" />} /> */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Login />} exact />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
