import React, { createContext, useState, useContext, useEffect } from "react";

const DarkModeContext = createContext();
export default DarkModeContext;

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  // Load the dark mode preference from local storage on component mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => {
      const newDarkMode = !prevDarkMode;

      // Save the updated dark mode preference to local storage
      localStorage.setItem("darkMode", JSON.stringify(newDarkMode));

      return newDarkMode;
    });
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}
