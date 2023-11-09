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

function SideBar() {
  const location = useLocation();

  const [data, setData] = useState("");
  const { darkMode } = useDarkMode();
  let navigate = useNavigate();
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

  function handleLogout() {
    navigate("/");
    sessionStorage.removeItem("token");
  }

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

  if (hideSideBar) {
    return null;
  }

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
  console.log(darkMode);
  if (!sessionStorage.getItem("token")) {
    return null;
  }

  return (
    <nav
      className={`h-auto hidden  md:w-56 lg:w-60 md:flex flex-col justify-between p-4 bg-gray-100 border border-b-0 border-r-2 border-r-gray-200 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="w-full">
        <a
          href="/dashboard"
          alt="LOGO"
          className={`text-xl md:text-2xl ${
            darkMode ? "text-gray-300" : "text-gray-500"
          }`}
        >
          Twokey
        </a>
        <ul className={`${darkMode ? "text-white" : "text-gray-800"}`}>
          <p
            className={`text-xs text-gray-600 mt-4 mb-2 p-2 ${
              darkMode ? "text-gray-200" : ""
            }`}
          >
            Overview
          </p>
          <li className="min-w-full">
            <div className="flex">
              <a
                href="/dashboard"
                alt="Dashboard"
                className={`flex justify-start min-w-full ${
                  location.pathname === "/dashboard"
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
                <DashboardRoundedIcon />
                <p className="px-2">Dashboard</p>
              </a>
            </div>
          </li>
          <p
            className={`text-xs text-gray-600 mt-4  p-2 ${
              darkMode ? "text-gray-100" : ""
            }`}
          >
            Department
          </p>

          {departments.map((department, index) => (
            <li key={index} className="min-w-full">
              <a
                href={department.path}
                alt={department.name}
                className={`flex justify-start min-w-full ${
                  location.pathname === department.path
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
                {departmentIcons[department.name]}
                <p className="px-2">{department.name}</p>
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
          <div className="flex">
            <li className="min-w-full ">
              <a
                href="/settings"
                alt="settings"
                className={`flex justify-start min-w-full ${
                  location.pathname === "/settings"
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
                <TuneRoundedIcon />
                <p className="px-2">Settings</p>
              </a>
            </li>
          </div>
          <div className="flex">
            <li className="min-w-full">
              <button
                onClick={handleLogout}
                className={`flex justify-start min-w-full ${
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
          </div>
        </ul>
      </div>
      <div className="min-w-full">
        <footer className="fixed bottom-4 left-4 ">
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
