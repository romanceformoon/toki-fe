import axios from "axios";
import { useEffect } from "react";
import authToken from "~/auth";

const Login = () => {
  useEffect(() => {
    const discordAuth = async () => {
      try {
        const code = new URL(window.location.href).searchParams.get("code");

        const response = await axios.get(
          `/toki-api/auth/discord/login/${code}`
        );

        if (response.data.accessToken) {
          window.location.replace(window.location.origin);
        }
      } catch (err) {}
    };
    discordAuth();
  }, []);

  return <></>;
};

export default Login;
