import React, { useState } from 'react'
import NavBar from '../../components/navbar/Navbar'
import styles from './Search.module.css'
import { useSelector } from 'react-redux'
import InvitationRoom from '../../components/Rooms/InvitationRoom/InvitationRoom'
import SearchUser from '../../components/SearchUser/SearchUser'

function Search() {
  const [search,setSearch] = useState('')
  const [compOne , setCompOne] = useState(false)
  const [compTwo , setCompTwo] = useState(false)
  const user = useSelector((state) => state.userInfo);
  console.log(user)

  const handleSearchOne = async ()=>{
    setCompOne(!compOne);
    setCompTwo(!compTwo);
  }

  const handleSearchTwo = async ()=>{
    setCompTwo(!compTwo);
    setCompOne(!compOne);
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
        <div className={styles.resultContainer}>
        {
          compOne && <div>
            <SearchUser search={search}/>
          </div>
        }
        {
          compTwo && <div>
              <InvitationRoom user={user} search={search}/>
            </div>
        }
        </div>
    </div>
  )
}

export default Search