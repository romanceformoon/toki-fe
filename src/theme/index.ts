import { PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';

// 기본 폰트 사이즈 설정 (1rem = 10px 기준)
const defaultFontSizes = {
  h1: '2rem',
  h2: '1.8rem',
  h3: '1.6rem',
  h4: '1.4rem',
  h5: '1.2rem'
};

// 커스텀 폰트 사이즈 적용 함수
export const customizeFontSizes = (customSizes: Partial<typeof defaultFontSizes>) => {
  return { ...defaultFontSizes, ...customSizes };
};

// Typography 설정 정의
const createTypography = (fontSizes = defaultFontSizes): TypographyOptions => ({
  fontFamily: 'inherit', // _app.tsx에서 설정한 폰트를 상속
  h1: {
    fontSize: fontSizes.h1,
    fontWeight: 500,
    lineHeight: 1.2
  },
  h2: {
    fontSize: fontSizes.h2,
    fontWeight: 500,
    lineHeight: 1.2
  },
  h3: {
    fontSize: fontSizes.h3,
    fontWeight: 500,
    lineHeight: 1.2
  },
  h4: {
    fontSize: fontSizes.h4,
    fontWeight: 500,
    lineHeight: 1.2
  },
  h5: {
    fontSize: fontSizes.h5,
    fontWeight: 500,
    lineHeight: 1.2
  }
});

// 다크모드/라이트모드 팔레트 설정
const lightPalette = {
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0'
  },
  secondary: {
    main: '#9c27b0',
    light: '#ba68c8',
    dark: '#7b1fa2'
  },
  error: {
    main: '#d32f2f',
    light: '#ef5350',
    dark: '#c62828'
  },
  warning: {
    main: '#ed6c02',
    light: '#ff9800',
    dark: '#e65100'
  },
  info: {
    main: '#0288d1',
    light: '#03a9f4',
    dark: '#01579b'
  },
  success: {
    main: '#2e7d32',
    light: '#4caf50',
    dark: '#1b5e20'
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.6)',
    disabled: 'rgba(0, 0, 0, 0.38)'
  },
  background: {
    default: '#ffffff',
    paper: '#ffffff'
  }
};

const darkPalette = {
  primary: {
    main: '#90caf9',
    light: '#e3f2fd',
    dark: '#42a5f5'
  },
  secondary: {
    main: '#ce93d8',
    light: '#f3e5f5',
    dark: '#ab47bc'
  },
  error: {
    main: '#f44336',
    light: '#e57373',
    dark: '#d32f2f'
  },
  warning: {
    main: '#ffa726',
    light: '#ffb74d',
    dark: '#f57c00'
  },
  info: {
    main: '#29b6f6',
    light: '#4fc3f7',
    dark: '#0288d1'
  },
  success: {
    main: '#66bb6a',
    light: '#81c784',
    dark: '#388e3c'
  },
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)'
  },
  background: {
    default: '#121212',
    paper: '#121212'
  }
};

// 테마 생성 함수
export const createAppTheme = (
  mode: PaletteMode,
  fontFamily?: string,
  customFontSizes?: Partial<typeof defaultFontSizes>
) => {
  const fontSizes = customFontSizes ? customizeFontSizes(customFontSizes) : defaultFontSizes;
  const typography = createTypography(fontSizes);

  return createTheme({
    palette: {
      mode,
      ...(mode === 'light' ? lightPalette : darkPalette)
    },
    typography: {
      ...typography,
      fontFamily: fontFamily || typography.fontFamily
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 500
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow:
              mode === 'light' ? '0px 2px 8px rgba(0, 0, 0, 0.1)' : '0px 2px 8px rgba(0, 0, 0, 0.3)'
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px'
            }
          }
        }
      }
    }
  });
};

export default createAppTheme;
