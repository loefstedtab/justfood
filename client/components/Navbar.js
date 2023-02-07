import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const googleUser = useSelector((state) => state.user);
  const jwtUser = useSelector((state) => state.auth.me);
  return (
    <div>
      <Link to="/home">
        <h1>Just Food!</h1>
      </Link>

      <nav>
        {googleUser.loggedIn || jwtUser ? (
          <div>
            <h3>Welcome, {googleUser.firstName || jwtUser.firstName}!</h3>
            <Link to="/aboutus">About Us</Link>
            <Link to="/pantry">Pantry</Link>
            <Link to="/cookinghistory">Cooking History</Link>
            <Link to="/bookmarks">Bookmarks</Link>
            <Link to="/myaccount">My Account</Link>
            <form action="/auth/logout" method="post">
              <button className="logout" type="submit">
                Sign out
              </button>
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
