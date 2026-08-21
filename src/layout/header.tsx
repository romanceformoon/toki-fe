import { AppBar, Box, PaletteMode, Toolbar } from '@mui/material';
import { DesktopRoute } from '~/components/DesktopRoute';
import { Logo } from '~/components/Logo';
import { MobileMenu } from '~/components/MobileMenu';
import { ThemeToggleButton } from '~/components/ThemeToggleButton';
import { UserMenu } from '~/components/UserMenu';
import useLoginUser from '~/hooks/useLoginUser';

interface IHeaderProps {
  mode: PaletteMode;
  setMode: () => void;
}

const Header = ({ mode, setMode }: IHeaderProps) => {
  const { admin } = useLoginUser();

  return (
    <AppBar position='fixed'>
      <Toolbar disableGutters sx={{ ml: '7%', mr: '7%' }}>
        <Logo />
        <MobileMenu />

        <DesktopRoute />

        <Box sx={{ flexGrow: 1 }} />

        <ThemeToggleButton mode={mode} setMode={setMode} />
        {admin ? <UserMenu /> : null}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
