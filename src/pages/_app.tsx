import { Box, CssBaseline, PaletteMode } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppProps } from "next/app";
import { NextPage } from "next/types";
import { useMemo, useState } from "react";
import Header from "~/layout/header";

function MyApp({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPage & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
  };
}) {
  const [mode, setMode] = useState<PaletteMode>("light");

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: "Pretendard",
        },
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        mode={mode}
        setMode={() => setMode(mode === "light" ? "dark" : "light")}
      />
      <Box sx={{ mt: "6.3rem", ml: "7%", mr: "7%" }}>
        <Component {...pageProps} />
      </Box>
    </ThemeProvider>
  );
}

export default MyApp;
