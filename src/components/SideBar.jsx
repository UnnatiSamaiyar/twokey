import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfilePic from "../assets/profilePic.png";
import { useDarkMode } from "../context/darkModeContext";
import { useAuth } from "../context/authContext";
import { supabase } from "../helper/supabaseClient";

// Icons
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import { departmentIcons } from "../utils/iconComponents";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import MenuIcon from "@mui/icons-material/MenuRounded";

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

  useEffect(() => {
    const getProfilePic = async () => {
      try {
        const { data } = supabase.storage
          .from("avatar")
          .getPublicUrl("onlyforsave1@gmail.com");

        setPicture(data.publicUrl);

        // console.log(data.publicUrl);
      } catch (error) {
        console.log("Error while getting ProfilePic.");
      }
    };

    getProfilePic();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        let token = JSON.parse(sessionStorage.getItem("token"));
        setData(token.user.user_metadata.full_name);

        // console.log("sidebar token :", token.user.user_metadata.full_name);
      } catch (error) {
        console.log("Error while fetching the user profile data.");
      }
    }

    fetchUser();
  }, []);

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
  if (!sessionStorage.getItem("token")) {
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
              alt="dashboard"
              className={
                location.pathname === "/dashboard"
                  ? `hover:bg-gray-100 py-1.5 px-4 rounded-md ${
                      darkMode ? "bg-gray-400" : "bg-gray-200"
                    } text-sm`
                  : `hover:bg-gray-100 py-1.5 px-4 rounded-md text-sm ${
                      darkMode ? "text-gray-100" : ""
                    }`
              }
            >
              Dashboard
            </a>
          </li>
          <p
            className={`text-xs text-gray-600 mt-4  p-2 ${
              darkMode ? "text-gray-100" : ""
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
            className={`text-xs text-gray-600 mt-4 mb-2 p-2 ${
              darkMode ? "text-gray-100" : ""
            }`}
          >
            Settings
          </p>
          <li className=" ">
            <a
              href="/settings"
              alt="settings"
              className={
                location.pathname === "/settings"
                  ? "hover:bg-gray-100 py-1.5 px-4 rounded-md bg-gray-200 text-sm"
                  : "hover:bg-gray-100 py-1.5 px-4 rounded-md text-sm"
              }
            >
              Settings
            </a>
          </li>

          <li className=" mt-2">
            <button
              onClick={handleLogout}
              className={
                location.pathname === "#"
                  ? "hover-bg-gray-100 py-1.5 px-4 rounded-md bg-gray-200 text-sm"
                  : "hover-bg-gray-100 py-1.5 px-4 rounded-md text-sm"
              }
            >
              LogOut
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
