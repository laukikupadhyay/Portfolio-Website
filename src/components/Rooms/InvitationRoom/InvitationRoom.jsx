import styles from './Invitation.module.css'
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2';

function InvitationRoom({user , search}) {
    const [room , setRoom] = useState({});
    const [isUserPresent , setIsUserPresent] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        fetchRoom();
    },[])
        
    const fetchRoom = async () =>{
        try{
            const res = await fetch(process.env.REACT_APP_BACKEND_URL + `groups/getgroup/` + search, {
                method:'GET'
            })
            const data = await res.json();
            const fetchedRoom = data.data.group[0];
            console.log(fetchedRoom);
            if(!fetchRoom.length){
                    Swal.fire({
                        title: 'Error!',
                        text: 'Please write valid code',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                    return;
            }
            setRoom(fetchedRoom);
            console.log(fetchedRoom.players)
            if(fetchedRoom.players.includes(user._id)){
                setIsUserPresent(true);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const handleJoin = async ()=>{
        try{
            const res = await fetch(process.env.REACT_APP_BACKEND_URL + `groups/user/` + user._id + '/' + search, {
                method:'PATCH'
            })
            const data = await res.json();
            console.log(data);
            navigate(`/room/${room._id}`)
        }
        catch(err){
            console.log(err);
        }
    }

    if (Object.keys(room).length === 0) {
        return null;
    }

    return (
        <div className={styles.invitationRoomContainer}>
            <div className={styles.room}>
                <div className={styles.group}>
                    <div className={styles.groupDetails}>
                        <div className={styles.teamName}>{room.name}</div>
                        <div className={styles.teamDesc}>{room.desc}</div>
                        <div className={styles.teamSize}>No. of members :{!room.players ? '0/0' :   `  ${room.players.length}/${room.maxSize}`}</div>
                    </div>
                </div>
                <div className={styles.message}>
                    {
                        isUserPresent? <i>You are already in the group</i>:
                        <button onClick={()=>{
                            handleJoin();
                        }}>
                            Join
                        </button>
                    }
                    <button className={styles.enter} onClick={()=>{
                        navigate(`/room/${room._id}`)
                    }}>
                        Enter
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InvitationRoom
