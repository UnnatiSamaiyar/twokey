import React from "react";

const Account = ({ token }) => {
  return (
    <div>
      account<h3>Welcome back, {token.user.user_metadata.full_name}</h3>
    </div>
  );
};

export default Account;
