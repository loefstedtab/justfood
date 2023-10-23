import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../slices/userSlice";
import { ButtonGroup, Button, Avatar } from "@mui/material";

const Navbar = () => {
  const { user } = useSelector(selectUser);
  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div>
      {user && user.loggedIn ? (
        <div>
          <Link to="/home">
            <h1 className="WebsiteTitle">Just Food!</h1>{" "}
          </Link>
          <div className="NavbarLinks">
            <ButtonGroup variant="text" aria-label="text button group">
              <Button> <Link to="/aboutus">About Us</Link> </Button>
              <Button> <Link to="/cookinghistory">Cooking History</Link> </Button>
              <Button> <Link to="/bookmarks">Bookmarks</Link> </Button>
              <Button> <Link to="/myaccount">My Account</Link> </Button>
            </ButtonGroup>
          </div>
          <div>
            <h3 className="WelcomeElement">
              <Avatar>{user.firstName[0]}{user.lastName[0]}</Avatar>
            </h3>
            <form className="logoutButton" action="/auth/logout" method="post">
              <button onClick={() => logout()} className="logout" type="submit">
                Sign out
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <Link to="/home">
            <h1 className="WebsiteTitle">Just Food!</h1>{" "}
          </Link>
          <h3 className="WelcomeElement">Welcome, Guest!</h3>
          <div className="NavbarLinks">
            <ButtonGroup variant="text" aria-label="text button group">
              <Button> <Link to="/login">Login/Sign-up</Link> </Button>
              <Button> <Link to="/aboutus">About Us</Link></Button>
            </ButtonGroup>
          </div>
        </div>
      )}
      <hr />
    </div>
  );
};
export default Navbar;
