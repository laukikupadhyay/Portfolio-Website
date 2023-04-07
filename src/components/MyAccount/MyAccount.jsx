import React, { useEffect } from 'react'
import styles from './MyAccount.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faGear} from "@fortawesome/free-solid-svg-icons";

function MyAccount({user}) {
  useEffect(()=>{
    console.log(user.userName);

  },[])
  return (
    <div className={styles.MyAccount}>
      <h2>My Account</h2>
      <div className={styles.divider}></div>
      <div className={styles.meDetails}>
      <div className={styles.me}>
        <div className={styles.image}>
        <img className={styles.avatar} icon={faUser} /*src={`${process.env.REACT_APP_BACKEND_URL}${user.image}`}*/ />
        </div>
        <div className={styles.username}>{user.name}</div>
      </div>
      <FontAwesomeIcon className={styles.gear} icon={faGear} />
      </div>
      <div className={styles.details}>
        <div className={styles.detailName}>
          USERNAME
          <div className={styles.detailValue}>{user.userName}</div>
          </div>
          <div className={styles.detailName}>
          EMAIL
          <div className={styles.detailValue}>{user.email}</div>
          </div>

          <div className={styles.detailName}>
          Location
          <div className={styles.detailValue}>Gwalior, Madhya Pradesh</div>
          </div>

          <div className={styles.detailName}>
          INTERESTS
          <div className={styles.detailValueTag}>
            {/* In tags   */}
            {user.interest.map((interest)=>{
                return(
                    <div className={styles.tag}>{interest}</div>
                )
            })}
          </div>
          </div>
      </div>
    </div>
  )
}

export default MyAccount