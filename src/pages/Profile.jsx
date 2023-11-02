import React from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";

const Profile = () => {
  const { token, location, error, getGeolocation } = useAuth();

  // console.log("position in profile", location);
  // console.log("watchError in profile", error);

  // const getFileUrl = async () => {
  //   const data = {
  //     latitude: 18.6161,
  //     longitude: 73.7286,
  //   };
  //   try {
  //     console.log("token :", token.session.access_token);
  //     const fileUrl = await axios.post(
  //       "https://twokeybackend.onrender.com/file/getPresigned/cb06a3b6-9240-4912-9d7e-80d44e2d5dec/",
  //       data,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token.session.access_token}`,
  //         },
  //       }
  //     );
  //     console.log("fileUrl :", fileUrl);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const listUsers = async () => {
    try {
      const users = await axios.get(
        "https://twokeybackend.onrender.com/users/list_users/",
        {
          headers: {
            Authorization: `Bearer ${token.session.access_token}`,
          },
        }
      );
      console.log("users :", users);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p>Profile</p>

      <button
        className="py-2 px-4 bg-blue-500 text-white rounded-md"
        onClick={getGeolocation}
      >
        Get location
      </button>

      {location && (
        <p>
          Location: latitude: {location.latitude} , longitude:{" "}
          {location.longitude}
        </p>
      )}

      {/* <button
        className="py-2 px-4 bg-green-500 text-white rounded-md"
        onClick={getFileUrl}
      >
        Get fileUrl
      </button> */}

      <button
        className="py-2 px-4 bg-red-400 text-white rounded-md"
        onClick={listUsers}
      >
        Get Users
      </button>
    </div>
  );
};

export default Profile;
