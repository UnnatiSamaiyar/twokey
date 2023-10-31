import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isFileViewerOpen, setIsFileViewerOpen] = useState(false);
  const [screenshotDetected, setScreenshotDetected] = useState(false);

  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const [position, setPosition] = useState(null);
  const [watchError, setWatchError] = useState(null);

  useEffect(() => {
    // Prevent right-click
    const preventRightClick = (e) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", preventRightClick);

    // Detect keypress
    const handleKeyPress = (e) => {
      console.log("Key pressed:", e.key);
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
        if (forbiddenKeys.includes(e.key)) {
          e.preventDefault();

          console.log(
            token ? token.user.user_metadata.full_name : "Unknown User",
            "took the ScreenShot."
          );

          setScreenshotDetected(true);

          // Remove the blur class after 2 seconds
          setTimeout(() => {
            setScreenshotDetected(false);
          }, 2000);
        }
      } catch (error) {
        console.error(
          "An error occurred while preventing Print Screen:",
          error
        );
      }
    };

    document.addEventListener("keydown", preventPrintScreen);

    return () => {
      document.removeEventListener("keydown", preventPrintScreen);
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
      setWatchError("Geolocation is not supported in your browser.");
    }

    // Clean up the watch when the component unmounts
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }

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
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
