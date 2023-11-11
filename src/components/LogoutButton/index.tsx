import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import axiosInstance from "~/utils/axiosInstance";

export const LogoutButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="text"
      component="label"
      sx={{ borderRadius: 10, color: "#ffffff" }}
      onClick={async () => {
        await axiosInstance.get("/toki-api/auth/user/logout");
        router.reload();
      }}
    >
      <LogoutIcon />
    </Button>
  );
};
