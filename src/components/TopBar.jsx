import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "../assets/notification.svg";
import LightMode from "../assets/lightMode.svg";
import DarkMode from "../assets/darkMode.svg";
import { useDarkMode } from "../context/darkModeContext";

const TopBar = () => {
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const hideTopBar =
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/onboarding";

  const topBarPath = location.pathname === "/dashboard";

  return (
    <nav
<<<<<<< HEAD
      className={`w-full p-1 fixed top-0 ${
        darkMode ? "bg-opacity-70 backdrop-blur-lg bg-gray-800" : "bg-opacity-70 backdrop-blur-lg bg-white"
      } border-b-2 p-1 z-50`}
=======
      className={`topbar ${
        scrolled ? "scrolled" : ""
      } border-b-2 p-1`}
>>>>>>> eb9b9d49b50b927f099f080bbd72af93553284d9
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-8">
        <p
          className={`${
            darkMode ? "text-gray-300" : "text-gray-800"
          } capitalize`}
        >
          {topBarPath
            ? "Overview / Dashboard"
            : `${location.pathname}`.slice(1)}
        </p>
        <div className="flex justify-between gap-8">
          <div className="relative w-96">
            <SearchIcon
              sx={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: "10px",
                color: "#808080",
              }}
            />
            <input
              type="search"
              placeholder="Search"
              className={`w-full p-1 pl-12 ${
                darkMode ? "bg-opacity-70 backdrop-blur-lg bg-gray-700" : "bg-opacity-70 backdrop-blur-lg bg-gray-100"
              } rounded-md text-white`}
            ></input>
          </div>
          <span className="flex gap-2">
            <img
              src={darkMode ? DarkMode : LightMode}
              alt="LightMode"
              className="cursor-pointer"
              onClick={toggleDarkMode}
            />
            <img
              src={NotificationsIcon}
              alt="notifications"
              className="cursor-pointer"
            />
          </span>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
 