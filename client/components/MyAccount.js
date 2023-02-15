import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, selectUser, editGoogleUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EditForm } from "./EditForm";

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
        <h1>Profile Info:</h1>
      </section>
      <section className="profileForms">
        <form
          className="userInfoForm"
          id="edit-user-form"
          onSubmit={handleSubmit}
        >
          {!user.googleId ? (
            <>
              <EditForm value={email} setValue={setEmail} placeholder={email} type={"text"}/>
            </>
          ) : null}

          <EditForm value={firstName} setValue={setFirstName} placeholder={firstName} type={"text"}/>

          <EditForm value={lastName} setValue={setLastName} placeholder={lastName} type={"text"}/>

          <EditForm value={phone} setValue={setPhone} placeholder={phone} type={"text"}/>

          <br />

          <button type="submit" disabled={status === "Loading"}>
            Click to submit
          </button>
        </form>

        <br />

        {!user.googleId ? (
          <form className="passwordForm" onSubmit={handlePasswordSubmit}>
          <EditForm value={password} setValue={setPassword} placeholder={"Password"} type={"password"}/>

          <EditForm value={password} setValue={setPassword} placeholder={"Confirm Password"} type={"password"}/>

            <button
              type="submit"
              disabled={status === "Loading" || !checkedPassword}
            >
              Update Password
            </button>
            {password !== "" && confirmPassword !== "" && !checkedPassword ? 
              <p className="error">Passwords Do Not Match!</p>
             : null}
          </form>
        ) : null}
      </section>
    </div>
  );
};

export default EditUser;
