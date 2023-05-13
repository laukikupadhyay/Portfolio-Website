import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setUser } from "../../store/auth/auth-slice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "react-js-loader";
import styles from "./Login.module.css";

const Signup = ({ switchToLogIn }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [password, setPassword] = useState("");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const userInfo = useSelector((state) => state.auth.userInfo);
  const loading = useSelector((state) => state.loading);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    if (!name || !username || !email || !profilePic || !password) {
      Swal.fire({
        title: "Error!",
        text: "Please enter all details to register",
        icon: "error",
        confirmButtonText: "Ok",
      });
      dispatch(setLoading(false));
    }
    try {
      console.log({ name, username, email, profilePic, password });
      dispatch(setLoading(true));
      const locationObj = {
        type: "Point",
        coordinates: [long, lat],
      };
      const formData = new FormData();
      formData.append("name", name);
      formData.append("userName", username);
      formData.append("email", email);
      formData.append("image", profilePic);
      formData.append("password", password);
      formData.append("interest", []);
      formData.append("friends", []);
      formData.append("location", locationObj);

      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "auth/register",
        {
          method: "POST",
          body: formData,
        }
      );
      const { status, user, message } = await response.json();
      dispatch(setUser(user));
      dispatch(setLoading(false));
      if (status == "success") {
        Swal.fire({
          title: "Success!",
          text: message,
          icon: "success",
          confirmButtonText: "Ok",
        });
        if (user) {
          navigate("/user");
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.screen_register}>
        <div className={styles.screen__content}>
          <form onSubmit={handleSubmit} className={styles.login}>
            <div className={styles.login__field}>
              <i className={`${styles.login__icon} fas fa-user`}></i>
              <input
                type="text"
                className={styles.login__input}
                placeholder="Name"
                onChange={handleNameChange}
                value={name}
                name="name"
                id="name"
              />
            </div>
            <div className={styles.login__field}>
              <i className={`${styles.login__icon} fas fa-user-cog`}></i>
              <input
                type="text"
                className={styles.login__input}
                placeholder="Username"
                onChange={handleUsernameChange}
                value={username}
                name="username"
                id="username"
              />
            </div>
            <div className={styles.login__field}>
              <i className={`${styles.login__icon} fas fa-envelope`}></i>
              <input
                type="email"
                className={styles.login__input}
                placeholder="Email"
                onChange={handleEmailChange}
                value={email}
                name="email"
                id="email"
              />
            </div>
            <div className={styles.login__field}>
              <i className={`${styles.login__icon} fas fa-lock`}></i>
              <input
                type="password"
                className={styles.login__input}
                placeholder="Password"
                onChange={handlePasswordChange}
                value={password}
                name="password"
                id="password"
              />
            </div>
            <div className={styles.login__field}>
              <i className={`${styles.login__icon} fas fa-camera-retro`}></i>
              <input
                type="file"
                id="profile-pic"
                name="image"
                onChange={handleProfilePicChange}
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
                  <span className={styles.button__text}>Signup Now</span>
                  <i
                    className={`${styles.button__icon} fas fa-chevron-right`}
                  ></i>
                </>
              )}
            </button>
          </form>
          <div className={styles.switch_text_register}>
            <h3 onClick={switchToLogIn}>Already have an account?</h3>
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

export default Signup;
