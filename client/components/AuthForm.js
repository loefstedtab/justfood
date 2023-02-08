import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { authenticate } from "../slices/userSlice";
import AddUser from "./AddUser";

const AuthForm = () => {
  const { error, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ email, password })).then(navigate('/'));
  };



  return (
    <div>
      <form className="LoginForm" onSubmit={handleSubmit}>
        <h3>Login to Account: </h3>

        <label htmlFor="email">
          Email
        </label>
        <input name="email" type="text" id="email" />

        <label htmlFor="password">
          Password
        </label>
        <input name="password" type="password" id="password" />

        <button type="submit">Login!</button>

        {error && <div> {error} </div>}
      </form>
    </div>
  );
};

export default AuthForm;
