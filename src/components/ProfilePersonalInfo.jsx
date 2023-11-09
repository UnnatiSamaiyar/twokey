import React, { useState } from "react";
import { useAuth } from "../context/authContext";

const ProfilePersonalInfo = ({ profileData }) => {
  const [isEditing, setIsEditing] = useState(false);
  // const { profileData } = useAuth();

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="p-4 my-4 border-2 border-gray-200 w-full rounded-xl">
      <h2 className="text-lg font-bold p-2">Personal Information</h2>
      <div className="flex flex-row justify-between items-center">
        <div className="grid grid-cols-2 gap-4">
          <span>
            <h5 className="px-2 font-semibold">First Name</h5>
            <input
              className={`text-md  placeholder-gray-500 p-2 rounded-md ${
                isEditing ? "bg-white shadow-lg border" : "bg-inherit"
              }`}
              placeholder={profileData.name ? profileData.name : "First Name"}
              disabled={!isEditing}
            />
          </span>
          <span>
            <h5 className="px-2 font-semibold">Last Name</h5>
            <input
              className={`text-md  placeholder-gray-500 p-2 rounded-md ${
                isEditing ? "bg-white shadow-lg border" : "bg-inherit"
              }`}
              placeholder={
                profileData.last_name ? profileData.last_name : "Last Name"
              }
              disabled={!isEditing}
            />
          </span>
          <span>
            <h5 className="px-2 font-semibold">Email Address</h5>
            <input
              className={`text-md  placeholder-gray-500 p-2 rounded-md ${
                isEditing ? "bg-white shadow-lg border" : "bg-inherit"
              }`}
              placeholder={
                profileData.email ? profileData.email : "Email Address"
              }
              disabled={!isEditing}
            />
          </span>
          <span>
            <h5 className="px-2 font-semibold">Phone Number</h5>
            <input
              className={`text-md  placeholder-gray-500 p-2 rounded-md ${
                isEditing ? "bg-white shadow-lg border" : "bg-inherit"
              }`}
              placeholder={profileData.phone ? profileData.phone : "9876543210"}
              disabled={!isEditing}
            />
          </span>
        </div>
        <button
          onClick={toggleEditing}
          className={`px-4 py-1 text-sm border-2 rounded-md ${
            isEditing ? "bg-blue-700 text-white" : "bg-white"
          }`}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePersonalInfo;
