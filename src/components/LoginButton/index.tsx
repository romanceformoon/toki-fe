import PersonIcon from "@mui/icons-material/Person";
import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

export const LoginButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="text"
      component="label"
      sx={{ borderRadius: 10, color: "#ffffff" }}
      onClick={async () => {
        const response = await axios.get("/toki-api/auth/discord/oauth-url");
        router.push(response.data.oauth_url);
      }}
    >
      <PersonIcon />
    </Button>
  );
};
