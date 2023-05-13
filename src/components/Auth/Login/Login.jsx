import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setLoading } from "../../../store/auth/auth-slice.js";
import { useNavigate } from "react-router-dom";
import Loader from "react-js-loader";
import swal from "sweetalert2";

function Register({ switchToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);
  // dispatch(setUser({}));
  const userInfo = useSelector((state) => state.userInfo);
  const loading = useSelector((state) => state.loading);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ username, password });
    if (!username || !password) {
      swal.fire({
        title: "Error!",
        text: "Username or Password cannot be empty!",
        icon: "error",
        confirmButtonText: "Ok",
      });
      dispatch(setLoading(false));
      return;
    }
    try {
      dispatch(setLoading(true));
      console.log(loading);
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: username,
            password,
          }),
        }
      );
      const { status, message, user } = await response.json();
      console.log(status, message, user);
      dispatch(setUser(user));
      dispatch(setLoading(false));
      if (status == "success") {
        swal.fire({
          title: "Success!",
          text: message,
          icon: "success",
          confirmButtonText: "Ok",
        });
        navigate("/user");
      } else {
        swal.fire({
          title: "Error!",
          text: message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } catch (err) {
      console.log(err);
      swal.fire({
        title: "Error!",
        text: "Please enter valid credentials!!",
        icon: "error",
        confirmButtonText: "Ok",
      });
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.authHeading}>Login</div>
        <div>
          <label className={styles.authLabel} htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            className={styles.authInput}
          />
          <label className={styles.authLabel} htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.authInput}
          />
          <button
            type="submit"
            className={styles.authButton}
            onClick={handleSubmit}
          >
            {loading ? (
              <Loader
                type="bubble-loop"
                bgColor={"#FFFFFF"}
                color={"#FFFFFF"}
                size={30}
              />
            ) : (
              "Log In"
            )}
          </button>
        </div>
        <div className={styles.message} onClick={switchToRegister}>
          Don't have an account?
        </div>
      </form>
    </div>
  );
}

export default Register;
