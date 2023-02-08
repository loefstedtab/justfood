import React, { createContext, useEffect, useState } from "react";
import { authenticate, fetchGoogleUser, getMe, selectUser } from "../slices/googleUserSlice";
import { useSelector, useDispatch } from "react-redux";

export const UserContext = createContext();

const Context = ({ children }) => {
  const [account, setAccount] = useState(() => ({
    loggedIn: null,
  }));

  const dispatch = useDispatch();

  const {user, status} = useSelector(selectUser);
  console.log("THis user comes from context", user)

  useEffect(() => {
      dispatch(fetchGoogleUser())
      dispatch(getMe()).then(setAccount(user))
  }, []);

  //   get the user
  return (
    <UserContext.Provider value={account}>{children}</UserContext.Provider>
  );
};

export default Context;
