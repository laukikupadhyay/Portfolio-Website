import React, { useState } from 'react'
import NavBar from '../../components/navbar/Navbar'
import styles from './Search.module.css'
import { useSelector } from 'react-redux'
import InvitationRoom from '../../components/Rooms/InvitationRoom/InvitationRoom'
import SearchUser from '../../components/SearchUser/SearchUser'

function Search() {
  const [search,setSearch] = useState('Paste invite link here!')
  const [compOne , setCompOne] = useState(false)
  const [compTwo , setCompTwo] = useState(false)
  const [compThree , setCompThree] = useState(false);
  const user = useSelector((state) => state.userInfo);
  console.log(user)

  const handleSearchOne = async ()=>{
    setCompOne(!compOne);
    setCompTwo(false);
    setCompThree(!compThree)
  }

  const handleSearchTwo = async ()=>{
    setCompTwo(!compTwo);
    setCompOne(!compOne);
  }

  const handleSearchBydistance = async ()=>{
    setCompTwo(false);
    setCompOne(false);
    setCompThree(!compThree);
    console.log(compThree);
  }
  return (
    <div>
        <NavBar/>
        <div className={styles.searchContainer}>
        <h1>Search users/rooms or join group by code</h1>
        <input value={search} onChange = {(e)=>{
            setSearch(e.target.value)
            console.log(search)
        }} className={styles.input}/>
        <div className={styles.buttons}>
        <button onClick={handleSearchOne} className={styles.button}>Search Users/Rooms by name</button>
        <button onClick={handleSearchTwo} className={styles.button}>Join Room</button>
        <button onClick={handleSearchBydistance} className={styles.button}>Search user by distance</button>
        </div>
        </div>
        <div className={styles.resultContainer}>
        {
          compOne && <div>
            
          </div>
        }
        {
          compTwo && <div>
              <InvitationRoom user={user} search={search}/>
            </div>
        }
        {
          compThree && <div className={styles.searchUserContainer}>
            {/* <h1>Search user by distance</h1> */}
            <SearchUser/>
          </div>
        }
        </div>
    </div>
  )
}

export default Search