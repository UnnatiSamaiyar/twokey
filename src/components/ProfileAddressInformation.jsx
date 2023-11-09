import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileAddressInformation = ({ profileData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [addressFormData, setAddressFormData] = useState({
    country: profileData?.country || "",
    state: profileData?.state || "",
    city: profileData?.city || "",
    postal_code: profileData?.postal_code || "",
  });

  useEffect(() => {
    setAddressFormData({
      country: profileData?.country || "",
      state: profileData?.state || "",
      city: profileData?.city || "",
      postal_code: profileData?.postal_code || "",
    });
  }, [profileData]);

  const updateProfile = async () => {
    let token = JSON.parse(sessionStorage.getItem("token"));
    if (token) {
      const res = await axios.put(
        "https://twokeybackend.onrender.com/users/updateProfile/",
        {
          id: token.user.id,
          country: addressFormData.country,
          state: addressFormData.state,
          city: addressFormData.city,
          postal_code: addressFormData.postal_code,
        },
        {
          headers: {
            Authorization: `Bearer ${token.session.access_token}`,
          },
        }
      );

      // console.log("Personal Address Info success:", res);
      localStorage.setItem("profileData", JSON.stringify(res.data));
    }
  };

  const toggleEditing = () => {
    if (isEditing) {
      // User clicked "Save", log the entire address form data
      // console.log("Address Form Data:", addressFormData);
      updateProfile();
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressFormData({
      ...addressFormData,
      [name]: value,
    });
  };

  return (
    <div className="p-4 my-4 border-2 border-gray-200 w-full rounded-xl">
      <h2 className="text-lg font-bold p-2">Address</h2>
      <div className="flex flex-row justify-between items-center">
        <div className="grid grid-cols-2 gap-4">
          <span>
            <h5 className="px-2 font-semibold">Country</h5>
            <input
              name="country"
              value={addressFormData.country}
              onChange={handleInputChange}
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
              name="state"
              value={addressFormData.state}
              onChange={handleInputChange}
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
              name="city"
              value={addressFormData.city}
              onChange={handleInputChange}
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
              name="postal_code"
              value={addressFormData.postal_code}
              onChange={handleInputChange}
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
