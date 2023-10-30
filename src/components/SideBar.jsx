import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfilePic from "../assets/profilePic.png";
import { useDarkMode } from "../context/darkModeContext";
import { useAuth } from "../context/authContext";

function SideBar() {
  const location = useLocation();
  const { token } = useAuth();
  const [data, setData] = useState("");
  const { darkMode } = useDarkMode();
  let navigate = useNavigate();

  function handleLogout() {
    navigate("/");
    sessionStorage.removeItem("token");
  }

  useEffect(() => {
    if (token) {
      setData(token.user.user_metadata.full_name);
      console.log(
        "sidebar context token :",
        token.user.user_metadata.full_name
      );
    }
  }, [token]);

  const hideSideBar =
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/onboarding";

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

  // return (
  //   <nav
  //     className={`h-screen flex flex-col justify-between w-1/6 p-4 bg-gray-50 border border-b-0 border-r-2 border-r-gray-200 ${
  //       darkMode ? "bg-gray-800" : "bg-white"
  //     }`}
  //   >
  //     <div>
  //       <a
  //         href="/dashboard"
  //         alt="LOGO"
  //         className={`text-2xl ${darkMode ? "text-gray-300" : "text-gray-500"}`}
  //       >
  //         Twokey
  //       </a>
  //       <ul className={`${darkMode ? "text-white" : "text-gray-800"}`}>
  //         <p
  //           className={`text-xs text-gray-600 mt-4 mb-2 p-2 ${
  //             darkMode ? "text-gray-100" : ""
  //           }`}
  //         >
  //           Overview
  //         </p>
  //         <li className=" ">
  //           <a
  //             href="/dashboard"
  //             alt="dashboard"
  //             className={
  //               location.pathname === "/dashboard"
  //                 ? "hover:bg-gray-100 py-1.5 px-4 rounded-md bg-gray-200 text-sm"
  //                 : "hover:bg-gray-100 py-1.5 px-4 rounded-md text-sm"
  //             }
  //           >
  //             Dashboard
  //           </a>
  //         </li>

  //         <p
  //           className={`text-xs text-gray-600 mt-4  p-2 ${
  //             darkMode ? "text-gray-100" : ""
  //           }`}
  //         >
  //           Department
  //         </p>

  //         {departments.map((department, index) => (
  //           <li key={index} className="mb-4">
  //             <a
  //               href={department.path}
  //               alt={department.name}
  //               className={
  //                 location.pathname === department.path
  //                   ? "hover:bg-gray-100 py-1.5 px-4 rounded-md bg-gray-200 text-sm"
  //                   : "hover:bg-gray-100 py-1.5 px-4 rounded-md text-sm"
  //               }
  //             >
  //               {department.name}
  //             </a>
  //           </li>
  //         ))}

  //         <p
  //           className={`text-xs text-gray-600 mt-4 mb-2 p-2 ${
  //             darkMode ? "text-gray-100" : ""
  //           }`}
  //         >
  //           Settings
  //         </p>
  //         <li className=" ">
  //           <a
  //             href="/settings"
  //             alt="settings"
  //             className={
  //               location.pathname === "/settings"
  //                 ? "hover:bg-gray-100 py-1.5 px-4 rounded-md bg-gray-200 text-sm"
  //                 : "hover:bg-gray-100 py-1.5 px-4 rounded-md text-sm"
  //             }
  //           >
  //             Settings
  //           </a>
  //         </li>

  //         <li className=" mt-2">
  //           <button
  //             onClick={handleLogout}
  //             className={
  //               location.pathname === "/settings"
  //                 ? "hover-bg-gray-100 py-1.5 px-4 rounded-md bg-gray-200 text-sm"
  //                 : "hover-bg-gray-100 py-1.5 px-4 rounded-md text-sm"
  //             }
  //           >
  //             LogOut
  //           </button>
  //         </li>
  //       </ul>
  //     </div>
  //     <div>
  //       {data && (
  //         <span className="flex gap-2 items-center">
  //           <img
  //             src={ProfilePic}
  //             alt="ProfilePic"
  //             className="w-6 h-6 rounded-full"
  //           />
  //           <p className={`${darkMode ? "text-gray-300" : ""}`}>#{data}</p>
  //         </span>
  //       )}
  //     </div>
  //   </nav>
  // );

  return (
    <nav
      className={`h-screen flex flex-col justify-between w-1/6 p-4 bg-gray-50 border border-b-0 border-r-2 border-r-gray-200 ${
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
                location.pathname === "/settings"
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
        {data && (
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
                  src={ProfilePic}
                  alt="ProfilePic"
                  className={`w-6 h-6 rounded-full ${
                    darkMode ? "filter brightness-200 border border-white" : ""
                  }`}
                />
                #{data}
              </a>
            </span>
          </footer>
        )}
      </div>
    </nav>
  );
}

export default SideBar;
