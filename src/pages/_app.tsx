import { Box, Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppProps } from "next/app";
import { NextPage } from "next/types";
import Header from "~/layout/header";

function MyApp({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPage & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
  };
}) {
  const THEME = createTheme({
    typography: {
      fontFamily: "Pretendard",
    },
  });

  return (
    <ThemeProvider theme={THEME}>
      <Header />
      <Container maxWidth="xl">
        <Box sx={{ mt: "6.3rem" }}>
          <Component {...pageProps} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default MyApp;
