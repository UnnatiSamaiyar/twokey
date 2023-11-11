import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfilePic from "../assets/profilePic.png";
import { useDarkMode } from "../context/darkModeContext";
import { useAuth } from "../context/authContext";
import ProfilePicDummy from "../assets/profilePicDummy.jpg";
import { supabase } from "../helper/supabaseClient";

// Mui Icons And Drawers
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import { departmentIcons } from "../utils/iconComponents";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import MenuIcon from "@mui/icons-material/MenuRounded";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";

/**
 * Sidebar component for navigation and user-related actions.
 * @returns {JSX.Element} The Sidebar component.
 */
function SideBar() {
  const location = useLocation();

  const [data, setData] = useState("");
  const { darkMode } = useDarkMode();
  const [picture, setPicture] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    let data = localStorage.getItem("profileData");
    setProfileData(JSON.parse(data));
  }, []);

  function handleLogout() {
    navigate("/");
    sessionStorage.removeItem("token");
  }

  // useEffect(() => {
  //   async function fetchUser() {
  //     try {
  //       let token = JSON.parse(sessionStorage.getItem("token"));
  //       setData(token.user.user_metadata.full_name);

  //       // console.log("sidebar token :", token.user.user_metadata.full_name);
  //     } catch (error) {
  //       console.log("Error while fetching the user profile data.");
  //     }
  //   }

  //   fetchUser();
  // }, []);

  const hideSideBar =
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/onboarding";

  let departments = [
    { name: "Account", path: "/account" },
    { name: "Finance", path: "/finance" },
    { name: "Development", path: "/development" },
    { name: "Manufacturing", path: "/manufacturing" },
    { name: "Sales", path: "/sales" },
    { name: "Human Resources", path: "/humanresources" },
  ];
  /**
   * If the user is unauthorised then no need to show the side panel.
   * Feel free to delete if needed.
   */
  if (!sessionStorage.getItem("token") || hideSideBar) {
    return null;
  }

  return (
    <nav
      className={`h-auto w-56 flex flex-col justify-between p-4 bg-gray-100 border border-b-0 border-r-2 border-r-gray-200 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div>
        <a
          href="/dashboard"
          alt="LOGO"
          className={`text-2xl ${darkMode ? "text-gray-300" : "text-gray-500"}`}
        >
          Twokey
        </a>
        <ul className={`${darkMode ? "text-white" : "text-gray-800"}`}>
          <p
            className={`text-xs text-gray-600 mt-4 mb-2 p-2 ${
              darkMode ? "text-gray-100" : ""
            }`}
          >
            Overview
          </p>
          <li className=" ">
            <a
              href="/dashboard"
              alt="Dashboard"
              className={`flex justify-start items-center min-w-full ${
                location.pathname === "/dashboard"
                  ? `hover:bg-gray-100 py-1.5 px-4 rounded-md ${
                      darkMode ? "bg-gray-400" : "bg-gray-200"
                    } text-sm`
                  : `hover:bg-gray-100 py-1.5 px-4 rounded-md text-sm ${
                      darkMode ? "text-gray-100" : ""
                    }`
              }
            >
              <DashboardRoundedIcon />
              <p className="px-2">Dashboard</p>
            </a>
          </li>
        </div>
        <p
          className={`text-xs  mt-4  p-2 ${
            darkMode ? "text-gray-200" : "text-gray-600"
          }`}
        >
          Department
        </p>

          {departments.map((department, index) => (
            <li key={index} className="mb-4">
              <a
                href={department.path}
                alt={department.name}
                className={
                  location.pathname === department.path
                    ? "hover:bg-gray-100 py-1.5 px-4 rounded-md bg-gray-200 text-sm"
                    : "hover:bg-gray-100 py-1.5 px-4 rounded-md text-sm"
                }
              >
                {department.name}
              </a>
            </li>
          ))}

        <p
          className={`text-xs mt-4 mb-2 p-2 ${
            darkMode ? "text-gray-200" : "text-gray-600 "
          }`}
        >
          Settings
        </p>
        <li className="min-w-full my-2">
          <div className="flex items-center">
            <a
              href="/settings"
              alt="settings"
              className={`flex justify-start items-center min-w-full ${
                location.pathname === "/settings"
                  ? "hover:bg-gray-100 py-1.5 px-4 rounded-md bg-gray-200 text-sm"
                  : "hover:bg-gray-100 py-1.5 px-4 rounded-md text-sm"
              }
            >
              <TuneRoundedIcon />
              <p className="px-2">Settings</p>
            </a>
          </div>
        </li>
        <li className="min-w-full my-2">
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className={`flex justify-start items-center min-w-full ${
                location.pathname === "#"
                  ? `hover:${
                      darkMode ? "bg-gray-600" : "bg-gray-100"
                    } duration-200 p-2 rounded-md ${
                      darkMode ? "bg-gray-700" : "bg-gray-200"
                    } text-sm`
                  : `hover:${
                      darkMode ? "bg-gray-600" : "bg-gray-100"
                    } p-2 rounded-md text-sm ${
                      darkMode ? "text-gray-100" : ""
                    } duration-200`
              }`}
            >
              <ExitToAppRoundedIcon />
              <p className="px-2">LogOut</p>
            </button>
          </li>
        </ul>
      </div>
      <div>
        <footer className="fixed bottom-4 left-4">
          <span className="">
            <a
              href="/profile"
              alt="Profile"
              className={`${
                darkMode ? "text-gray-300" : ""
              } flex flex-row gap-2`}
            >
              <img
                src={picture ? picture : ProfilePic}
                alt="ProfilePic"
                className={`w-6 h-6 rounded-full ${
                  darkMode ? "filter brightness-100 border border-white" : ""
                }`}
              />
              #{data ? data : "Profile"}
            </a>
          </span>
        </footer>
      </div>
    </nav>
  );
}

export default SideBar;
