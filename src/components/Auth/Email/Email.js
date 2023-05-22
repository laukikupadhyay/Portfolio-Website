import styles from "./Email.module.css";

import React, { useState } from "react";
import Loader from "react-js-loader";
import swal from "sweetalert2";

function Email({ switchToLogIn, switchToRegister }) {
  const [otp, setOtp] = useState();
  const [sent, isSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + "auth/sendotp/" + email,
        {
          method: "POST",
          AccessControlAllowOrigin: "*",
        }
      );
      const data = await res.json();
      if (data.status == "success") {
        swal.fire({
          title: "Otp has been sent!",
          text: data.message,
          icon: "success",
          confirmButtonText: "Ok",
        });
        isSent(true);
      } else {
        swal.fire({
          title: "Error!",
          text: data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } catch (err) {
      swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    if (!otp) {
      return swal.fire({
        title: "Error!",
        text: "Enter a valid otp!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + "auth/compare/" + email + "/" + otp,
        {
          method: "POST",
        }
      );

      const data = await res.json();
      if (data.status == "success") {
        localStorage.setItem("sportyphy_19967_email", email);
        switchToRegister();
      } else {
        swal.fire({
          title: "Error!",
          text: data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } catch (err) {
      swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.authHeading}>Register</div>
        <div className={styles.email}>
          <div>Enter an email address to continue...</div>
          <input
            className={styles.input}
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        {!sent && (
          <button type="submit" className={styles.authButton} onClick={sendOtp}>
            {loading ? (
              <Loader
                type="bubble-loop"
                bgColor={"#FFFFFF"}
                color={"#FFFFFF"}
                size={30}
              />
            ) : (
              "Send OTP"
            )}
          </button>
        )}

        {sent && (
          <div className={styles.email}>
            <div>An email has been sent to {email}</div>
            <input
              className={styles.input}
              type="text"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />
            <button
              type="submit"
              className={styles.authButton}
              onClick={verifyOtp}
            >
              {loading ? (
                <Loader
                  type="bubble-loop"
                  bgColor={"#FFFFFF"}
                  color={"#FFFFFF"}
                  size={30}
                />
              ) : (
                "Verify OTP and continue"
              )}
            </button>
          </div>
        )}
        <div className={styles.message} onClick={switchToLogIn}>
          Already have an account?
        </div>
      </div>
    </div>
  );
}

export default Email;
