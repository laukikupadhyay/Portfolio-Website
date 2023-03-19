import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faGear  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Profile.module.css'

function Profile() {
  return (
    <div className={styles.profileCard}>
        <div className={styles.picname}>
            <div className={styles.nameRight}>
            <img className={styles.avatar} src='https://www.w3schools.com/howto/img_avatar.png' alt='avatar'/>
            <div className={styles.self}>
            <div className={styles.name}>Anshu Joshi</div>
            <div className={styles.friends}>0 friends</div>
            </div>
            </div>
            <div className={styles.settings}>
            <FontAwesomeIcon icon="fa-solid fa-gear" />
            </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.details}>
            <div className={styles.location}>
                <img src='http://www.clker.com/cliparts/0/9/7/1/1194984989151900001map-marker.svg' alt='location'/>
                <div className={styles.locationText}>Location</div>
            </div>
            <div className={styles.interests}>
                <img src='https://www.flaticon.com/svg/static/icons/svg/149/149222.svg' alt='interests'/>
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
                <div className='impressions-text'>Profile views</div>
                <div className='impressions-count'>0</div>
            </div>
        </div>
        <div className={styles.divider}></div>
        <div className='social-profile'>
            <div className={styles.socialProfileText}>Social profile</div>
            <div className={styles.socialProfileIcons}>
            {/* <FontAwesomeIcon icon={faGear} />
            <FontAwesomeIcon icon={faGear} />
            <FontAwesomeIcon icon={faGear} />
            <FontAwesomeIcon icon={faGear}/> */}
            <FontAwesomeIcon icon="fa-solid fa-gear" />
            </div>
        </div>
    </div>
  )
}

export default Profile