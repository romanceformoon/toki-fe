import { AppBar, PaletteMode, Toolbar } from "@mui/material";
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
  return (
    <AppBar position="fixed">
      <Toolbar disableGutters sx={{ ml: "7%", mr: "7%" }}>
        <Logo />
        <MobileMenu pages={pages} />
        <MobileLogo />
        <DesktopRoute pages={pages} />
        <ThemeToggleButton mode={mode} setMode={setMode} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
