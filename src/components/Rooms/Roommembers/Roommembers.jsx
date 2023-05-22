import styles from './Roommembers.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faXmark} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import Loader from "react-js-loader";

function Roommembers({room}) {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(false)
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

  const removeMember = async (id) => {
    Swal.fire({
      title: "Do you really want to remove the user?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
    try{

    setLoading(true)
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'groups/leavegroup/' + room._id + "/"+id, {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
      })
      const data = await response.json();
      console.log(data)
      getMembers();
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false);
    }
  }
})
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
                    {
                      loading ?
                      <Loader type="bubble-loop" bgColor={"#FFFFFF"} color={'#FFFFFF'} size={30} />
                      :
                      <div>
                      {
                        member.name === room.adminName ? ""
                        :
                        (
                          
                          userInfo.email === room.creator && 
                          <FontAwesomeIcon className={styles.remove} icon={faXmark} onClick={()=>removeMember(member._id)}/>
                          
                          )
                        }
                    </div>
                        }
                    
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
