import React, { useState } from 'react'
import NavBar from '../../components/navbar/Navbar'
import styles from './Search.module.css'
import { useSelector } from 'react-redux'
import InvitationRoom from '../../components/Rooms/InvitationRoom/InvitationRoom'

function Search() {
  const [search,setSearch] = useState('')
  const [compOne , setCompOne] = useState(false)
  const [compTwo , setCompTwo] = useState(false)
  const user = useSelector((state) => state.userInfo);
  console.log(user)

  const handleSearchOne = async ()=>{
    setCompOne(true);
    setCompTwo(false);
  }

  const handleSearchTwo = async ()=>{
    setCompTwo(true);
    setCompOne(false);
  }
  return (
    <div>
        <NavBar/>
        <div className={styles.searchContainer}>
        <h1>Search users/rooms or join group by code</h1>
        <input onChange = {(e)=>{
            setSearch(e.target.value)
            console.log(search)
        }} className={styles.input}/>
        <div className={styles.buttons}>
        <button onClick={handleSearchOne}>Search Users/Rooms by name</button>
        <button onClick={handleSearchTwo}>Join Room</button>
        </div>
        </div>
        {
            compOne && <div></div>
        }
        {
            compTwo && <div>
              <InvitationRoom user={user} search={search}/>
            </div>
        }
    </div>
  )
}

export default Search