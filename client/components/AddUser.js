import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../slices/googleUserSlice";

const AddUser = () => {
  const { status, error } = useSelector((state) => state);

  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let newUser = {
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phone,
    };
    dispatch(createUser(newUser)).then(navigate("/home"));
  };

  return (
    <div>
      <form className="CreateUserForm" onSubmit={handleSubmit}>
        <h3>Create Account: </h3>

        <label htmlFor="email">Email:</label>
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          name="password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="firstName">First Name:</label>
        <input
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="phone">Phone Number:</label>
        <input
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default AddUser;
