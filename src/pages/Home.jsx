import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen h-screen bg-black bg-no-repeat bg-center bg-cover 
    ">
      <div className="h-full w-2/5 flex flex-col pr-24 justify-center gap-16 pl-24">
        <h1 className={`animate__bounceInLeft uppercase text-7xl font-bold text-slate-50`}>
          Sport Match
        </h1>
        <span className="font-normal text-slate-50 text-2xl tracking-wide leading-normal">
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
