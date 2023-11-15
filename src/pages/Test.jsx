import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { supabase } from "../helper/supabaseClient";

import ErrorPage from "../components/ErrorPage";

const Test = () => {
  const { token, location, error, getGeolocation, listLocations } = useAuth();
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

  let departments = [
    { name: "Account", path: "/account" },
    { name: "Finance", path: "/finance" },
    { name: "Development", path: "/development" },
    { name: "Manufacturing", path: "/manufacturing" },
    { name: "Sales", path: "/sales" },
    { name: "Human Resources", path: "/humanresources" },
    { name: "Account", path: "/account" },
    { name: "Finance", path: "/finance" },
    { name: "Development", path: "/development" },
    { name: "Manufacturing", path: "/manufacturing" },
    { name: "Sales", path: "/sales" },
    { name: "Human Resources", path: "/humanresources" },
    { name: "Account", path: "/account" },
    { name: "Finance", path: "/finance" },
    { name: "Development", path: "/development" },
    { name: "Manufacturing", path: "/manufacturing" },
    { name: "Sales", path: "/sales" },
    { name: "Human Resources", path: "/humanresources" },
    { name: "Account", path: "/account" },
    { name: "Finance", path: "/finance" },
    { name: "Development", path: "/development" },
    { name: "Manufacturing", path: "/manufacturing" },
    { name: "Sales", path: "/sales" },
    { name: "Human Resources", path: "/humanresources" },
  ];

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

  const getCommonLogs = async () => {
    try {
      const users = await axios.get(
        "https://twokeybackend.onrender.com/file/getLogs/access",
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

  const getSharedFileInfo = async () => {
    try {
      const info = await axios.get(
        "https://twokeybackend.onrender.com/file/sharedFileInfo/2fa789e7-7443-4c7c-8297-53a932982481",
        {
          headers: {
            Authorization: `Bearer ${token.session.access_token}`,
          },
        }
      );
      console.log("getSharedFileInfo :", info);
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

  const createDep = async () => {
    try {
      const dep = await axios.post(
        "https://twokeybackend.onrender.com/dept/createDepts/",
        {
          name: "Account",
        },
        {
          headers: {
            Authorization: `Bearer ${token.session.access_token}`,
          },
        }
      );
      console.log("Dep :", dep);
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

  const getDepFiles = async () => {
    try {
      const files = await axios.get(
        "https://twokeybackend.onrender.com/file/files/Marketing/",

        {
          headers: {
            Authorization: `Bearer ${token.session.access_token}`,
          },
        }
      );
      console.log("files :", files);
    } catch (error) {
      console.log("Error while getting ProfilePic.", error);
    }
  };

  // const listLocations = async () => {
  //   try {
  //     const locations = await axios.get(
  //       "https://twokeybackend.onrender.com/file/file/listLocation/",

  //       {
  //         headers: {
  //           Authorization: `Bearer ${token.session.access_token}`,
  //         },
  //       }
  //     );

  //     // locations.data.features.map((items) =>
  //     //   console.log(
  //     //     "id:",
  //     //     items.id,
  //     //     "location:",
  //     //     items.geometry.coordinates[0],
  //     //     items.geometry.coordinates[1]
  //     //   )
  //     // );

  //     console.log("locations :", locations.data.features);
  //   } catch (error) {
  //     console.log("Error while listing location Coordinates.", error);
  //   }
  // };

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
      <button
        className="py-2 px-4 bg-orange-400 text-white rounded-md"
        onClick={getCommonLogs}
      >
        getCommonLogs
      </button>

      <button
        className="py-2 px-4 bg-pink-400 text-white rounded-md"
        onClick={createDep}
      >
        createDep
      </button>

      <button
        className="py-2 px-4 bg-green-400 text-white rounded-md"
        onClick={getDepFiles}
      >
        getDepFiles
      </button>

      <button
        className="py-2 px-4 bg-yellow-400 text-white rounded-md"
        onClick={listLocations}
      >
        listLocations
      </button>

      <button
        className="py-2 px-4 bg-purple-400 text-white rounded-md"
        onClick={getSharedFileInfo}
      >
        getSharedFileInfo
      </button>

      <div className="h-24 border overflow-y-scroll scrollbar-hide">
        {departments.map((dep, index) => (
          <p key={index}>{dep.name}</p>
        ))}
      </div>

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

// useEffect(() => {
//   let data = localStorage.getItem("filteredFiles");
//   const parsedData = JSON.parse(data);
//   const filteredByLocation = parsedData.filter((file) =>
//     file.dept.toLowerCase() === location.pathname.slice(1).toLowerCase()
//   );

//   console.log("filtered files:", filteredByLocation);
//   setFilteredData(filteredByLocation);
// }, [location.pathname]);

{
  /* <MenuItem disabled>
                  <span className="flex justify-between items-center w-full">
                    <span className="flex flex-row items-center gap-2">
                      <Skeleton
                        variant="circular"
                        height={35}
                        width={35}
                        sx={{ bgcolor: "grey.500" }}
                      />
                      <span>
                        <p className="text-sm font-semibold">
                          <Skeleton
                            width={100}
                            height={25}
                            sx={{ bgcolor: "grey.500" }}
                          />
                        </p>
                        <p className="text-xs font-light text-gray-500">
                          <Skeleton
                            width={150}
                            height={20}
                            sx={{ bgcolor: "grey.500" }}
                          />
                        </p>
                      </span>
                    </span>
                    <p className="text-sm font-semibold">
                      <Skeleton
                        width={60}
                        height={30}
                        sx={{ bgcolor: "grey.500" }}
                      />
                    </p>
                  </span>
                </MenuItem> */
}
