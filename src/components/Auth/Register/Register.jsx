import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setUser } from "../../../store/auth/auth-slice.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "react-js-loader";

function Register({ switchToLogIn }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(localStorage.getItem('sportyphy_19967_email'));
  const [profilePic, setProfilePic] = useState(null);
  const [password, setPassword] = useState("");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    (setLoading(true));
    console.log(profilePic)
    if (name=="" || username=="" || email=="" || profilePic==undefined || password=="") {
      Swal.fire({
        title: "Error!",
        text: "Please enter all details to register",
        icon: "error",
        confirmButtonText: "Ok",
      });
        setLoading(false);
    }
    try {
      console.log({ name, username, email, profilePic, password });
      setLoading(true);
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
    }catch (err) {
      console.log(err);
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: err.message || "Error occurred while uploading the image",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.authHeading}>Register</div>
        <label htmlFor="name" className={styles.authLabel}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          className={styles.authInput}
          onChange={handleNameChange}
        />

        <label htmlFor="username" className={styles.authLabel}>
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className={styles.authInput}
          value={username}
          onChange={handleUsernameChange}
        />

        <label htmlFor="email" className={styles.authLabel}>
          Email:
        </label>
        {/* <input
          type="email"
          id="email"
          className={styles.authInput}
          name="email"
          value={email}
          onChange={handleEmailChange}
        /> */}

        <label htmlFor="profile-pic" className={styles.authLabel}>
          Profile Picture:
        </label>
        <input
          type="file"
          id="profile-pic"
          name="image"
          className={styles.authInput}
          onChange={handleProfilePicChange}
        />

        <label htmlFor="password" className={styles.authLabel}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className={styles.authInput}
          value={password}
          onChange={handlePasswordChange}
        />

        <button type="submit" className={styles.authButton}>
          {loading ? (
            <Loader
              type="bubble-loop"
              bgColor={"#FFFFFF"}
              color={"#FFFFFF"}
              size={30}
            />
          ) : (
            "Sign Up"
          )}
        </button>
        <div className={styles.message} onClick={switchToLogIn}>
          Already have an account?
        </div>
      </form>
    </div>
  );
}

export default Register;
