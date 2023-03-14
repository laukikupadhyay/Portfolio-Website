import { useNavigate } from "react-router-dom";

import supabase from "../supabase";

const Home = () => {
  const navigate = useNavigate();

  const logoutHander = async () => {
    const data = await supabase.auth.signOut();

    if (!data.error) alert("Logout success");
  };

  return (
    <>
      <h1>Home</h1>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={logoutHander}>Logout</button>
    </>
  );
};

export default Home;
