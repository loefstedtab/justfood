import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import Home from '../components/Home';
import { me } from './store';
import AboutUs from '../components/AboutUs';
import MyAccount from '../components/MyAccount';
import Login from '../components/Login';
import AllMeals from '../components/allRecipes';
import MealDetail from '../components/recipe';
import CookingHistory from "../components/CookingHistory";
import Bookmarks from "../components/Bookmarks";
import EditUser from '../components/MyAccount';

const AppRoutes = () => {
  return (
    <div>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/myaccount" element={<EditUser />} />
          <Route path="/cookinghistory" element={<CookingHistory />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/allrecipes" element={<AllMeals />} />
          <Route path="/recipe" element={<MealDetail />} />
        </Routes>
    </div>
  );
};

export default AppRoutes;

