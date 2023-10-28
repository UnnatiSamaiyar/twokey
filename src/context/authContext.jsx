// authContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Retrieve the token from the session storage during component mounting
    const sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      setToken(JSON.parse(sessionToken));
    }
  }, []);

  const setSessionToken = (newToken) => {
    setToken(newToken);
    // Store the token in session storage
    sessionStorage.setItem("token", JSON.stringify(newToken));
  };

  return (
    <AuthContext.Provider value={{ token, setSessionToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
