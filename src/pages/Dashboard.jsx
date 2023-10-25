import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuickShare from "../components/QuickShare";
import RecentFiles from "../components/RecentFiles";
import FileTypes from "../components/FileTypes";
import FolderImg from "../assets/folder.svg";

let folders = [
  "Account",
  "Finance",
  "Development",
  "Manufacturing",
  "Sales",
  "Human Resources",
];

const Dashboard = () => {
  return (
    <div className="p-4">
      <div className="flex flex-row justify-between items-center">
        <p className="text-2xl font-semibold">Files</p>
        <span className="flex gap-2">
          <button className="py-1 px-4 rounded-md bg-gray-50 border">
            + Share
          </button>
          {/* <button
            className="py-1 px-4 rounded-md bg-blue-700 text-white items-center"
            onClick={() => alert("Quick share clicked")}
          >
            Quick Share
          </button> */}

          <QuickShare />
        </span>
      </div>

      <div>
        <span className="flex flex-row justify-between items-center my-4">
          <p className="text-lg font-semibold">Folders</p>
          <button className="text-gray-600 text-2xl px-2 rounded-md bg-gray-50 border">
            +
          </button>
        </span>

        <div className="grid grid-cols-4 gap-4">
          {folders.map((folder) => (
            <div
              key={folder}
              className="flex flex-row justify-between items-center border p-2 rounded-lg"
            >
              <span className="flex flex-row gap-2 items-center">
                <img
                  src={FolderImg}
                  alt="folder"
                  className="bg-gray-100 rounded-lg p-1 h-8"
                />{" "}
                <span>
                  <p className="text-md font-semibold">{folder}</p>
                  <p className="text-xs">123 files</p>
                </span>
              </span>
              <p className="text-sm font-semibold">20 GB</p>
            </div>
          ))}
        </div>

        <p className="text-lg font-semibold my-4">Files</p>
        <FileTypes />

        <p className="text-lg font-semibold my-4">Recent Files</p>
        <RecentFiles />
      </div>
    </div>
  );
};

export default Dashboard;
