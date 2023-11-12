import GitHubIcon from "@mui/icons-material/GitHub";

import { AppBar, IconButton, PaletteMode, Toolbar } from "@mui/material";
import { useRouter } from "next/router";
import useLoginUser from "~/auth/hooks/useLoginUser";
import { DesktopRoute } from "~/components/DesktopRoute";
import { LoginButton } from "~/components/LoginButton";
import { Logo } from "~/components/Logo";
import { LogoutButton } from "~/components/LogoutButton";
import { MobileMenu } from "~/components/MobileMenu";
import { ThemeToggleButton } from "~/components/ThemeToggleButton";

interface IHeaderProps {
  mode: PaletteMode;
  setMode: () => void;
}

const pages = ["table", "graph"];

const Header = ({ mode, setMode }: IHeaderProps) => {
  const router = useRouter();

  const { isLogined } = useLoginUser();

  return (
    <AppBar position="fixed">
      <Toolbar disableGutters sx={{ ml: "7%", mr: "7%" }}>
        <Logo />
        <MobileMenu pages={pages} />
        <DesktopRoute pages={pages} />

        <IconButton
          onClick={() => router.push("https://github.com/romanceformoon")}
        >
          <GitHubIcon />
        </IconButton>
        <ThemeToggleButton mode={mode} setMode={setMode} />
        {!isLogined ? <LoginButton /> : <LogoutButton />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
