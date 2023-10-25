import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneTwoToneIcon from "@mui/icons-material/NotificationsNoneTwoTone";
import NotificationsIcon from "../assets/notification.svg";
import LightMode from "../assets/lightMode.svg";
import DarkMode from "../assets/darkMode.svg";

const TopBar = () => {
  const location = useLocation();

  const hideTopBar =
    location.pathname === "/" || location.pathname === "/signup";

  if (hideTopBar) {
    return null;
  }

  return (
    <nav className="h-[72px] w-full bg-white border-b-2 p-1">
      <div className="container mx-auto flex items-center justify-between h-16 px-8">
        <p>Overview / Dashboard</p>
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
              className="w-full p-1 pl-12 bg-gray-100 rounded-md"
            ></input>
          </div>
          <span className="flex gap-2">
            {/* <i>d</i> */}
            {/* <NotificationsNoneTwoToneIcon className="" /> */}
            <img src={LightMode} alt="LightMode" className="cursor-pointer" />
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
