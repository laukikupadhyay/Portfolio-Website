import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import supabase from "../supabase";
import Wrapper from "../components/LoginWrapper";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_OUT") {
        navigate("/success");
        alert("Login success");
        console.log("Login success");
      }
    });
  });

  return (
    <Wrapper>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        providers={["google"]}
      />
    </Wrapper>
  );
};

export default Login;
