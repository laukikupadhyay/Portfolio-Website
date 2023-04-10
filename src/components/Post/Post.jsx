import styles from "./Post.module.css";
import demo from "../../assests/images/demo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faMessage,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

const Post = ({user , ownProfileView}) => {
  const [post , setPost] = useState({})

  const setPostsToView = () => {
    
  }
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <div className={styles.about}>
          <div className={styles.avatar}>
            <FontAwesomeIcon className={styles.avatarImg} icon={faUser} />
          </div>
          <div className="">
            <h5 className={styles.name}>Chinmay Gupta</h5>
            <p className={styles.location}>Agra, UP</p>
          </div>
        </div>
        <button className={styles.button}>
          <FontAwesomeIcon className={styles.icon} icon={faUserPlus} />
        </button>
      </div>
      <p className={styles.description}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore
        corporis!
      </p>
      <img className={styles.image} alt="post" src={demo} />
      <div className={styles.actions}>
        <div className={styles.likeCont}>
          <div className={styles.likes}>
            <button className={styles.button}>
              <FontAwesomeIcon className={styles.icon} icon={faHeart} />
            </button>
            <span className={styles.count}>4</span>
          </div>
          <div className={styles.comment}>
            <button className={styles.button}>
              <FontAwesomeIcon className={styles.icon} icon={faMessage} />
            </button>
            <span className={styles.count}>4</span>
          </div>
        </div>
        <button className={styles.button}>
          <FontAwesomeIcon className={styles.icon} icon={faShareFromSquare} />
        </button>
      </div>
    </div>
  );
};

export default Post;
