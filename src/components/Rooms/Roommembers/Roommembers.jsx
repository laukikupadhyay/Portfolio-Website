import styles from './Roommembers.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faXmark} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function Roommembers({room}) {
  const [members, setMembers] = useState([])
  const userInfo = useSelector((state) => state.userInfo);
  useEffect(()=>{
    getMembers()
  },[room])

  const getMembers = async () => {
    try{
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'groups/getallgroupmembers/' + room._id, {
        method:'GET',
      })
      const data = await response.json();
      setMembers(data);
    }
    catch(err){
      console.log(err)
    }
  }

  const removeMember = async (e) => {

  }
  return (
    <div className={styles.memberContainer}>
      {members.length > 0 ? (
        members.map((member)=>{
          return(
            <div className={styles.friend}>
                    <div className={styles.friendBox}>
                    <img className={styles.avatar} icon={faUser} 
        src={member.image}
        />
                    <div className={styles.name}>{member.name}</div>
                    <i>{member.name === room.adminName && "(Admin)"}</i>
                    </div>
                    <div>
                      {
                        member.name === room.adminName ? ""
                        :
                        (
                          
                            userInfo.email === room.creator && 
                            <FontAwesomeIcon className={styles.remove} icon={faXmark} onClick={removeMember}/>
                          
                          )
                        }
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
