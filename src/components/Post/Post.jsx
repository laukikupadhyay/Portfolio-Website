import styles from "./Post.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faComment,
  faShareSquare,
} from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "react-js-loader";

const Post = ({ user, ownProfileView }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [postUsers, setPostUsers] = useState({});
  const [loading , setLoading] = useState(false);
  
  useEffect(() => {
    setPostsToView();
  }, []);

  const setPostsToView = async () => {
    const allPosts = await fetch(
      process.env.REACT_APP_BACKEND_URL + `posts/friendposts/${user._id}`,
      {
        method: "GET",
      }
    );
    const postsData = await allPosts.json();
    console.log(postsData);
    setPosts(postsData.data.posts);
  };
  
  const getUserById = async (id) => {
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'users/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data.data.user;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchPostUsers = async () => {
      setLoading(true)
      const users = {};
      for (const post of posts) {
        if(ownProfileView){
          if(post.userId === user._id){
            users[post.userId] = await getUserById(post.userId);
          }
        }
        else{

          if (!users[post.userId]) {
            users[post.userId] = await getUserById(post.userId);
          }
        }
      }
      setPostUsers(users);
      setLoading(false)
    };
    fetchPostUsers();
  }, [posts]);

  if (!posts.length) {
    return <div>No posts to show....</div>;
  }

  return (
    <div className={styles.container}>
      {
        loading?
        <Loader type="bubble-loop" bgColor={"#FFFFFF"} color={'#FFFFFF'} size={30} />:
        <>
          {
          posts &&
            posts.map((post) => {
              if(ownProfileView && post.userId !== user._id){
                return null;
              }
              const postUser =postUsers[post.userId] || {};
              return (
                <div key={post._id}>
              <div className={styles.user}>
                <div
                  className={styles.about}
                  onClick={() => {
                    navigate("/userpage/" + post.userId);
                  }}
                  >
                  <div className={styles.avatar}>
                    <img
                      className={styles.avatarImg}
                      src={postUser[0]?.image ?? ""}
                      alt="avatar"
                      />
                  </div>
                  <div className="">
                    <h5 className={styles.name}>{postUser[0]?.name ?? ""}</h5>
                    <p className={styles.location}>
                      {postUser?.location ?? ""}
                    </p>
                  </div>
                </div>
              </div>
              <p className={styles.description}>{post.desc}</p>
              <img className={styles.image} alt="post" src={post.image} />
            </div>
          );
        })}
      </>
      }
    </div>
  );
};

export default Post;
