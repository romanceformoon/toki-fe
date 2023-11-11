import { Avatar, Typography } from "@mui/material";
import { useRouter } from "next/router";

export const MobileLogo = () => {
  const router = useRouter();

  return (
    <>
      <Avatar
        sx={{
          mr: "0.6rem",
          display: { md: "none" },
        }}
        alt="logo"
        src="/assets/images/logo.png"
        onClick={() => {
          router.push("/");
        }}
      />

      <Typography
        variant="h5"
        noWrap
        sx={{
          mr: 2,
          flexGrow: 1,
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
          display: { md: "none" },
        }}
        onClick={() => {
          router.push("/");
        }}
      >
        TOKI
      </Typography>
    </>
  );
};
