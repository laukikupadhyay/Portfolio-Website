import React, { useEffect, useState } from 'react';
import styles from '../Register/Register.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../../store/auth/auth-slice.js';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ username, password });
    try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: username,
                password,
            }),
        });
        const data = await response.json();
        console.log(data);
        dispatch(setUser(data.user));
        if(data.user){
          navigate('/user')
        }
    } catch (err) {
        console.log(err);
    }
};

  return (
    <div className={styles.container}>
      <form>
    
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />

        <button type="submit" onClick={handleSubmit}>Log In</button>
      </form>
    </div>
  );
}

export default Register;
