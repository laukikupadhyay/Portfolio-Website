import React from 'react'
import styles from "./Friends.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faXmark} from "@fortawesome/free-solid-svg-icons";

function Friends() {
  return (
    <div className={styles.friends}>
        <h2>Your Friends</h2>
        <div className={styles.divider}></div>

        <div className={styles.friend}>
            <div className={styles.friendBox}>
            <FontAwesomeIcon className={styles.avatar} icon={faUser} />
            <div className={styles.name}>Chinmay Gupta</div>
            </div>
            <div>
            <FontAwesomeIcon className={styles.remove} icon={faXmark} />
            </div>
        </div>

        {/* Repetitions  */}
        <div className={styles.friend}>
            <div className={styles.friendBox}>
            <FontAwesomeIcon className={styles.avatar} icon={faUser} />
            <div className={styles.name}>Chinmay Gupta</div>
            </div>
            <div>
            <FontAwesomeIcon className={styles.remove} icon={faXmark} />
            </div>
        </div>

        <div className={styles.friend}>
            <div className={styles.friendBox}>
            <FontAwesomeIcon className={styles.avatar} icon={faUser} />
            <div className={styles.name}>Chinmay Gupta</div>
            </div>
            <div>
            <FontAwesomeIcon className={styles.remove} icon={faXmark} />
            </div>
        </div>

        <div className={styles.friend}>
            <div className={styles.friendBox}>
            <FontAwesomeIcon className={styles.avatar} icon={faUser} />
            <div className={styles.name}>Chinmay Gupta</div>
            </div>
            <div>
            <FontAwesomeIcon className={styles.remove} icon={faXmark} />
            </div>
        </div>
                
    </div>
  )
}

export default Friends