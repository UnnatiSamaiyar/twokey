import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isFileViewerOpen, setIsFileViewerOpen] = useState(false);
  const [screenshotDetected, setScreenshotDetected] = useState(false);
  const [users, setUsers] = useState([]);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Prevent right-click
    const preventRightClick = (e) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", preventRightClick);

    // Detect keypress
    const handleKeyPress = (e) => {
      console.log("Key pressed:", e.key);

      // check the data type of the clipboard item
      // navigator.clipboard.read().then((data) => {
      //   const types = data[0].types;
      //   let hasImageType = false;

      //   for (const type of types) {
      //     if (type.startsWith("image")) {
      //       hasImageType = true;
      //       break;
      //     }
      //   }

      //   if (hasImageType) {
      //     console.log("ScreenShot captured.", types);
      //   } else {
      //     console.log("Clipboard data does not contain an image type.");
      //   }
      // });
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("contextmenu", preventRightClick);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const preventPrintScreen = (e) => {
      try {
        const forbiddenKeys = [
          "PrintScreen",
          "Snapshot",
          "PrtSc",
          "Meta",
          "Escape",
          "PrtSc",
          "Control",
          "Alt",
          "Insert",
        ];

        // if (e.keyCode === 114) {
        //   //keyCode for Print Screen key
        //   e.preventDefault();
        // }

        if (forbiddenKeys.includes(e.key)) {
          e.preventDefault();

          console.log(
            token ? token.user.user_metadata.full_name : "Unknown User",
            "took the ScreenShot."
          );

          setScreenshotDetected(true);

          // Remove the blur class after 3 seconds
          setTimeout(() => {
            setScreenshotDetected(false);
          }, 3000);
        }
      } catch (error) {
        console.error(
          "An error occurred while preventing Print Screen:",
          error
        );
      }
    };

    document.addEventListener("keypress", preventPrintScreen);

    return () => {
      document.removeEventListener("keypress", preventPrintScreen);
    };
  }, [token]);

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      setToken(JSON.parse(sessionToken));
    }
  }, []);

  const setSessionToken = (newToken) => {
    setToken(newToken);
    sessionStorage.setItem("token", JSON.stringify(newToken));
  };

  const openFileViewer = () => {
    setIsFileViewerOpen(true);
  };

  const closeFileViewer = () => {
    setIsFileViewerOpen(false);
  };

  function getGeolocation() {
    let watchId;

    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { coords } = position;
          setLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported in your browser.");
    }

    // Clean up the watch when the component unmounts
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }

  const listUsers = async () => {
    try {
      const userList = await axios.get(
        "https://twokeybackend.onrender.com/users/list_users/",
        {
          headers: {
            Authorization: `Bearer ${token.session.access_token}`,
          },
        }
      );
      // console.log("users :", userList.data);
      setUsers(userList.data);
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    isFileViewerOpen,
    openFileViewer,
    closeFileViewer,
    token,
    setSessionToken,
    screenshotDetected,
    setScreenshotDetected,
    location,
    error,
    getGeolocation,
    listUsers,
    users,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
