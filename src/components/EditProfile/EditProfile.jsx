import { useEffect, useState } from "react";
import styles from "./EditProfile.module.css";
import { interestsList } from "../../assests/data.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/auth/auth-slice";
import Loader from "react-js-loader";
import Swal from "sweetalert2";

function EditProfile({user}) {
   const userInfo = useSelector((state) => state.userInfo);
  const [name, setName] = useState("");
  const [interests, setInterests] = useState([]);
  const [loading , isLoading] = useState(false);
   const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);

  const dispatch = useDispatch();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

    useEffect(()=>{
        if(user){
            setName(user.name)
        }
    },[user])
  const handleInterestChange = (event) => {
    const selectedInterest = event.target.value;
    if (!interests.includes(selectedInterest)) {
      setInterests([...interests, selectedInterest]);
    }
  };

  const handleRemoveInterest = (interest) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Name: ", name);
    console.log("Interests: ", interests);
  };

  const handleLocationUpdate = async () => {
     if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
          setLocation(position.coords.latitude, position.coords.longitude);
        },
        function (error) {
          console.error(`Error getting user's location: ${error.message}`);
        }
      );
    }
  }

  const setLocation = async (latitude, longitude) => {
    try {
      console.log("Setting up your location ........");
      if (lat === 0 && long === 0) {
        console.log("Location not found, using previous location ..........");
        return;
      }
      console.log(lat , long);
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "users/setlocation/" + userInfo._id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            longitude: longitude,
            latitude: latitude,
          }),
        }
      );
      const data = await response.json();
      dispatch(setUser(data.data.user));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate= async ()=>{
    isLoading(true);
    try{
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + 'users/editprofile/' + user._id, {
        method: 'PATCH',
        body: JSON.stringify({
          name: name,
          interest: interests,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json();
      isLoading(false);
      console.log(data);
      dispatch(setUser(data.data.user))
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    }
    catch(err){
      console.log(err)
      isLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      })
    }
  }

  return (
    <div className={styles.editProfileContainer}>
      <h2>Edit Profile</h2>
      <div className={styles.divider}></div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <div>Name:</div>
          <input
            className={styles.input}
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <div className={styles.field}>
          <div>Interests:</div>
          <select className={styles.select} onChange={handleInterestChange}>
            {interestsList.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>


          <div className={styles.interestTags}>
            {interests.map((interest) => (
              <div key={interest} className={styles.interestTag}>
                {interest}
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveInterest(interest)}
                >
                   <FontAwesomeIcon className={styles.removeTag} icon={faXmark} />
                </button>
              </div>
            ))}
          </div>


        </div>
          {
            loading ? 
            <Loader type="bubble-loop" color={'#FFFFFF'} size={30} />:
            <button className={styles.updateButton} type="submit" onClick={handleUpdate}>
            Update details
        </button>
          }

          {
            loading ? 
            <Loader type="bubble-loop" color={'#FFFFFF'} size={30} />:
            <button className={styles.updateButton} type="submit" onClick={handleLocationUpdate}>
            Update location
        </button>
          }
      </form>
    </div>
  );
}

export default EditProfile;
