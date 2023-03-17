import { useNavigate } from "react-router-dom";
import supabase from "../supabase";

const Success = () => {
  const navigate = useNavigate();

  const logoutHander = async () => {
    const data = await supabase.auth.signOut();

    if (!data.error) {
      alert("Logout success");
      navigate("/login");
    } else alert("Logout failed");
  };

  return <button onClick={logoutHander}>signOut</button>;
};

export default Success;
