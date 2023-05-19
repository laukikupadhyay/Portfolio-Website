import React, { useEffect, useState } from 'react'
import styles from './Invitation.module.css'
import swal from "sweetalert2";
import Loader from "react-js-loader";
import emailjs from 'emailjs-com';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

function Invitation({room}) {
    const userInfo = useSelector((state) => state.userInfo);
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading , setLoading] = useState(false);
    const [from_name , setFromName] = useState(userInfo.name);
    const [message , setMessage] = useState(`Hi , Join my new room using the following code : ${room.invitationLink}`);
    const [to_email , setToEmail] = useState('');
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'users', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          console.log(data.data.users);
          const filteredUsers = data.data.users.filter((user) => {
            return (
              room &&
              room.players &&
              room.invitations &&
              !room.players.includes(user._id) &&
              !room.invitations.includes(user._id)
            );
          });
          console.log(filteredUsers);
          setUsers(filteredUsers);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsers();
    }, [room]);
  
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
  
    const sendInvitationEmail = async (email) => {
      try {
        await emailjs.send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          { to_email: email },
          process.env.REACT_APP_EMAILJS_USER_ID
        );
        Swal.fire({
          title: "Success!",
          text: "Invitation sent successfully!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        return true;
      } catch (error) {
        console.error('Error sending invitation email:', error);
        return false;
      }
    };

    const handleSendInvite = async (user) => {
      // Handle the invitation sending logic here
      sendInvitationEmail(user.email)
      setLoading(true);
      try{
        // const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'groups/inviteuser/'+ room._id + '/' + user._id,{
        //   method:'POST',
        //   headers: {
        //         'Content-Type': 'application/json',
        //       }
        // })
        // const res = await response.json();
        // swal.fire({
        //   title: "Success!",
        //   text: res.message,
        //   icon: "success",
        //   confirmButtonText: "Ok",
        // });
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
              <span className={styles.name}>{user.name}</span>
              {/* <span className={styles.username}>{user.userName}</span> */}
              <span className={styles.email}>{user.email}</span>
                  <button
                  onClick={() => handleSendInvite(user)}
                  className={styles.inviteButton}
                  >
                Send Invite via email
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