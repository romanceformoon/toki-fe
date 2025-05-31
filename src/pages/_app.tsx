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

// 성능 최적화된 전체 요소 테마 전환 스타일
const ThemeAnimationStyles = () => {
  return (
    <style jsx global>{`
      /* 최적화된 전체 요소 트랜지션 */
      html {
        /* html에 트랜지션 적용하여 모든 상속 요소에 영향 */
        color-scheme: light dark;
        transition:
          color 0.4s ease,
          background-color 0.4s ease;
      }

      /* 최소한의 속성만 트랜지션 적용 */
      * {
        transition:
          color 0.4s ease,
          background-color 0.4s ease,
          border-color 0.4s ease,
          box-shadow 0.4s ease;
      }

      /* 중요하지 않은 요소는 트랜지션에서 제외 */
      .no-transition,
      svg *,
      img,
      video,
      .MuiTouchRipple-root {
        transition: none !important;
      }
    `}</style>
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

  // 단순화된 테마 변경 함수
  const handleThemeChange = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';

    // 테마 변경만 수행
    setMode(newMode);
    localStorage.setItem('theme', newMode);
    document.documentElement.setAttribute('data-mui-color-scheme', newMode);
    document.documentElement.style.colorScheme = newMode;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='robots' content='index, follow' />
        <ThemeInitScript />
      </Head>
      <ThemeAnimationStyles />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* 컴포넌트가 마운트되기 전까지는 내용을 렌더링하지 않음 */}
        {mounted && (
          <AppWrapper>
            <Header mode={mode} setMode={handleThemeChange} />
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
