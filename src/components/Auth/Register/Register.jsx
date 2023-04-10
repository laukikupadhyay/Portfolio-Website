import React, { useEffect, useState } from 'react';
import styles from './Register.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../../store/auth/auth-slice.js';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [password, setPassword] = useState('');
  const [interests, setInterests] = useState([]);
  const [lat , setLat] = useState(0);
  const [long , setLong] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const userInfo = useSelector((state) => state.auth.userInfo);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleInterestsChange = (e) => {
    const newInterests = Array.from(e.target.selectedOptions, (option) => option.value);
    setInterests(newInterests);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{

        console.log({ name, username, email, profilePic, password, interests });
        const locationObj = {
            "type":"Point",
            "coordinates":[long, lat]
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('userName', username);
        formData.append('email', email);
        formData.append('image', profilePic);
        formData.append('password', password);
        formData.append('interest', interests);
        formData.append('friends', []);
        formData.append('location', locationObj);
        
        const response = await fetch( process.env.REACT_APP_BACKEND_URL+'auth/register', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        console.log(data);
        dispatch(setUser(data.user));
        if(data.user){
            navigate('/user');
        }
    }
    catch(err){
        console.log(err)
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={handleNameChange} />

        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} />

        <label htmlFor="profile-pic">Profile Picture:</label>
        <input type="file" id="profile-pic" name="image" onChange={handleProfilePicChange} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />

        <label htmlFor="interests">Interests:</label>
        <select id="interests" name="interests" multiple onChange={handleInterestsChange}>
          <option value="Cricket">Cricket</option>
          <option value="Basketball">Basketball</option>
          <option value="Tennis">Tennis</option>
          <option value="Volleyball">Volleyball</option>
          <option value="Badminton">Badminton</option>
        </select>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Register;
