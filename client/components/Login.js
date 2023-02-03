import React from "react";
import GoogleButton from "react-google-button";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";
import AddUserForm from "./AddUserForm";

const Login = () => {
  window.process = {
    env: {
      NODE_ENV: "development",
      GOOGLE_URL: "http://localhost:8080/auth/google",
    },
  };
  const handleLogin = () => {
    const redirectToGoogle = process.env.GOOGLE_URL;
    window.open(redirectToGoogle, "_self");
  };

  return (
    <div className="LoginContainer">

      <div>
        <AuthForm />
        <GoogleButton onClick={handleLogin} />
      </div>

      <div>
        <AddUserForm />
      </div>

    </div>
  );
};

export default Login;




