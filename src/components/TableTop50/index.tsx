import LinkIcon from '@mui/icons-material/Link';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

const colorPick = (clear: string) => {
  switch (clear) {
    case 'FULL COMBO':
      return '#fde1f5d8';
    case 'HARD CLEAR':
      return '#dd395ada';
    case 'GROOVE CLEAR':
      return '#5e99ff';
    case 'EASY CLEAR':
      return '#79e158';
    case 'FAILED':
      return '#3333337a';
    case 'NO PLAY':
      return '#00000000';
  }
};

interface IHistoryProps {
  historyData: IHistory;
  category: string;
}

export const TableTop50 = ({ historyData, category }: IHistoryProps) => {
  const [songList, setSongList] = useState<IHistorySelectedLevel[]>([]);

  const descExp = useCallback(() => {
    setSongList((prevState: IHistorySelectedLevel[]) => {
      const newArray = prevState.sort((a: IHistorySelectedLevel, b: IHistorySelectedLevel) => {
        return a.exp > b.exp ? -1 : 1;
      });
      return [...newArray];
    });
  }, []);

  useEffect(() => {
    if (category === 'aery')
      setSongList([
        ...historyData['LEVEL 1'],
        ...historyData['LEVEL 2'],
        ...historyData['LEVEL 3'],
        ...historyData['LEVEL 4'],
        ...historyData['LEVEL 5'],
        ...historyData['LEVEL 6'],
        ...historyData['LEVEL 7'],
        ...historyData['LEVEL 8'],
        ...historyData['LEVEL 9'],
        ...historyData['LEVEL 10'],
        ...historyData['LEVEL 11'],
        ...historyData['LEVEL 12'],
        ...historyData['LEVEL 13'],
        ...historyData['LEVEL 14'],
        ...historyData['LEVEL 15'],
        ...historyData['LEVEL 15+'],
        ...historyData['LEVEL 16'],
        ...historyData['LEVEL 16+'],
        ...historyData['LEVEL 17'],
        ...historyData['LEVEL 17+'],
        ...historyData['LEVEL 18'],
        ...historyData['LEVEL 18+'],
        ...historyData['LEVEL 19'],
        ...historyData['LEVEL 19+'],
        ...historyData['LEVEL 20'],
        ...historyData['LEVEL 20+']
      ]);
    else if (category === 'insane')
      setSongList([
        ...historyData['LEVEL 1'],
        ...historyData['LEVEL 2'],
        ...historyData['LEVEL 3'],
        ...historyData['LEVEL 4'],
        ...historyData['LEVEL 5'],
        ...historyData['LEVEL 6'],
        ...historyData['LEVEL 7'],
        ...historyData['LEVEL 8'],
        ...historyData['LEVEL 9'],
        ...historyData['LEVEL 10'],
        ...historyData['LEVEL 11'],
        ...historyData['LEVEL 12'],
        ...historyData['LEVEL 13'],
        ...historyData['LEVEL 14'],
        ...historyData['LEVEL 15'],
        ...historyData['LEVEL 16'],
        ...historyData['LEVEL 17'],
        ...historyData['LEVEL 18'],
        ...historyData['LEVEL 19'],
        ...historyData['LEVEL 20'],
        ...historyData['LEVEL 21'],
        ...historyData['LEVEL 22'],
        ...historyData['LEVEL 23'],
        ...historyData['LEVEL 24'],
        ...historyData['LEVEL 25']
      ]);
    else if (category === 'sl' || category === 'st')
      setSongList([
        ...historyData['LEVEL 0'],
        ...historyData['LEVEL 1'],
        ...historyData['LEVEL 2'],
        ...historyData['LEVEL 3'],
        ...historyData['LEVEL 4'],
        ...historyData['LEVEL 5'],
        ...historyData['LEVEL 6'],
        ...historyData['LEVEL 7'],
        ...historyData['LEVEL 8'],
        ...historyData['LEVEL 9'],
        ...historyData['LEVEL 10'],
        ...historyData['LEVEL 11'],
        ...historyData['LEVEL 12']
      ]);
    descExp();
  }, [descExp, historyData, category]);

  if (!historyData) return <></>;
  if (!songList) return <></>;

  return (
    <>
      <TableContainer
        sx={{
          border: 1,
          borderRadius: '1.4rem',
          borderColor: 'primary.main'
        }}
        component={Paper}
      >
        <Table sx={{ minWidth: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '5%' }}>
                <Typography variant='h2' fontWeight={700} textAlign='center'>
                  Rank
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '10%' }}>
                <Typography variant='h2' fontWeight={700} textAlign='center'>
                  Level
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '30%' }}>
                <Typography variant='h2' fontWeight={700} textAlign='center'>
                  Title
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '15%' }}>
                <Typography variant='h2' fontWeight={700} textAlign='center'>
                  Clear
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '10%' }}>
                <Typography variant='h2' fontWeight={700} textAlign='center'>
                  BP
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '10%' }}>
                <Typography variant='h2' fontWeight={700} textAlign='center'>
                  Rate
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '10%' }}>
                <Typography variant='h2' fontWeight={700} textAlign='center'>
                  EXP
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '10%' }}>
                <Typography variant='h2' fontWeight={700} textAlign='center'>
                  LR2IR
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songList.slice(0, 50).map((data, idx) => {
              return (
                <>
                  <TableRow sx={{ backgroundColor: colorPick(data.clear) }}>
                    <TableCell>
                      <Typography variant='h3' align='center'>
                        #{idx + 1}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='h3' align='center'>
                        {data.level}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='h3' align='center'>
                        {data.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='h3' align='center'>
                        {data.clear}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='h3' align='center'>
                        {data.bp}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='h3' align='center'>
                        {data.rate}%
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='h3' align='center'>
                        {data.exp.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell key={data.md5} align='center'>
                      <Link
                        href={`http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=${data.md5}`}
                        target='_blank'
                      >
                        <IconButton>
                          <LinkIcon sx={{ width: '2.4rem', height: '2.4rem' }} />
                        </IconButton>
                      </Link>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
