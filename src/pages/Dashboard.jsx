import React from "react";
import QuickShare from "../components/QuickShare";
import RecentFiles from "../components/RecentFiles";
import FileTypes from "../components/FileTypes";
import FolderImg from "../assets/folder.svg";
import { useDarkMode } from "../context/darkModeContext";

let folders = [
  "Account",
  "Finance",
  "Development",
  "Manufacturing",
  "Sales",
  "Human Resources",
];

const Dashboard = () => {
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`p-4 h-full ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className={`flex flex-row justify-between items-center `}>
        <p className="text-2xl font-semibold">Files</p>
        <span className="flex gap-2">
          <button
            className={`py-1 px-4 rounded-md ${
              darkMode ? "bg-gray-600" : "bg-gray-50"
            } border`}
          >
            + Share
          </button>
          <QuickShare />
        </span>
      </div>

      <div>
        <span className="flex flex-row justify-between items-center my-4">
          <p className="text-lg font-semibold">Folders</p>
          <button className="px-2 border rounded-lg text-xl text-center">
            {" "}
            +{" "}
          </button>
        </span>

        <div className="grid grid-cols-4 gap-4">
          {folders.map((folder) => (
            <div
              key={folder}
              className={`flex flex-row justify-between items-center border p-2 rounded-lg `}
            >
              <span className="flex flex-row gap-2 items-center">
                <img
                  src={FolderImg}
                  alt="folder"
                  className="bg-gray-100 rounded-lg p-1 h-8"
                />{" "}
                <span>
                  <p
                    className={`text-md font-semibold ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {folder}
                  </p>
                  <p
                    className={`text-xs ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    123 files
                  </p>
                </span>
              </span>
              <p
                className={`text-sm font-semibold ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                20 GB
              </p>
            </div>
          ))}
        </div>

        <FileTypes />

        <RecentFiles />
      </div>
    </div>
  );
};

export default Dashboard;
