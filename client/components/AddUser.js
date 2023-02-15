import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser, selectUser } from "../slices/userSlice";
import { toast } from "react-toastify";

const AddUser = () => {
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, status } = useSelector(selectUser);

  useEffect(() => {
    status === "createUser Failed"
      ? toast.error(error, { onChange: navigate("/login") })
      : status === "createUser Succeeded"
      ? toast.success("Welcome", { onChange: navigate("/home") })
      : null;
  }, [status]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let newUser = {
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phone,
    };
    dispatch(createUser(newUser));
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
