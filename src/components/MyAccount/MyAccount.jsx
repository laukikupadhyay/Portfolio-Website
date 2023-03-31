import React from 'react'
import styles from './MyAccount.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faGear} from "@fortawesome/free-solid-svg-icons";

function MyAccount() {
  return (
    <div className={styles.MyAccount}>
      <h2>My Account</h2>
      <div className={styles.divider}></div>
      <div className={styles.meDetails}>
      <div className={styles.me}>
        <div className={styles.image}>
        <FontAwesomeIcon className={styles.avatar} icon={faUser} />
        </div>
        <div className={styles.username}>Anshu Joshi</div>
      </div>
      <FontAwesomeIcon className={styles.gear} icon={faGear} />
      </div>
      <div className={styles.details}>
        <div className={styles.detailName}>
          USERNAME
          <div className={styles.detailValue}>Anshu@123</div>
          </div>
          <div className={styles.detailName}>
          EMAIL
          <div className={styles.detailValue}>anshu.aj.joshi@gmail.com</div>
          </div>

          <div className={styles.detailName}>
          Location
          <div className={styles.detailValue}>Gwalior, Madhya Pradesh</div>
          </div>

          <div className={styles.detailName}>
          INTERESTS
          <div className={styles.detailValueTag}>
            {/* In tags   */}
            <div className={styles.tag}>Cricket</div>
            <div className={styles.tag}>Basketball</div>
            <div className={styles.tag}>Badminton</div>
          </div>
          </div>
      </div>
    </div>
  )
}

export default MyAccount