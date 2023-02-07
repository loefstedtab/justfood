import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../slices/googleUserSlice";
const Navbar = () => {
  const {user} = useSelector(selectUser)
  
  return (
    <div>
        {user && user.loggedIn ? (
          <div>
            <Link to="/home"><h1 className="WebsiteTitle">Just Food!</h1> </Link>
            <div className='NavbarLinks'>
              <Link to="/aboutus">About Us</Link>
              <Link to="/cookinghistory">Cooking History</Link>
              <Link to="/bookmarks">Bookmarks</Link>
              <Link to="/myaccount">My Account</Link>
            </div>
            <div>
              <h3 className="WelcomeElement">Welcome, {user.firstName}!</h3>
              <form className='logoutButton' action="/auth/logout" method="post">
                <button className="logout" type="submit">
                  Sign out
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <Link to="/home"><h1 className="WebsiteTitle">Just Food!</h1> </Link>
            <h3 className="WelcomeElement">Welcome, Guest!</h3>
            <div className='NavbarLinks'>
              <Link to="/login">Login/Sign-up</Link>
              <Link to="/aboutus">About Us</Link>
            </div>
          </div>
        )}
      <hr />
    </div>
  );
};
export default Navbar;
