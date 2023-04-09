import styles from './Roommembers.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faXmark} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from 'react'

function Roommembers({room}) {
  const [members, setMembers] = useState([])
  console.log(room._id)
  useEffect(()=>{
    getMembers()
  },[room])

  const getMembers = async () => {
    try{
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'groups/getallgroupmembers/' + room._id, {
        method:'GET',
      })
      const data = await response.json();
      console.log(data)
      setMembers(data);
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div className={styles.memberContainer}>
      {members.length > 0 ? (
        members.map((member)=>{
          return(
            <div className={styles.friend}>
                    <div className={styles.friendBox}>
                    <FontAwesomeIcon className={styles.avatar} icon={faUser} />
                    <div className={styles.name}>{member.name}</div>
                    </div>
                    <div>
                    <FontAwesomeIcon className={styles.remove} icon={faXmark} />
                    </div>
                    
            </div>
          )
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Roommembers
