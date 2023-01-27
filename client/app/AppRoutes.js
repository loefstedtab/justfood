import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import Home from '../components/Home';
import { me } from './store';
import AboutUs from '../components/AboutUs';
import MyAccount from '../components/MyAccount';
import Pantry from '../components/Pantry';

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  //const isLoggedIn = true
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />
          <Route path="/login" element={<AuthForm name="login" displayName="Login" />}/>
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/pantry" element={<Pantry />} />
        </Routes>
    </div>
  );
};

export default AppRoutes;

