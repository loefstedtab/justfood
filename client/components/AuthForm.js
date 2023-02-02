import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { authenticate } from "../app/store";
import AddUserForm from "./AddUserForm";

const AuthForm = () => {
  const { error, status } = useSelector((state) => state.auth);
  console.log("THIS IS THE AUTH STATUS", status)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
   // const formName = evt.target.name;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ email, password }));
  };

  useEffect(() => {
    if (status === "Succeeded"){
      navigate('/home')
    }
  },[status])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" id="email" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" id="password" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
        {error && <div> {error} </div>}
      </form>
      {/* <div>
        <AddUserForm />
      </div> */}
    </div>
  );
};

export default AuthForm;
