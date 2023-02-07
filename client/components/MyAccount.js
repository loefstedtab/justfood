import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../slices/jwtUserSlice";

const EditUser = () => {
  const { status, me } = useSelector((state) => state.auth);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState(me.firstName);
  const [lastName, setLastName] = useState(me.lastName);
  const [email, setEmail] = useState(me.email);
  const [phone, setPhone] = useState(me.phoneNumber);

  const dispatch = useDispatch();

  const checkedPassword =
    password && password === confirmPassword ? true : false;

  const updatedUser = {
    id: me.id,
    password: password,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phone,
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(editUser(updatedUser));
  };

  return (
    <div className="myProfile">
      <section className="myProfileHeading">
        <h3>Edit Your Information Below</h3>
      </section>
      <section className="myProfileForm">
        <form className="form" id="edit-user-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            value={email}
            placeholder={email}
            onChange={(e) => setEmail(e.target.value)}
          />

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
          <button
            type="submit"
            disabled={status === "Loading" || !checkedPassword}
          >
            Click to submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default EditUser;
