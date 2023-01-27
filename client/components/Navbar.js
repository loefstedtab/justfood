import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../app/store';

const Navbar = () => {
  // const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isLoggedIn = true

  const username = useSelector((state) => state.auth.me.username);
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
            <h3>Welcome, {username}!</h3>
            <Link to="/home">Home</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <h3>Welcome, Guest!</h3>
            <Link to="/login">Login/Sign-up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;