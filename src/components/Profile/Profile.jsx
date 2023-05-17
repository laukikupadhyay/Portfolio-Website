import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faLocationDot , faBriefcase ,faGear} from "@fortawesome/free-solid-svg-icons";
import twitter from '../../assests/icons/twitter.svg'
import styles from './Profile.module.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Profile({user}) {
    const [location , setLocation] = useState("");
    const userInfo = useSelector((state) => state.userInfo);
  const [lat, setLat] = useState(0);
  const [long , setLong] = useState(0);

    useEffect(()=>{
        console.log(user)
    })
    useEffect(() => {
        const getLocation = async () => {
          if (userInfo) {
            setLat(userInfo.location.coordinates[1]);
            setLong(userInfo.location.coordinates[0]);
            const res = await fetch( `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=ca6442829bc54e7c80a88fc2782267cc`);
            const data = await res.json();
            console.log(data)
            setLocation(data.results[0].formatted)
            return data;
          }
        }
        const place = getLocation();
        console.log(place)
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
                <div className={styles.locationText}>{location}</div>
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
                <div className={styles.whoViewedText}>Pending recieved requests</div>
                <div className='who-viewed-count'>{user.getRequests.length}</div>
            </div>
            <div className={styles.impressions}>
                <div className={styles.impressionsText}>Pending sent requests</div>
                <div className='impressions-count'>{user.sentRequests.length}</div>
            </div>
        </div>
        <div className={styles.divider}></div>
        <div className='social-profile'>
            {/* <div className={styles.socialProfileText}>Social profile</div> */}
            <div className={styles.socialProfileIcons}>
                {/* <img src={twitter}/> */}
            <button onClick={()=>{
                navigate('/user')
            }}>
                Profile
            </button>
            {/* <FontAwesomeIcon icon="fa-solid fa-gear" /> */}
            </div>
        </div>
    </div>
  )
}

export default Profile