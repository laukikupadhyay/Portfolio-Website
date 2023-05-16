import React, { useEffect, useState } from 'react'
import styles from './Invitation.module.css'
import swal from "sweetalert2";
import Loader from "react-js-loader";

function Invitation({room}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading , setLoading] = useState(false);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'users',{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
              }
          });
          const data = await response.json();
          console.log(data.data.users);
          const filteredUsers = data.data.users.filter(
            (user) => {
              return !room.players.includes(user._id) && !room.invitations.includes(user._id);
            }
          );
          console.log(filteredUsers);
          setUsers(filteredUsers);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsers();
    }, []);
  
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
    };
  
    const handleSendInvite = async (user) => {
      // Handle the invitation sending logic here
      setLoading(true);
      try{
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'groups/inviteuser/'+ room._id + '/' + user._id,{
          method:'POST',
          headers: {
                'Content-Type': 'application/json',
              }
        })
        const res = await response.json();
        swal.fire({
          title: "Success!",
          text: res.message,
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
      catch(err){
        swal.fire({
          title: "Error!",
          text: "Error occurred while sending request!",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
      finally{
        setLoading(false);
        window.location.reload();
      }
    };
  
    return (
        <div className={styles.container}>
        <input
          type="text"
          placeholder="Invite users..."
          value={searchQuery}
          onChange={handleSearchQueryChange}
          className={styles.input}
        />
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
        <ul className={styles.userList}>
          {filteredUsers.map((user) => (
            <li key={user.id} className={styles.userItem}>
              <span>{user.name}</span>
              <span>{user.userName}</span>
              <span>{user.email}</span>
                  <button
                  onClick={() => handleSendInvite(user)}
                  className={styles.inviteButton}
                  >
                Send Invite
              </button>
            </li>
          ))}
        </ul>
            )
          }
      </div>
    );
  };

export default Invitation