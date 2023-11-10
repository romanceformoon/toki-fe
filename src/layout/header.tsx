import MenuIcon from "@mui/icons-material/Menu";
import { PaletteMode } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ThemeToggleButton } from "~/components/ThemeToggleButton";

interface IHeaderProps {
  mode: PaletteMode;
  setMode: () => void;
}

const pages = ["table", "graph"];
const settings = ["Profile", "Logout"];

const Header = ({ mode, setMode }: IHeaderProps) => {
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar disableGutters sx={{ ml: "7%", mr: "7%" }}>
        {/* 데스크탑 로고 */}
        <Button
          sx={{
            color: "white",
            display: { xs: "none", md: "flex" },
          }}
        >
          <Avatar
            onClick={() => {
              router.push("/");
            }}
            sx={{
              mr: "0.6rem",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            alt="logo"
            src="/assets/images/logo.png"
          />

          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => {
              handleCloseNavMenu();
              router.push("/");
            }}
          >
            TOKI
          </Typography>
        </Button>

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
                key={page}
                onClick={() => {
                  handleCloseNavMenu();
                  router.push(`/${page}`);
                }}
              >
                {page}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* 모바일 로고 */}
        <Avatar
          onClick={() => {
            router.push("/");
          }}
          sx={{
            mr: "0.6rem",
            "&:hover": {
              cursor: "pointer",
            },
            display: { md: "none" },
          }}
          alt="logo"
          src="/assets/images/logo.png"
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
            "&:hover": {
              cursor: "pointer",
            },
            display: { md: "none" },
          }}
          onClick={() => {
            handleCloseNavMenu();
            router.push("/");
          }}
        >
          TOKI
        </Typography>

        {/* 데스크탑 링크 */}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={() => {
                handleCloseNavMenu();
                router.push(`/${page}`);
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {page}
            </Button>
          ))}
        </Box>

        {/* 계정 설정 */}
        <Box sx={{ flexGrow: 0 }}>
          <ThemeToggleButton mode={mode} setMode={setMode} />

          {/* <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="logo" src="/assets/images/1.jpg" />
            </IconButton>
          </Tooltip>
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
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
