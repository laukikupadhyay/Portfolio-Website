import React, { useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faLocationDot , faBriefcase ,faGear} from "@fortawesome/free-solid-svg-icons";
import twitter from '../../assests/icons/twitter.svg'
import styles from './Profile.module.css'
import { useNavigate } from 'react-router-dom';

function Profile({user}) {

    useEffect(()=>{
        console.log(user)
    })

    const navigate = useNavigate();
  return (
    <div className={styles.profileCard}>
        <div className={styles.picname}>
            <div className={styles.nameRight}>
            <img className={styles.avatar} src={user.image} />
            <div className={styles.self}>
            <div className={styles.name}>{user.name}</div>
            <div className={styles.friends}>{user.friends.length} friends</div>
            </div>
            </div>
            <div className={styles.settings}>
            <FontAwesomeIcon icon={faGear} onClick={
                ()=>{
                    navigate('/user')
                }
            }/>
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
            <div className={styles.allinterests}>
            {user.interest.map((interest)=>{
                return(
                    <div className={styles.tag}>{interest}</div>
                )
            })}
            </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.statistics}>
            <div className={styles.whoViewed}>
                <div className={styles.whoViewedText}>Pending requests</div>
                <div className='who-viewed-count'>{user.getRequests.length}</div>
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