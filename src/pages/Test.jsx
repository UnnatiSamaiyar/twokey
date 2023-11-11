import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { supabase } from "../helper/supabaseClient";

import ErrorPage from "../components/ErrorPage";

const Test = () => {
  const { token, location, error, getGeolocation } = useAuth();
  const [picture, setPicture] = useState(null);

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

  // const handleFinalUpload = async () => {
  //   try {
  //     for (const file of droppedFiles) {
  //       const { data, error } = await supabase.storage
  //         .from("TwoKey")
  //         .upload(file.name, file, {
  //           cacheControl: "3600",
  //           upsert: false,
  //         });

  //       if (error) {
  //         throw new Error("File upload failed");
  //       }
  //     }
  //     showSnackbar("Upload successful", "success");
  //   } catch (error) {
  //     console.error("Error occurred in file upload:", error);
  //     showSnackbar("Upload failed. Please try again.", "error");
  //   }
  // };

  const getLogs = async () => {
    try {
      const users = await axios.get(
        "https://twokeybackend.onrender.com/file/getLogs/access/d1823f2d-3acd-4b7f-8b4f-90a875811966?recs=10",
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

  const getProfilePic = async () => {
    try {
      const { data } = supabase.storage
        .from("avatar")
        .getPublicUrl("onlyforsave1@gmail.com");

      setPicture(data.publicUrl);

      console.log(data.publicUrl);
    } catch (error) {
      console.log("Error while getting ProfilePic.");
    }
  };
  if (!sessionStorage.getItem("token")) {
    return <ErrorPage error="You are not authorised" />;
  }
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

      <button
        className="py-2 px-4 bg-purple-400 text-white rounded-md"
        onClick={getProfilePic}
      >
        Get ProfilePic
      </button>

      <button
        className="py-2 px-4 bg-blue-400 text-white rounded-md"
        onClick={getLogs}
      >
        Get Logs
      </button>

      {picture && (
        <img
          src={picture}
          alt="ProfilePic"
          className="rounded-full w-48 h-48"
        />
      )}
    </div>
  );
};

export default Test;

// useEffect(() => {
//   const updateProfile = async() =>{
//     let token = JSON.parse(sessionStorage.getItem("token"));
//       if (token) {
//         const res = await axios.put(
//           "https://twokeybackend.onrender.com/users/updateProfile/",
//           {
//             id: token.user.id,
//             username: formData.username,
//             name: formData.firstName,
//             last_name: formData.lastName,
//             dept: "7075576d-bbbc-47f7-9b50-a272e93dc66f",
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token.session.access_token}`,
//             },
//           }
//         );

//         console.log("onboarding success:", res);

//         // console.log("Profile data:", res.data);
//         // localStorage.setItem("profileData", JSON.stringify(res.data));
//       }
//   }
// },[])
