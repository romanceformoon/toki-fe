import GitHubIcon from "@mui/icons-material/GitHub";
import {
  AppBar,
  IconButton,
  PaletteMode,
  Toolbar,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import useLoginUser from "~/auth/hooks/useLoginUser";
import { DesktopRoute } from "~/components/DesktopRoute";
import { LoginButton } from "~/components/LoginButton";
import { Logo } from "~/components/Logo";
import { MobileMenu } from "~/components/MobileMenu";
import { ThemeToggleButton } from "~/components/ThemeToggleButton";
import { UserMenu } from "~/components/UserMenu";

interface IHeaderProps {
  mode: PaletteMode;
  setMode: () => void;
}

const pages = [
  { name: "analyze", link: "analyze" },
  { name: "table", link: "table" },
  { name: "ranking", link: "ranking" },
  { name: "skill", link: "skill" },
  { name: "BMS viewer", link: "tools/viewer" },
];

const Header = ({ mode, setMode }: IHeaderProps) => {
  const { isLogined } = useLoginUser();

  return (
    <AppBar position="fixed">
      <Toolbar disableGutters sx={{ ml: "7%", mr: "7%" }}>
        <Logo />
        <MobileMenu pages={pages} />
        <DesktopRoute pages={pages} />

        <Link
          href={"https://github.com/romanceformoon/toki-fe"}
          target="_blank"
        >
          <IconButton>
            <Tooltip title="Github">
              <GitHubIcon />
            </Tooltip>
          </IconButton>
        </Link>

        <ThemeToggleButton mode={mode} setMode={setMode} />
        {!isLogined ? <LoginButton /> : <UserMenu />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
