import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../supabase";
import Wrapper from "../components/LoginWrapper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      console.log(event);
      if (event !== "SIGNED_OUT") {
        navigate("/main");
        console.log("Login success");
      } else navigate("/login");
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
