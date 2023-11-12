import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { PaletteMode, ToggleButton, Tooltip } from "@mui/material";

interface IToggleProps {
  mode: PaletteMode;
  setMode: () => void;
}

export const ThemeToggleButton = ({ mode, setMode }: IToggleProps) => {
  return (
    <ToggleButton
      onClick={setMode}
      value="mode"
      sx={{ border: 0, borderRadius: 10 }}
    >
      {mode === "light" ? (
        <>
          <Tooltip title="다크 모드 설정">
            <DarkModeIcon aria-label="darkMoon" />
          </Tooltip>
        </>
      ) : (
        <>
          <Tooltip title="라이트 모드 설정">
            <LightModeIcon aria-label="lightSun" />
          </Tooltip>
        </>
      )}
    </ToggleButton>
  );
};
