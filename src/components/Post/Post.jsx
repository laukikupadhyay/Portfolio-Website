import styles from "./Post.module.css";
import demo from "../../assests/images/demo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faComment,
  faShareSquare,
} from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";

const Post = ({ user, ownProfileView }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setPostsToView();
  }, []);

  const setPostsToView = async () => {
    const allPosts = await fetch(
      process.env.REACT_APP_BACKEND_URL + `posts/`,
      {
        method: "GET",
      }
    );
    const postsData = await allPosts.json();
    console.log(postsData);
    const filteredPosts = postsData.data.posts.filter((post) => {
      if (ownProfileView && post.userId === user._id) {
        return true;
      }
      if (!ownProfileView && (post.userId === user._id || user.friends.includes(post.userId))) {
        return true;
      }
      return false;
    });
    setPosts(filteredPosts);
  };

  return (
    <div className={styles.container}>
      {posts &&
        posts.map((post) => {
          return (
            <div key={post._id}>
              <div className={styles.user}>
                <div className={styles.about}>
                  <div className={styles.avatar}>
                    {/* <FontAwesomeIcon
                      className={styles.avatarImg}
                      icon={faUser}
                    /> */}
                    <img className={styles.avatarImg} src={user.image} alt="avatar" />
                  </div>
                  <div className="">
                    <h5 className={styles.name}>Anshu Joshi</h5>
                    <p className={styles.location}>Jharsuguda</p>
                  </div>
                </div>
                <button className={styles.button}>
                  <FontAwesomeIcon className={styles.icon} icon={faUserPlus} />
                </button>
              </div>
              <p className={styles.description}>{post.desc}</p>
              <img className={styles.image} alt="post" src={post.image} />
              <div className={styles.actions}>
                <div className={styles.likeCont}>
                  <div className={styles.likes}>
                    <button className={styles.button}>
                      <FontAwesomeIcon className={styles.icon} icon={faHeart} />
                    </button>
                    <span className={styles.count}>3</span>
                  </div>
                  <div className={styles.comment}>
                    <button className={styles.button}>
                      <FontAwesomeIcon
                        className={styles.icon}
                        icon={faComment}
                      />
                    </button>
                    <span className={styles.count}>23</span>
                  </div>
                </div>
                <button className={styles.button}>
                  <FontAwesomeIcon
                    className={styles.icon}
                    icon={faShareSquare}
                  />
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Post;
