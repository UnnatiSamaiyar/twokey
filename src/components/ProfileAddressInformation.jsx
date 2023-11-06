import React, { useState } from "react";

const ProfileAddressInformation = () => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="p-4 my-4 border-2 border-gray-200 w-full rounded-xl">
      <h2 className="text-lg font-bold p-2">Address</h2>
      <div className="flex flex-row justify-between items-center">
        <div className="grid grid-cols-2 gap-4">
          <span>
            <h5 className="px-2 font-semibold">Country</h5>
            <input
              className={`text-md  placeholder-gray-500 p-2 rounded-md ${
                isEditing ? "bg-white shadow-lg border" : "bg-inherit"
              }`}
              placeholder="Country"
              disabled={!isEditing}
            />
          </span>
          <span>
            <h5 className="px-2 font-semibold">State</h5>
            <input
              className={`text-md  placeholder-gray-500 p-2 rounded-md ${
                isEditing ? "bg-white shadow-lg border" : "bg-inherit"
              }`}
              placeholder="State"
              disabled={!isEditing}
            />
          </span>
          <span>
            <h5 className="px-2 font-semibold">City</h5>
            <input
              className={`text-md  placeholder-gray-500 p-2 rounded-md ${
                isEditing ? "bg-white shadow-lg border" : "bg-inherit"
              }`}
              placeholder="City"
              disabled={!isEditing}
            />
          </span>
          <span>
            <h5 className="px-2 font-semibold">Postal Code</h5>
            <input
              className={`text-md  placeholder-gray-500 p-2 rounded-md ${
                isEditing ? "bg-white shadow-lg border" : "bg-inherit"
              }`}
              placeholder="Postal Code"
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

export default ProfileAddressInformation;
