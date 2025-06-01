import { Download, Pageview } from '@mui/icons-material';
import BarChartIcon from '@mui/icons-material/BarChart';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Button, Snackbar, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import Aery from 'public/update/aery.json';
import { useState } from 'react';
import { Seo } from '~/components/Seo';
import useLoginUser from '~/hooks/useLoginUser';
import { openInNewTab } from '~/utils/openInNewTab';

// 공통 Typography 스타일을 생성
const buttonTextStyle = {
  ml: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: 'calc(100% - 3.2rem)' // 아이콘 크기와 여백 고려
};

const Main = () => {
  const router = useRouter();

  const { uid, isLogined } = useLoginUser();

  const [logo, setLogo] = useState('logo.png');

  const [open, setOpen] = useState(false);

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setOpen(true);
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
  };

  return (
    <>
      <Seo type='main' />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          bgcolor: 'background.paper'
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '51rem',
            display: 'flex',
            flexDirection: 'column',
            gap: 4
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Button
              sx={{
                color: 'white'
              }}
              onClick={() => {
                if (logo === 'logo.png') setLogo('logo2.png');
                else setLogo('logo.png');
              }}
            >
              <Avatar
                sx={{
                  '&:hover': {
                    cursor: 'pointer'
                  },
                  width: '16rem',
                  height: '100%'
                }}
                alt='logo'
                src={`/assets/images/${logo}`}
              />
            </Button>
          </Box>

          <Stack direction='column' spacing={2}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 1
              }}
            >
              <Button
                variant='outlined'
                sx={{
                  width: '100%',
                  height: '4.8rem',
                  color: '#5783db',
                  borderColor: '#5783db',
                  ':hover': { borderColor: '#5783db' }
                }}
                onClick={async () => {
                  if (isLogined) router.push(`/user/${uid}`);
                  else {
                    const response = await axios.get('/toki-api/auth/discord/oauth-url');
                    router.push(response.data.oauth_url);
                  }
                }}
              >
                <PersonIcon
                  sx={{
                    width: '2.4rem',
                    height: '2.4rem'
                  }}
                />
                <Typography variant='h2' sx={buttonTextStyle}>
                  {isLogined ? '내 프로필' : '로그인'}
                </Typography>
              </Button>

              <Button
                variant='outlined'
                sx={{
                  width: '100%',
                  height: '4.8rem',
                  color: '#a881af',
                  borderColor: '#a881af',
                  ':hover': { borderColor: '#a881af' }
                }}
                onClick={async () => {
                  router.push(`/tools/viewer`);
                }}
              >
                <Pageview
                  sx={{
                    width: '2.4rem',
                    height: '2.4rem'
                  }}
                />
                <Typography variant='h2' sx={buttonTextStyle}>
                  BMS 채보 뷰어
                </Typography>
              </Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button
                variant='outlined'
                sx={{
                  width: '100%',
                  height: '4.8rem',
                  color: '#80669d',
                  borderColor: '#80669d',
                  ':hover': { borderColor: '#80669d' }
                }}
                onClick={async () => {
                  router.push(`/analyze`);
                }}
              >
                <BarChartIcon
                  sx={{
                    width: '2.4rem',
                    height: '2.4rem'
                  }}
                />
                <Typography variant='h2' sx={buttonTextStyle}>
                  점수 분석
                </Typography>
              </Button>

              <Button
                variant='outlined'
                sx={{
                  width: '100%',
                  height: '4.8rem',
                  color: '#dd7973',
                  borderColor: '#dd7973',
                  ':hover': { borderColor: '#dd7973' }
                }}
                onClick={async () => {
                  router.push(`/ranking`);
                }}
              >
                <EmojiEventsIcon
                  sx={{
                    width: '2.4rem',
                    height: '2.4rem'
                  }}
                />
                <Typography variant='h2' sx={buttonTextStyle}>
                  랭킹
                </Typography>
              </Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant='outlined'
                sx={{
                  width: '100%',
                  height: '4.8rem',
                  color: '#a13aa5',
                  borderColor: '#a13aa5',
                  ':hover': { borderColor: '#a13aa5' }
                }}
                onClick={() => {
                  openInNewTab(Aery[0].full_download_url);
                }}
              >
                <Download
                  sx={{
                    width: '2.4rem',
                    height: '2.4rem'
                  }}
                />
                <Typography variant='h2' sx={buttonTextStyle}>
                  5KEYS AERY FULL PACKAGE 다운로드
                </Typography>
              </Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant='outlined'
                sx={{
                  width: '100%',
                  height: '4.8rem',
                  color: '#a13aa5',
                  borderColor: '#a13aa5',
                  ':hover': { borderColor: '#a13aa5' }
                }}
                onClick={() => {
                  openInNewTab(Aery[0].patch_download_url);
                }}
              >
                <Download
                  sx={{
                    width: '2.4rem',
                    height: '2.4rem'
                  }}
                />
                <Typography variant='h2' sx={buttonTextStyle}>
                  5KEYS AERY 최신패치 다운로드
                </Typography>
              </Button>
            </Box>
          </Stack>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Typography variant='h2' fontWeight={700}>
                5KEYS AERY 난이도표 URL
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <TextField
                value='https://asumatoki.kr/table/aery/header.json'
                label=''
                id='aery-table-beatoraja'
                variant='outlined'
                size='small'
                focused={false}
                sx={{
                  width: '100%',
                  input: {
                    textAlign: 'center',
                    '&:hover': {
                      cursor: 'pointer'
                    },
                    fontSize: '1.6rem',
                    height: '2rem'
                  }
                }}
                onClick={() => {
                  handleCopyClipBoard('https://asumatoki.kr/table/aery/header.json');
                }}
              />
            </Box>

            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={() => setOpen(false)}
              message='복사 완료'
              sx={{
                '& .MuiSnackbarContent-message': {
                  fontSize: '1.4rem',
                  fontWeight: 500
                }
              }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Button
              variant='outlined'
              sx={{
                width: '16rem',
                height: '4.8rem',
                color: '#a881af',
                borderColor: '#a881af',
                ':hover': { borderColor: '#a881af' },
                borderRadius: 10
              }}
              onClick={async () => {
                router.push(`https://discord.gg/VhQahFaXHd`);
              }}
            >
              <Avatar
                sx={{
                  '&:hover': {
                    cursor: 'pointer'
                  },
                  width: '2.4rem',
                  height: 'auto',
                  mr: '0.8rem'
                }}
                variant='square'
                alt='discord'
                src={'/assets/images/discord-mark-blue.png'}
              />

              <Typography variant='h2' sx={buttonTextStyle}>
                디스코드
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {}
  };
}

export default Main;
