import React, { createContext, useEffect, useState } from "react";
import { fetchUser, selectUser } from "../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

export const UserContext = createContext();

const Context = ({ children }) => {
  const [account, setAccount] = useState(() => ({
    loggedIn: null,
  }));

  const dispatch = useDispatch()

  const user = useSelector(selectUser)
  console.log("THIS IS MY USER IN MY REACT COMPONENT", user)

  useEffect(() => {
    dispatch(fetchUser()).then(setAccount(user));
  }, []);


  //   get the user
  return <UserContext.Provider value={account}>{children}</UserContext.Provider>;
};

export default Context;
