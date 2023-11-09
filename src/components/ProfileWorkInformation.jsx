import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileWorkInformation = ({ profileData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [workFormData, setWorkFormData] = useState({
    designation: profileData?.role_priv || "",
    department: profileData?.dept || "",
    manager: profileData?.manager || "",
  });

  useEffect(() => {
    setWorkFormData({
      designation: profileData?.role_priv || "",
      department: profileData?.dept || "",
      manager: profileData?.manager || "",
    });
  }, [profileData]);

  const updateProfile = async () => {
    let token = JSON.parse(sessionStorage.getItem("token"));
    if (token) {
      const res = await axios.put(
        "https://twokeybackend.onrender.com/users/updateProfile/",
        {
          id: token.user.id,
          role_priv: workFormData.designation,
          // dept: workFormData.department,
          // manager: formData.manager,
        },
        {
          headers: {
            Authorization: `Bearer ${token.session.access_token}`,
          },
        }
      );

      // console.log("Personal Work Info success:", res);
      localStorage.setItem("profileData", JSON.stringify(res.data));
    }
  };

  const toggleEditing = () => {
    if (isEditing) {
      // User clicked "Save", log the entire work form data
      // console.log("Work Form Data:", workFormData);
      updateProfile();
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkFormData({
      ...workFormData,
      [name]: value,
    });
  };

  return (
    <div className="p-4 my-4 border-2 border-gray-200 w-full rounded-xl">
      <h2 className="text-lg font-bold p-2">Work Information</h2>
      <div className="flex flex-row justify-between items-center">
        <div className="grid grid-cols-2 gap-4">
          <span>
            <h5 className="px-2 font-semibold">Designation</h5>
            <input
              name="designation"
              value={workFormData.designation}
              onChange={handleInputChange}
              className={`text-md  placeholder-gray-500 p-2 rounded-md ${
                isEditing ? "bg-white shadow-lg border" : "bg-inherit"
              }`}
              placeholder="Designation"
              disabled={!isEditing}
            />
          </span>
          <span>
            <h5 className="px-2 font-semibold">Department</h5>
            <input
              name="department"
              value={workFormData.department}
              onChange={handleInputChange}
              className={`text-md  placeholder-gray-500 p-2 rounded-md ${
                isEditing ? "bg-white shadow-lg border" : "bg-inherit"
              }`}
              placeholder="Department"
              disabled={!isEditing}
            />
          </span>
          <span>
            <h5 className="px-2 font-semibold">Manager</h5>
            <input
              name="manager"
              value={workFormData.manager}
              onChange={handleInputChange}
              className={`text-md  placeholder-gray-500 p-2 rounded-md ${
                isEditing ? "bg-white shadow-lg border" : "bg-inherit"
              }`}
              placeholder="Manager"
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

export default ProfileWorkInformation;
