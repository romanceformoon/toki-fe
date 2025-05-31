import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from '@mui/material';
// import chardet from "chardet";
import iconv from 'iconv-lite';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Seo } from '~/components/Seo';
import bmsjs from '~/utils/bmsjs';
import BMSChart from '~/utils/bmsjs/bms/chart';
import { renderBms } from '~/utils/bmsjs/render';

const isValidLine = (input: string) => {
  const regex = /^(?!.*(.).*\1)[1-7]{7}$/;

  return regex.test(input);
};

const Viewer = () => {
  const [line, setLine] = useState<string>('1234567');
  const [SC2P, setSC2P] = useState<boolean>(false);

  const [chartState, setChartState] = useState<BMSChart>();

  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      const bmsFile = e.target.files[0];

      const bmsArrayBuffer = await bmsFile.arrayBuffer();

      const bmsUintArray = new Uint8Array(bmsArrayBuffer);

      const bmsBuffer = Buffer.from(bmsUintArray);

      // const encoding = chardet.detect(bmsBuffer);
      // if (!encoding) return;

      const bmsContent = iconv.decode(bmsBuffer, 'SHIFT-JIS');

      const chart = bmsjs.Compiler.compile(bmsContent);
      setChartState(chart.chart);
    }
  };

  useEffect(() => {
    if (!chartState || !line || !isValidLine(line)) return;

    renderBms(chartState, line, SC2P);
  }, [line, chartState, SC2P]);

  return (
    <>
      <Seo type='viewer' />

      <Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography fontSize='24px' fontWeight={700}>
            BMS Chart Viewer
          </Typography>
          <Typography
            fontSize='12px'
            fontWeight={500}
            sx={{
              color: 'grey'
            }}
          >
            Imported from
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link
              href={`https://github.com/Snack-X/web-bms-viewer`}
              style={{ textDecoration: 'none' }}
              target='_blank'
            >
              <Typography
                fontSize='12px'
                fontWeight={500}
                sx={{
                  color: '#476ce4'
                }}
              >
                https://github.com/Snack-X/web-bms-viewer
              </Typography>
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            mt: '2vh',
            mb: '2vh',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Button variant='contained' component='label' sx={{ borderRadius: 10 }}>
            <input type='file' accept='.bms,.bme' onChange={onChangeFile} hidden />
            <AddIcon sx={{ mr: 1 }} />
            BMS 파일 업로드
          </Button>
        </Box>
        <Box sx={{ textAlign: 'center', mb: '1vh' }}>
          <Typography>노트 배치 조절</Typography>
          <Typography
            fontSize='12px'
            fontWeight={500}
            sx={{
              color: 'grey'
            }}
          >
            ※ 입력 예시
          </Typography>
          <Typography
            fontSize='12px'
            fontWeight={500}
            sx={{
              color: 'grey'
            }}
          >
            5키 정분할: 2413567
          </Typography>

          <Typography
            fontSize='12px'
            fontWeight={500}
            sx={{
              color: 'grey'
            }}
          >
            7키 정분할: 2461357
          </Typography>
          <Typography
            fontSize='12px'
            fontWeight={500}
            sx={{
              color: 'grey'
            }}
          >
            (5키의 경우는 뒤에 67을 붙여야함)
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: '1vh' }}>
          <input
            className='no-spinner'
            type='number'
            required
            maxLength={7}
            value={line}
            onChange={e => setLine(e.target.value)}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              // number 타입에서 7글자 제한
              if (e.target.value.length > e.target.maxLength)
                e.target.value = e.target.value.slice(0, e.target.maxLength);
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: '2.5vh' }}>
          <Typography
            fontSize='14px'
            fontWeight={500}
            sx={{
              color: 'grey'
            }}
          >
            2P 스크래치
          </Typography>
          <input type='checkbox' checked={SC2P} onChange={e => setSC2P(!SC2P)} />
        </Box>

        <Box className='viewer-body'>
          <Box className='viewer-info'></Box>
          <Box className='viewer-output'></Box>
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

export default Viewer;
