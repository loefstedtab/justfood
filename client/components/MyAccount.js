import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, selectUser, editGoogleUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditUser = () => {
  const { status, user } = useSelector(selectUser);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();

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
    if (user.phoneNumber) {
      setPhone(user.phoneNumber);
    }
  }, [user]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (user.googleId) {
      await toast.promise(dispatch(editGoogleUser(updatedGoogleUser)), {
        pending: "Updating User",
        success: "User Info Updated!",
        error: "User Info Not Updated",
      });
    } else {
      await toast.promise(dispatch(editUser(updatedUser)), {
        pending: "Updating User",
        success: "User Info Updated!",
        error: "User Info Not Updated",
      });
    }
  };

  const handlePasswordSubmit = async (evt) => {
    evt.preventDefault();
    let updatedPassword = {
      id: user.id,
      password: password,
    };
    await toast
      .promise(dispatch(editUser(updatedPassword)), {
        pending: "Updating Password!",
        success: "Password Updated!",
        error: "User Info Not Updated",
      })
      .then(setPassword(""), setConfirmPassword(""));
  };

  return (
    <div className="myProfile">
      <section className="myProfileHeading">
        <h3>Edit Your Information Below</h3>
      </section>
      <section className="profileForms">
        <form
          className="userInfoForm"
          id="edit-user-form"
          onSubmit={handleSubmit}
        >
          {!user.googleId ? (
            <>
              <label className="formLabel" htmlFor="email">
                Email:
              </label>
              <input
                className="formInput"
                id="Email"
                name="email"
                // value={email}
                // placeholder={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          ) : null}

          <label className="formLabel" htmlFor="firstName">
            First Name:
          </label>
          <input
            className="formInput"
            name="firstName"
            // value={firstName}
            // placeholder={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            className="formInput"
            name="lastName"
            // value={lastName}
            // placeholder={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label className="formLabel" htmlFor="lastName">
            Last Name:
          </label>

          <label className="formLabel" htmlFor="phone">
            Phone Number:
          </label>
          <input
            className="formInput"
            name="phone"
            // value={phone}
            // placeholder={user.phoneNumber ? phone : "Phone Number"}
            onChange={(e) => setPhone(e.target.value)}
          />

          <br />

          <button type="submit" disabled={status === "Loading"}>
            Click to submit
          </button>
        </form>

        <br />
        {!user.googleId ? (
          <form className="passwordForm" onSubmit={handlePasswordSubmit}>
            <label className="formLabel" htmlFor="password">
              Password:
            </label>
            <input
              className="formInput"
              name="password"
              value={password}
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="formLabel" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input
              className="formInput"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Re-Enter Password"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="submit"
              disabled={status === "Loading" || !checkedPassword}
            >
              Update Password
            </button>
            {password !== "" && confirmPassword !== "" && !checkedPassword ? (
              <div>Passwords Do Not Match!</div>
            ) : null}
          </form>
        ) : null}
      </section>
    </div>
  );
};

export default EditUser;
