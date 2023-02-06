import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUser, getMe } from "../slices/jwtUserSlice";

const EditUser = () => {
  const { status, me } = useSelector((state) => state.auth);

  //const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState(me.firstName);
  const [lastName, setLastName] = useState(me.lastName);
  const [email, setEmail] = useState(me.email);
  const [phone, setPhone] = useState(me.phone);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updatedUser = {
    id: me.id,
    password: me.password,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    //dispatch(getMe)
    console.log('UPDATED USER FROM HANDLESUBMIT', updatedUser)
    dispatch(editUser(updatedUser));
  };

  useEffect(() => {
    if (status === "Succeeded") {
      navigate("/MyAccount");
    }
  }, [status]);

  // const updateUser = (event) => {
	// 	const keyToUpdate = event.target.name;
	// 	setUser((currentValues) => ({
	// 		...currentValues,
	// 		[keyToUpdate]: event.target.value,
	// 	}));
	// };

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

          {/* <label htmlFor="password">Password:</label>
          <input
            name="password"
            value={password}
            placeholder='password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          /> */}

          <label htmlFor="firstName">First Name:</label>
          <input
            name="firstName"
            value={firstName}
            placeholder={[me.firstName]}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label htmlFor="lastName">Last Name:</label>
          <input
            name="lastName"
            value={lastName}
            placeholder={[me.lastName]}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label htmlFor="phone">Phone Number:</label>
          <input
            name="phone"
            value={[me.phone]}
            placeholder={[me.phone]}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button type="submit">Create Account</button>
        </form>
      </section>
    </div>
  );
};

export default EditUser;
