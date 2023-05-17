import styles from "./Auth.module.css";
import React, { useState } from "react";
import Login from "../../components/Auth/Login/Login.jsx";
// import Login from "../../components/AuthNew/Login";
// import Register from "../../components/AuthNew/Signup";
import Register from "../../components/Auth/Register/Register";

function Auth() {
  const [login, setLogin] = useState(true);

  const toggle = () => {
    setLogin(!login);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.heading}>
        <h1>SPORTYPHY</h1>
        <span>
          Join the ultimate sports community and connect with like-minded
          enthusiasts like never before!
        </span>
      </div>
      {login ? (
        <Login switchToRegister={toggle} />
      ) : (
        <Register switchToLogIn={toggle} />
      )}
    </div>
  );
}

export default Auth;
