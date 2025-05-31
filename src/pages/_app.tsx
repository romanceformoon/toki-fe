import { Box, CssBaseline, PaletteMode } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import localFont from 'next/font/local';
import Head from 'next/head';
import { NextPage } from 'next/types';
import { useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppWrapper from '~/layout/AppWrapper';
import Header from '~/layout/header';
import '~/pages/tools/viewer/styles/bmsViewer.css';

const mainFont = localFont({ src: '../layout/fonts/Title_Light.woff' });

// 다크 모드 깜빡임 방지를 위한 스크립트
const ThemeInitScript = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              const savedTheme = localStorage.getItem('theme');
              if (savedTheme) {
                document.documentElement.setAttribute('data-mui-color-scheme', savedTheme);
                document.documentElement.style.colorScheme = savedTheme;
              }
            } catch (e) {
              console.warn('다크 모드 설정 로드 실패:', e);
            }
          })();
        `
      }}
    />
  );
};

function MyApp({
  Component,
  pageProps
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
            refetchOnReconnect: true
          }
        }
      })
  );

  // 초기 렌더링 상태 관리
  const [mode, setMode] = useState<PaletteMode>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    const savedTheme = localStorage.getItem('theme') as PaletteMode;
    if (savedTheme) {
      setMode(savedTheme);
    }
    setMounted(true);
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: mainFont.style.fontFamily
        },
        palette: {
          mode
        }
      }),
    [mode]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='robots' content='index, follow' />
        <ThemeInitScript />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* 컴포넌트가 마운트되기 전까지는 내용을 렌더링하지 않음 */}
        {mounted && (
          <AppWrapper>
            <Header
              mode={mode}
              setMode={() => {
                const newMode = mode === 'light' ? 'dark' : 'light';
                setMode(newMode);
                localStorage.setItem('theme', newMode);
                document.documentElement.setAttribute('data-mui-color-scheme', newMode);
                document.documentElement.style.colorScheme = newMode;
              }}
            />
            <Box sx={pageProps.layout}>
              <Component {...pageProps} />
            </Box>
          </AppWrapper>
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  let pageProps = {};
  pageProps = await App.getInitialProps(context);

  let layout = {};
  if (context.ctx.pathname.includes('tools/viewer')) {
    layout = { mt: '12vh', mb: '5.5vh' };
  } else {
    layout = {
      mt: '12vh',
      ml: { xs: '8vw', md: '15vw' },
      mr: { xs: '8vw', md: '15vw' },
      mb: '5.5vh'
    };
  }

  return {
    pageProps: {
      layout,
      ...pageProps
    }
  };
};

export default MyApp;
