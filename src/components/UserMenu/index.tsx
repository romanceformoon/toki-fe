import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import useLoginUser from "~/auth/hooks/useLoginUser";
import axiosInstance from "~/utils/axiosInstance";

export const UserMenu = () => {
  const router = useRouter();

  const { uid, avatar } = useLoginUser();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0, ml: 2.5 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Tooltip title="프로필">
          <Avatar
            alt="Profile Image"
            src={
              avatar
                ? `https://cdn.discordapp.com/avatars/${uid}/${avatar}`
                : undefined
            }
          />
        </Tooltip>
      </IconButton>

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem key={"profile"} onClick={handleCloseUserMenu}>
          <Typography
            textAlign="center"
            onClick={async () => {
              router.push(`/user/${uid}`);
            }}
          >
            프로필
          </Typography>
        </MenuItem>
        <MenuItem key={"logout"} onClick={handleCloseUserMenu}>
          <Typography
            textAlign="center"
            onClick={async () => {
              await axiosInstance.get("/toki-api/auth/user/logout");
              router.reload();
            }}
          >
            로그아웃
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
