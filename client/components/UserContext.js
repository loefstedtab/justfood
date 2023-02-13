import React, { createContext, useEffect, useState } from "react";
import {
  fetchGoogleUser,
  getMe,
  selectUser,
} from "../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

export const UserContext = createContext();

const Context = ({ children }) => {
  const [account, setAccount] = useState(() => ({
    loggedIn: null,
  }));

  const dispatch = useDispatch();

  const { user } = useSelector(selectUser);
  const recipe = useSelector((state) => state.recipe)

  useEffect(() => {
    dispatch(fetchGoogleUser());
    dispatch(getMe()).then(setAccount(user));
  }, [recipe.status === "Recipe Loaded!"]);

  //   get the user
  return (
    <UserContext.Provider value={account}>{children}</UserContext.Provider>
  );
};

export default Context;
