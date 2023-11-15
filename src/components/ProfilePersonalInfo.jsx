import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";

const ProfilePersonalInfo = ({ profileData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: profileData?.name || "",
    lastName: profileData?.last_name || "",
    email: profileData?.email || "",
    phone: profileData?.phone || "",
  });

  useEffect(() => {
    setFormData({
      firstName: profileData?.name || "",
      lastName: profileData?.last_name || "",
      email: profileData?.email || "",
      phone: profileData?.phone || "",
    });
  }, [profileData]);

  const updateProfile = async () => {
    let token = JSON.parse(sessionStorage.getItem("token"));
    if (token) {
      const res = await axios.put(
        "https://twokeybackend.onrender.com/users/updateProfile/",
        {
          id: token.user.id,
          name: formData.firstName,
          last_name: formData.lastName,
          // email: formData.email,
          phone: formData.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token.session.access_token}`,
          },
        }
      );

      // console.log("Personal Info success:", res.data);
      localStorage.setItem("profileData", JSON.stringify(res.data));
    }
  };

  const toggleEditing = () => {
    if (isEditing) {
      // User clicked "Save", log the entire form data
      updateProfile();
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="p-4 my-4 border-2 border-gray-200 w-full rounded-xl">
      <h2 className="text-lg font-bold p-2">Personal Information</h2>
      <div className="flex flex-row justify-between items-center">
        <div className="grid grid-cols-2 gap-4">
          <span>
            <h5 className="px-2 font-semibold">First Name</h5>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`text-md  placeholder-gray-500 p-2 rounded-md ${
                isEditing ? "bg-white shadow-lg border" : "bg-inherit"
              }`}
              placeholder="First Name"
              disabled={!isEditing}
            />
          </span>
          <span>
            <h5 className="px-2 font-semibold">Last Name</h5>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`text-md  placeholder-gray-500 p-2 rounded-md ${
                isEditing ? "bg-white shadow-lg border" : "bg-inherit"
              }`}
              placeholder="Last Name"
              disabled={!isEditing}
            />
          </span>
          <span>
            <h5 className="px-2 font-semibold">Email Address</h5>
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`text-md  placeholder-gray-500 p-2 rounded-md ${
                isEditing ? "bg-white shadow-lg border" : "bg-inherit"
              }`}
              placeholder="Email Address"
              disabled={!isEditing}
            />
          </span>
          <span>
            <h5 className="px-2 font-semibold">Phone Number</h5>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`text-md lining-nums placeholder-gray-500 p-2 rounded-md ${
                isEditing ? "bg-white shadow-lg border" : "bg-inherit"
              }`}
              placeholder="9876543210"
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
