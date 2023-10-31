import React from "react";
import { useAuth } from "../context/authContext";

const Profile = () => {
  const { location, error, getGeolocation } = useAuth();

  console.log("position in profile", location);
  console.log("watchError in profile", error);
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
    </div>
  );
};

export default Profile;
