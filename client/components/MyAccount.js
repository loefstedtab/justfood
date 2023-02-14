import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, selectUser, editGoogleUser } from "../slices/userSlice";
import { MutatingDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const EditUser = () => {
  const { status, user } = useSelector(selectUser);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkedPassword =
    password && password === confirmPassword ? true : false;

  const updatedUser = {
    id: user.id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phone,
  };

  const updatedGoogleUser = {
    id: user.id,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phone,
  };

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPhone(user.phoneNumber);
  }, [user]);

  useEffect(() => {
    if(status === "editUser Updated"){
      toast.error('Dumbass', {
        onClose: navigate('/home')
      })
    }
  }, [status])

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (user.googleId) {
      dispatch(editGoogleUser(updatedGoogleUser)).then(navigate("/home"));
    } else {
      dispatch(editUser(updatedUser))
      //.then(navigate("/home"));
    }
  };

  const handlePasswordSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      editUser({
        id: user.id,
        password: password,
      })
    ).then(alert("CONGRATULATIONS"));
  };

  return (
    <div className="myProfile">
      <section className="myProfileHeading">
        <h3>Edit Your Information Below</h3>
      </section>
      <section className="myProfileForm">
        <form className="form" id="edit-user-form" onSubmit={handleSubmit}>
          {!user.googleId ? (
            <>
              <label htmlFor="email">Email:</label>
              <input
                name="email"
                value={email}
                placeholder={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          ) : null}

          <label htmlFor="firstName">First Name:</label>
          <input
            name="firstName"
            value={firstName}
            placeholder={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label htmlFor="lastName">Last Name:</label>
          <input
            name="lastName"
            value={lastName}
            placeholder={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label htmlFor="phone">Phone Number:</label>
          <input
            name="phone"
            value={phone}
            placeholder={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <br />

          {status === "idle" ? null : status === "Updated" ? (
            <div>Your information has been updated</div>
          ) : null}
          <button type="submit" disabled={status === "Loading"}>
            Click to submit
          </button>
        </form>

        <br />
          {!user.googleId ?
           <>
            <form className="form" onSubmit={handlePasswordSubmit}>
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            value={password}
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Re-Enter Password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={status === "Loading" || !checkedPassword}
          ></button>
        </form>
          </> : null}

      </section>
    </div>
  );
};

export default EditUser;
