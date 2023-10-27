import React from "react";
import RecentFiles from "../components/RecentFiles";
import AccountFiles from "../components/AccountFiles";

const Account = () => {
  return (
    <div className="p-4">
      <RecentFiles />
      <AccountFiles />
    </div>
  );
};

export default Account;
