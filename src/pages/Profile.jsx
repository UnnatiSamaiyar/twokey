import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../helper/supabaseClient";
import Paper from "@mui/material/Paper";
import ProfilePersonalInfo from "../components/ProfilePersonalInfo";
import ProfileWorkInformation from "../components/ProfileWorkInformation";
import ProfileAddressInformation from "../components/ProfileAddressInformation";
import ProfilePicDummy from "../assets/profilePicDummy.jpg";

import ErrorPage from "../components/ErrorPage";

const Profile = () => {
  const [picture, setPicture] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [profileData, setProfileData] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    let data = localStorage.getItem("profileData");
    setProfileData(JSON.parse(data));
  }, []);

  // useEffect(() => {
  //   let token = JSON.parse(sessionStorage.getItem("token"));

  //   const getProfilePic = async () => {
  //     try {
  //       const { data } = supabase.storage
  //         .from("avatar")
  //         .getPublicUrl(token.user.email);

  //       setPicture(data.publicUrl);
  //     } catch (error) {
  //       console.log("Error while getting ProfilePic.");
  //     }
  //   };

  //   getProfilePic();
  // }, []);

  const toggleEditing = () => {
    if (isEditing) {
      // If in editing mode, upload the selected picture
      handleProfilePicUpdate();
    }
    setIsEditing(!isEditing);
  };

  const handleImageInputChange = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedPicture(file);
    }
  };

  const handleProfilePicUpdate = async () => {
    try {
      let token = JSON.parse(sessionStorage.getItem("token"));
      const { data, error } = await supabase.storage
        .from("avatar")
        .upload(token.user.email, selectedPicture, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.error("Error occurred in file upload:", error);
      } else {
        setPicture(data.publicURL);
        console.log("File uploaded successfully:", data);
      }
    } catch (error) {
      console.error(
        "An error occurred while uploading the profile picture:",
        error
      );
    }
  };
  if (!sessionStorage.getItem("token")) {
    return <ErrorPage error="You are not authorised" />;
  }

  return (
    <div className="p-4 w-full">
      <Paper
        elevation={1}
        className="p-4 rounded-xl"
        style={{ backgroundColor: "#F7F8FA" }}
      >
        <div className="p-4 border-2 border-gray-200 w-full rounded-xl flex flex-row justify-between items-center">
          <div className="flex flex-row items-center space-x-4">
            {profileData && (
              <div
                className="relative"
                onClick={isEditing ? handleImageInputChange : null}
              >
                <img
                  src={
                    profileData.profile_pic
                      ? profileData.profile_pic
                      : ProfilePicDummy
                  }
                  alt="ProfilePic"
                  className="rounded-full w-24 h-24"
                />
                {isEditing && (
                  <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full w-6 h-6 flex justify-center items-center text-lg">
                    +
                  </button>
                )}
              </div>
            )}
            <div className="flex flex-col leading-9">
              <h3 className="text-lg font-semibold">
                {profileData.username ? `#${profileData.username}` : "UserName"}
              </h3>
              <h5 className="text-md font-semibold text-gray-700">
                {profileData.role_priv ? profileData.role_priv : "Position"}
              </h5>
              <p className="text-sm text-gray-500">
                {profileData.country ? profileData.country : "Country"}
              </p>
              {/* <button onClick={getProfileData}>getProfileData</button> */}
            </div>
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
        <ProfilePersonalInfo profileData={profileData} />
        <ProfileWorkInformation profileData={profileData} />
        <ProfileAddressInformation profileData={profileData} />

        {/* Hidden input for image upload */}
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageUpload}
        />
      </Paper>
    </div>
  );
};

export default Profile;
