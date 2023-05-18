import React, { useEffect, useState } from 'react'
import NavBar from '../../components/navbar/Navbar'
import styles from './Search.module.css'
import { useSelector } from 'react-redux'
import InvitationRoom from '../../components/Rooms/InvitationRoom/InvitationRoom'
import SearchUser from '../../components/SearchUser/SearchUser'
import Loader from "react-js-loader";
import { useNavigate } from 'react-router-dom'

function Search() {
  const [search,setSearch] = useState('Paste invite link here!')
  const [compOne , setCompOne] = useState(false);
  const [compTwo , setCompTwo] = useState(false)
  const [compThree , setCompThree] = useState(false);
  const user = useSelector((state) => state.userInfo);
  console.log(user)
  const navigate = useNavigate();

    //To show only limited users 
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const [usersToShow, setUsersToShow] = useState(5);
    const [userloading, setUserLoading] = useState(false);

    /***Implementing the search by name ***/
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading , setLoading] = useState(false);
    useEffect(() => {
      const fetchUsers = async () => {
        setLoading(true);
        try {
          const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'users',{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
              }
          });
          const data = await response.json();
          const filteredUsers = data.data.users.filter(
            (userEach) => {
              return userEach._id != user._id;
            }
          );
          console.log(filteredUsers);
          setUsers(filteredUsers);
          setFilteredUsers(filteredUsers);
          setDisplayedUsers(filteredUsers.slice(0, usersToShow));
        } catch (error) {
          console.error('Error fetching users:', error);
        }
        finally{
          setLoading(false);
        }
      };
  
      fetchUsers();
    }, []);

    const handleLoadMore = () => {
      const remainingUsers = filteredUsers.slice(displayedUsers.length, displayedUsers.length + usersToShow);
      setDisplayedUsers((prevDisplayedUsers) => [...prevDisplayedUsers, ...remainingUsers]);
    };

    const handleSearchQueryChange = (e) => {
      let query = e.target.value;
      setSearchQuery(query);
      query = query.toLowerCase();
        console.log(users)
      const filtered = users.filter(
        (user) =>
          user.email.toLowerCase().includes(query) ||
          user.userName.toLowerCase().includes(query) ||
          user.name.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
      setDisplayedUsers(filtered);
      setDisplayedUsers(filteredUsers.slice(0, usersToShow));
    };
  
  const handleSearchTwo = async ()=>{
    setCompOne(false);
    setCompTwo(!compTwo);
  }

  const handleSearchBydistance = async ()=>{
    setCompOne(false);
    setCompTwo(false);
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
            handleSearchQueryChange();
        }} className={styles.input}/>
        <div className={styles.buttons}>
        <button onClick={handleSearchTwo} className={styles.button}>Join Room</button>
        <button onClick={handleSearchBydistance} className={styles.button}>Search user by distance</button>
        </div>

        </div>
        <div className={styles.resultContainer}>
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
        <div className={styles.secondInput}>
          <h2>Search by name</h2>
        <input value={searchQuery} onChange = {handleSearchQueryChange} className={styles.input}/>
        </div>
        <div className={styles.searchUsers}>
        {
          loading ? 
          (
            <Loader
            type="bubble-loop"
            bgColor={"#FFFFFF"}
            color={"#FFFFFF"}
            size={30}
            />
            ):
            (
            <div className={styles.userList}>
          {displayedUsers.map((user) => {
          return(
            <div className={styles.friend}>
            <div >
            <div className={styles.friendBox}>
            <img className={styles.avatar}
              src={user.image}
              />
            <div className={styles.name}>{user.name}</div>
            </div>
              </div>
            <div>
            <button onClick={()=>{
              navigate('/userpage/'+user._id);
            }}> Go to profile</button>
            </div>
        </div>
        )
})}
        {displayedUsers.length < filteredUsers.length && (
  <button onClick={handleLoadMore} className={styles.showMore}>Show More</button>
)}
        </div>
            )
          }
          </div>
    </div>
  )
}

export default Search