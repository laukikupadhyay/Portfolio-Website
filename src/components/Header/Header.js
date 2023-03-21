import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser ,faImage,faVideo,faPaperclip,faMicrophone } from "@fortawesome/free-solid-svg-icons";
import styles from './Header.module.css'

function Header() {
  return (
    <div className={styles.headerContainer}>
        <div className={styles.upper}>
            <div className={styles.user}>
                <FontAwesomeIcon icon={faUser}/>
            </div>
            {/* <div className={styles.status}> */}
                <input className={styles.input} placeholder="How's your mood today..."/>
            {/* </div> */}
        </div>
        <div className={styles.divider}></div>
        <div className={styles.lower}>
            <div className={styles.lowerOptions}>

            <div className={styles.image}>
                <FontAwesomeIcon icon={faImage}/>
                <div className={styles.imageText}>
                    Image
                </div>
            </div>
            <div className={styles.clip}>
            <FontAwesomeIcon icon={faVideo}/>
                <div className={styles.videoText}>
                    Video
                </div>
            </div>
            <div className={styles.attachement}>
            <FontAwesomeIcon icon={faPaperclip}/>
                <div className={styles.clipText}>
                    Attachement
                </div>
            </div>
            <div className={styles.audio}>
            <FontAwesomeIcon icon={faMicrophone}/>
                <div className={styles.audioText}>
                    Video
                </div>
            </div>
            </div>
            <div>
                <button>POST</button>
            </div>
        </div>
    </div>
  )
}

export default Header