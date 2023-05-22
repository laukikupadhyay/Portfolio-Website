import { useParams } from 'react-router-dom'
import MyAccount from '../../components/MyAccount/MyAccount'
import styles from './PublicProfile.module.css'

import React, { useEffect, useState } from 'react'
import NavBar from '../../components/navbar/Navbar';
import Post from '../../components/Post/Post';
import { useSelector } from 'react-redux';

function PublicProfile() {
    const {id} = useParams();
    const [user , setuser] = useState(null);
    const userInfo = useSelector((state) => state.userInfo);
    // const []

    useEffect(()=>{
        getUser();
    },[id])
    const getUser = async ()=>{
        try{
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'users/' + id, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json();
            console.log(data);
            setuser(data.data.user[0])
            console.log(user)
        }
        catch(err){
            console.log(err);
        }
    }
  return (
    <div>
        <NavBar/>
        <div className={styles.content}>
            <div className={styles.myAccount}>
        {user ? <MyAccount user={user} profileView={true}/> : <p>Loading...</p>}
            </div>
            <div className={styles.posts}>
        {user ? <Post user={user} ownProfileView={true} className={styles.posts}/> : <p>Loading...</p>}
            </div>
        </div>
    </div>
  )
}

export default PublicProfile