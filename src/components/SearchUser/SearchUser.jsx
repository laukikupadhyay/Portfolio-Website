import React, { useEffect, useState } from 'react'
import styles from './SearchUser.module.css'
import EachUser from './EachUser/EachUser';
import { useSelector } from 'react-redux';
import Loader from "react-js-loader";

function SearchUser() {
  const [value , setValue] = useState(50);
  const [usersWithinRange , setUsersWithinRange] = useState([]);
  const [loading , setLoading] = useState(false);
  const userInfo = useSelector((state) => state.userInfo);
  
  useEffect(() => {
    getUsersWithinRange();
  }, [value]);
  
  useEffect(() => {
    console.log(usersWithinRange);
  }, [usersWithinRange]);

  const handleSliderChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };


  const getUsersWithinRange = async () => {
    setLoading(true);
    try {
      console.log(process.env.REACT_APP_BACKEND_URL + 'users/users-within/' + value + '/center/' + userInfo.location.coordinates[1] + ',' + userInfo.location.coordinates[0] + '/unit/km');
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + 'users/users-within/' + value + '/center/' + userInfo.location.coordinates[1] + ',' + userInfo.location.coordinates[0] + '/unit/km', {
        method: 'GET'
      })
      const data = await res.json();
      console.log(data);
      setUsersWithinRange(data.data.users);
      setLoading(false);
    }
    catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div className={styles.userListHeader}>
      <div className={styles.sliderContainer}>
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={handleSliderChange}
              className={styles.slider}
            />
            <div className={styles.sliderValue}>
              Search in the radius : 
              {value} 
              kms
            </div>
      </div>
      <h2>All users within {value} km of radius .</h2>
      <div className={styles.users}>
        {

          loading ? <Loader type="bubble-loop" bgColor={"#FFFFFF"} color={'#FFFFFF'} size={30} />:
      (
        usersWithinRange.length>0 ?
        (
          usersWithinRange.map((user)=>{
            return <EachUser user={user}/>;
          })
          )
          :(
            <h2>No users within range!</h2>
          )
      )
    }
      </div>
    </div>
  );
}

export default SearchUser