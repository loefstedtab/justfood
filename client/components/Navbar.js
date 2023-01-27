import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../app/store';
import GoogleButton from 'react-google-button';


const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <h1>Just Food!</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            <Link to="/home">Home</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <GoogleButton onClick={(() => window.open(`${process.env.CLIENT_URL}/auth/google`))} />
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
