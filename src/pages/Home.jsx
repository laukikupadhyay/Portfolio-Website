import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={`animate__bounceInLeft ${styles.heading}`}>
          Sport Match
        </h1>
        <span className={styles.about}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat,
          dolorum ea cum voluptatum iure voluptate error molestiae a recusandae
          nemo, tempora dolores eaque. Commodi?
        </span>
        <button className={styles.button} onClick={() => navigate("/login")}>
          get started
        </button>
      </div>
    </div>
  );
};

export default Home;