import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import { me } from "./store";
import AboutUs from "../components/AboutUs";
import MyAccount from "../components/MyAccount";
import Pantry from "../components/Pantry";
import Login from "../components/Login";
import CookingHistory from "../components/CookingHistory";
import Bookmarks from "../components/Bookmarks";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route to="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/pantry" element={<Pantry />} />
        <Route path="/cookinghistory" element={<CookingHistory />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
