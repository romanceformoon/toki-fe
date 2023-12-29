import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

export const MobileMenu = ({ pages }: IMenuProps) => {
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
      {/* 모바일 메뉴 버튼 */}
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>

      {/* 모바일 링크 */}
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {pages.map((page) => (
          <MenuItem
            key={page.name}
            onClick={() => {
              handleCloseNavMenu();
              router.push(`/${page.link}`);
            }}
          >
            {page.name.toUpperCase()}
          </MenuItem>
        ))}
      </Menu>
      <Button
        sx={{
          color: "white",
          display: { xs: "flex" },
        }}
        onClick={() => {
          router.push("/");
        }}
      >
        <Avatar
          sx={{
            mr: "0.6rem",
            justifyContent: "center",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          alt="logo"
          src="/assets/images/logo.png"
        />
      </Button>
    </Box>
  );
};
