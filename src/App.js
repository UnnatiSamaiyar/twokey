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
  const [screenshotDetected, setScreenshotDetected] = useState(false);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    let data = JSON.parse(sessionStorage.getItem("token"));
    setToken(data);
    console.log("token : ", data);
  }, []);

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

  // Prevent Screenshot
  // useEffect(() => {
  //   const preventPrintScreen = (e) => {
  //     try {
  //       const forbiddenKeys = [
  //         "PrintScreen",
  //         "Snapshot",
  //         "PrtSc",
  //         "Meta",
  //         "Escape",
  //         "PrtSc",
  //         "Control",
  //         "Alt",
  //         "Shift",
  //         "Insert",
  //       ];
  //       if (forbiddenKeys.includes(e.key)) {
  //         e.preventDefault();
  //         setScreenshotDetected(true);
  //         console.log(token.user.email, " took the ScreenShot.");

  //         // Remove the blur class after 2 seconds
  //         setTimeout(() => {
  //           setScreenshotDetected(false);
  //         }, 2000);
  //       }
  //     } catch (error) {
  //       console.error(
  //         "An error occurred while preventing Print Screen:",
  //         error
  //       );
  //     }
  //   };

  //   document.addEventListener("keydown", preventPrintScreen);

  //   return () => {
  //     document.removeEventListener("keydown", preventPrintScreen);
  //   };
  // }, []);

  // Prevent Screenshot
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
          if (token && token.user.email) {
            console.log(token.user.email, " took the ScreenShot.");
          }
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
  }, []);

  return (
    <Router>
      <div className={`flex relative ${screenshotDetected ? "blur" : ""}`}>
        <SideBar />
        <div className="flex flex-col w-full ">
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
