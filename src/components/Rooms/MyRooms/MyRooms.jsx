import React from 'react'
import styles from "./MyRooms.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faTrash} from "@fortawesome/free-solid-svg-icons";

function MyRooms() {
  return (
    <div className={styles.rooms}>
        <h2>All Rooms</h2>
        <div className={styles.divider}></div>

        <div className={styles.room}>
            <div className={styles.group}>
            <FontAwesomeIcon className={styles.avatar} icon={faUser} />
            <div className={styles.groupDetails}>
                <div className={styles.teamName}>Cricket Team</div>
                <div className={styles.teamDesc}>This is the group for team  building ....</div>
            </div>
            </div>
            <div>
            <FontAwesomeIcon className={styles.trash} icon={faTrash} />
            </div>
        </div>

        {/* Repeating  */}
        <div className={styles.room}>
            <div className={styles.group}>
            <FontAwesomeIcon className={styles.avatar} icon={faUser} />
            <div className={styles.groupDetails}>
                <div className={styles.teamName}>Cricket Team</div>
                <div className={styles.teamDesc}>This is the group for team  building ....</div>
            </div>
            </div>
            <div>
            <FontAwesomeIcon className={styles.trash} icon={faTrash} />
            </div>
        </div>

        <div className={styles.room}>
            <div className={styles.group}>
            <FontAwesomeIcon className={styles.avatar} icon={faUser} />
            <div className={styles.groupDetails}>
                <div className={styles.teamName}>Cricket Team</div>
                <div className={styles.teamDesc}>This is the group for team  building ....</div>
            </div>
            </div>
            <div>
            <FontAwesomeIcon className={styles.trash} icon={faTrash} />
            </div>
        </div>

                
    </div>
  )
}

export default MyRooms