import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ token }) => {
  let navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate("/");
  }

  console.log(token);

  return (
    <div className="text-center">
      <h3>Welcome back, {token.user.user_metadata.full_name}</h3>
      <h3>Org:, {token.user.user_metadata.organization}</h3>
      <button
        onClick={handleLogout}
        className="py-2 px-4 bg-blue-600 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
