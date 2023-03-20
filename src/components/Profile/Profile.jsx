import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faLocationDot , faBriefcase ,faGear} from "@fortawesome/free-solid-svg-icons";
import twitter from '../../assests/icons/twitter.svg'
import styles from './Profile.module.css'

function Profile() {
  return (
    <div className={styles.profileCard}>
        <div className={styles.picname}>
            <div className={styles.nameRight}>
            <FontAwesomeIcon className={styles.avatar} icon={faUser} />
            <div className={styles.self}>
            <div className={styles.name}>Anshu Joshi</div>
            <div className={styles.friends}>0 friends</div>
            </div>
            </div>
            <div className={styles.settings}>
            <FontAwesomeIcon icon={faGear} />
            </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.details}>
            <div className={styles.location}>
                <div>
                <FontAwesomeIcon className={styles.icon} icon={faLocationDot}/>
                </div>
                <div className={styles.locationText}>Location</div>
            </div>
            <div className={styles.interests}>
            <FontAwesomeIcon className={styles.icon} icon={faBriefcase}/>
                <div className={styles.interestsText}>Interests</div>
            </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.statistics}>
            <div className={styles.whoViewed}>
                <div className={styles.whoViewedText}>Who viewed your profile</div>
                <div className='who-viewed-count'>0</div>
            </div>
            <div className={styles.impressions}>
                <div className={styles.impressionsText}>Profile views</div>
                <div className='impressions-count'>0</div>
            </div>
        </div>
        <div className={styles.divider}></div>
        <div className='social-profile'>
            <div className={styles.socialProfileText}>Social profile</div>
            <div className={styles.socialProfileIcons}>
                {/* <img src={twitter}/> */}
            <FontAwesomeIcon icon={faGear} />
            <FontAwesomeIcon icon={faGear} />
            <FontAwesomeIcon icon={faGear} />
            <FontAwesomeIcon icon={faGear}/>
            {/* <FontAwesomeIcon icon="fa-solid fa-gear" /> */}
            </div>
        </div>
    </div>
  )
}

export default Profile