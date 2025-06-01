import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { PaletteMode, ToggleButton } from '@mui/material';

interface IToggleProps {
  mode: PaletteMode;
  setMode: () => void;
}

export const ThemeToggleButton = ({ mode, setMode }: IToggleProps) => {
  return (
    <ToggleButton onClick={setMode} value='mode' sx={{ border: 0, borderRadius: 10 }}>
      {mode === 'light' ? (
        <DarkModeIcon aria-label='darkMoon' sx={{ width: '2.4rem', height: '2.4rem' }} />
      ) : (
        <LightModeIcon aria-label='lightSun' sx={{ width: '2.4rem', height: '2.4rem' }} />
      )}
    </ToggleButton>
  );
};
