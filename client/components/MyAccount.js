import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, selectUser } from "../slices/userSlice";
import { MutatingDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const { status, user } = useSelector(selectUser);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const checkedPassword =
    password && password === confirmPassword ? true : false;

  const updatedUser = {
    id: user.id,
    password: password,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phone,
  };

  useEffect(() =>{
    setFirstName(user.firstName)
    setLastName(user.lastName)
    setEmail(user.email)
    setPhone(user.phoneNumber)
  }, [user])

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(editUser(updatedUser)).then(navigate("/home"));
  };

  let content

  if (status === "User Loading"){
    content = <MutatingDots />
  } else if (status === "Succeeded" || status === "Updated"){
    content = <div className="myProfile">
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
  } else {content = null}

  return (<div>{content}</div>)
};

export default EditUser;
