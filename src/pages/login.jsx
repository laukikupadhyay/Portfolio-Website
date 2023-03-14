import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";

import supabase from "../supabase";
import Wrapper from "../components/LoginWrapper";

const Login = () => {
  const navigate = useNavigate();

  supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_IN") {
      navigate("/");
      alert("Login success");
    }
  });

  return (
    <Wrapper>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        // theme="dark"
        providers={["google"]}
      />
    </Wrapper>
  );
};

export default Login;
