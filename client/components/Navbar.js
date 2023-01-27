import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../app/store';


const Navbar = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <Link to="/home"><h1>Just Food!</h1></Link>

      <nav>
        {user.loggedIn ? (
          <div>
            <h3>Welcome, {user.firstName}!</h3>
            <Link to="/aboutus">About Us</Link>
            <Link to="/myaccount">My Account</Link>
            <Link to="/pantry">Pantry</Link>
            <form action="/auth/logout" method="post">
							<button className="logout" type="submit">Sign out</button>
						</form>
          </div>
        ) : (
          <div>
            <h3>Welcome, Guest!</h3>
            <Link to="/login">Login/Sign-up</Link>
            <Link to="/aboutus">About Us</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
