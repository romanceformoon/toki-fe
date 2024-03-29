import { Box, CssBaseline, PaletteMode } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import localFont from "next/font/local";
import Head from "next/head";
import { NextPage } from "next/types";
import { useEffect, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AppWrapper from "~/layout/AppWrapper";
import Header from "~/layout/header";
import "~/pages/tools/viewer/styles/bmsViewer.css";

const mainFont = localFont({ src: "../layout/fonts/Title_Light.woff" });

function MyApp({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPage & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
  };
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            refetchOnReconnect: true,
          },
        },
      })
  );

  const [mode, setMode] = useState<PaletteMode>("light");

  useEffect(() => {
    if (localStorage.getItem("theme") as PaletteMode)
      setMode(localStorage.getItem("theme") as PaletteMode);
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: mainFont.style.fontFamily,
        },
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta name="robots" content="index, follow" />
        </Head>
        <CssBaseline />
        <AppWrapper user={pageProps.user}>
          <Header
            mode={mode}
            setMode={() => {
              setMode(mode === "light" ? "dark" : "light");
              localStorage.setItem(
                "theme",
                mode === "light" ? "dark" : "light"
              );
            }}
          />
          <Box sx={pageProps.layout}>
            <Component {...pageProps} />
          </Box>
        </AppWrapper>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const isDevelopmentEnv = process.env.NODE_ENV === "development";

  let pageProps = {};
  pageProps = await App.getInitialProps(context);

  let layout = {};
  if (context.ctx.pathname.includes("tools/viewer")) {
    layout = { mt: "12vh", mb: "5.5vh" };
  } else {
    layout = {
      mt: "12vh",
      ml: { xs: "8vw", md: "15vw" },
      mr: { xs: "8vw", md: "15vw" },
      mb: "5.5vh",
    };
  }

  if (context.ctx.req) {
    try {
      const requestURI = isDevelopmentEnv
        ? process.env.NEXT_PUBLIC_DEV
        : process.env.NEXT_PUBLIC_PROD;

      const result = await axios.get(
        `${requestURI}/toki-api/auth/user/refresh`,
        {
          headers: context.ctx.req.headers.cookie
            ? { cookie: context.ctx.req.headers.cookie }
            : undefined,
          withCredentials: true,
        }
      );

      const accessToken = result.data?.accessToken;

      if (accessToken) {
        try {
          const result = await axios.get(
            `${requestURI}/toki-api/auth/user/check-user`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          console.log(result.data.user);

          return {
            pageProps: {
              layout,
              ...pageProps,
              user: {
                ...result.data.user,
              },
            },
          };
        } catch (error) {
          console.error("Error on checkUser");
        }
      }
    } catch (err) {
      console.error("No Access Token");
    }
  }

  return {
    pageProps: {
      layout,
      ...pageProps,
    },
  };
};

export default MyApp;
