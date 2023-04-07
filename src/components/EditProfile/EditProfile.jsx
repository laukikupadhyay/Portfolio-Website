import { useState } from "react";
import styles from "./EditProfile.module.css";
import { interestsList } from "../../assests/data.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

function EditProfile() {
  const [name, setName] = useState("");
  const [interests, setInterests] = useState([]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

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

  return (
    <div className={styles.editProfileContainer}>
      <h2>Edit Profile</h2>
      <div className={styles.divider}></div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <div>Name:</div>
          <input
            className={styles.input}
            // placeholder="Anshu Joshi"
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <div className={styles.field}>
          <div>Interests:</div>
          <select className={styles.select} onChange={handleInterestChange}>
            <option value="">Select an interest</option>
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

        <button className={styles.updateButton} type="submit">
          Update Details
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
