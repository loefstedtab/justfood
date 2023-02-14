import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";

const Account = () => {
  const user = useSelector(selectUser);

  
  return (
    <div>
      "This is the user Account"
      {user.firstName}
    </div>
  );
};

export default Account;
