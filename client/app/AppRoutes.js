import React, { useEffect, useState } from "react";
import { useSelector} from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import Home from "../components/Home";
import { me } from "./store";
import Login from "../components/Login";
import Account from "../components/Account";

const AppRoutes = () => {
  const user = useSelector((state) => state.user)


  return (
    <div>
      {user.loggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/user/account' element={<Account />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
       <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />

      </Routes>
      )}

    </div>
  );
};

export default AppRoutes;
