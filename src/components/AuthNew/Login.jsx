import React, { useEffect, useState } from "react";
import { setUser, setLoading } from "../../store/auth/auth-slice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import Loader from "react-js-loader";
import swal from "sweetalert2";

const Login = ({ switchToRegister }) => {
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
      <div className={styles.screen}>
        <div className={styles.screen__content}>
          <form onSubmit={handleSubmit} className={styles.login}>
            <div className={styles.login__field}>
              <i className={`${styles.login__icon} fas fa-user`}></i>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                className={styles.login__input}
                placeholder="User name"
              />
            </div>
            <div className={styles.login__field}>
              <i className={`${styles.login__icon} fas fa-lock`}></i>
              <input
                id="password"
                value={password}
                onChange={handlePasswordChange}
                type="password"
                className={styles.login__input}
                placeholder="Password"
              />
            </div>
            <button type="submit" className={styles.login__submit}>
              {loading ? (
                <Loader
                  type="bubble-loop"
                  bgColor={"#FFFFFF"}
                  color={"#FFFFFF"}
                  size={30}
                />
              ) : (
                <>
                  <span className={styles.button__text}>Login</span>
                  <i
                    className={`${styles.button__icon} fas fa-chevron-right`}
                  ></i>
                </>
              )}
            </button>
          </form>
          <div className={styles.switch_text}>
            <h3 onClick={switchToRegister}>Don't have an account?</h3>
          </div>
        </div>
        <div className={styles.screen__background}>
          <span
            className={`${styles.screen__background__shape} ${styles.screen__background__shape4}`}
          ></span>
          <span
            className={`${styles.screen__background__shape} ${styles.screen__background__shape3}`}
          ></span>
          <span
            className={`${styles.screen__background__shape} ${styles.screen__background__shape2}`}
          ></span>
          <span
            className={`${styles.screen__background__shape} ${styles.screen__background__shape1}`}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
