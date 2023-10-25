import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfilePic from "../assets/profilePic.png";

function SideBar() {
  const location = useLocation();
  const [data, setData] = useState("");
  let navigate = useNavigate();

  function handleLogout() {
    navigate("/");
    sessionStorage.removeItem("token");
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let res = JSON.parse(sessionStorage.getItem("token"));
      setData(res.user.user_metadata.full_name);
      console.log("sidebar", res.user.user_metadata.full_name);
    }
  }, []);

  // Check if the path is either "/" or "/signup"
  const hideSideBar =
    location.pathname === "/" || location.pathname === "/signup";

  if (hideSideBar) {
    return null; // Don't render the SideBar
  }

  let departments = [
    { name: "Account", path: "/account" },
    { name: "Finance", path: "/finance" },
    { name: "Development", path: "/development" },
    { name: "Manufacturing", path: "/manufacturing" },
    { name: "Sales", path: "/sales" },
    { name: "Human Resources", path: "/humanresources" },
  ];

  return (
    <nav className="h-auto w-1/6 p-4 bg-gray-50 border border-r-2 border-r-gray-200  flex flex-col justify-between ">
      <div>
        <a href="/dashboard" alt="LOGO" className="text-2xl text-gray-500 ">
          Twokey
        </a>
        <ul className=" text-gray-800 ">
          <p className="text-xs text-gray-600 mt-4 mb-2 p-2">Overview</p>
          <li className=" ">
            <a
              href="/dashboard"
              alt="dashboard"
              className={
                location.pathname === "/dashboard"
                  ? "hover:bg-gray-100 py-1.5 px-4 rounded-md bg-gray-200 text-sm"
                  : "hover:bg-gray-100 py-1.5 px-4 rounded-md text-sm"
              }
            >
              Dashboard
            </a>
          </li>

          <p className="text-xs text-gray-600 mt-4  p-2">Department</p>

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

          <p className="text-xs text-gray-600 mt-4 mb-2 p-2">Settings</p>
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
                location.pathname === "/settings"
                  ? "hover:bg-gray-100 py-1.5 px-4 rounded-md bg-gray-200 text-sm"
                  : "hover:bg-gray-100 py-1.5 px-4 rounded-md text-sm"
              }
            >
              LogOut
            </button>
          </li>
        </ul>
      </div>
      <div>
        {data && (
          <span className="flex gap-2 items-center">
            <img
              src={ProfilePic}
              alt="ProfilePic"
              className="w-6 h-6 rounded-full"
            />
            <p>#{data}</p>
          </span>
        )}
      </div>
    </nav>
  );
}

export default SideBar;
