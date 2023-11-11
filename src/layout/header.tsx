import GitHubIcon from "@mui/icons-material/GitHub";
import { AppBar, IconButton, PaletteMode, Toolbar } from "@mui/material";
import { useRouter } from "next/router";
import { DesktopRoute } from "~/components/DesktopRoute";
import { Logo } from "~/components/Logo";
import { MobileLogo } from "~/components/MobileLogo";
import { MobileMenu } from "~/components/MobileMenu";
import { ThemeToggleButton } from "~/components/ThemeToggleButton";

interface IHeaderProps {
  mode: PaletteMode;
  setMode: () => void;
}

const pages = ["table", "graph"];

const Header = ({ mode, setMode }: IHeaderProps) => {
  const router = useRouter();

  return (
    <AppBar position="fixed">
      <Toolbar disableGutters sx={{ ml: "7%", mr: "7%" }}>
        <Logo />
        <MobileMenu pages={pages} />
        <MobileLogo />
        <DesktopRoute pages={pages} />

        <IconButton
          onClick={() => router.push("https://github.com/romanceformoon")}
        >
          <GitHubIcon />
        </IconButton>

        <ThemeToggleButton mode={mode} setMode={setMode} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
