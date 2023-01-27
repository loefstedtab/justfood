import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
//import { addUserAsync } from "../slices/allUsersSlice";

const AddUserForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (evt) => {
        evt.preventDefault()
        let addUser = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email,
            address: address,
            phone: phone
        }
        dispatch(addUserAsync(addUser))
        navigate('/')
      }

    return(
        <div>
                <form id="add-user-form" onSubmit={handleSubmit}>
                <h3>Create Account: </h3>

                    <label htmlFor="username">User Name:</label>
                    <input
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                    name="password"
                    value={password}
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

                    <label htmlFor="email">Email:</label>
                    <input
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="address">Home Address:</label>
                    <input
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
    )
}

export default AddUserForm