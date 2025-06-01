import LinkIcon from '@mui/icons-material/Link';
import {
  IconButton,
  Paper,
  SelectChangeEvent,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import Table from '@mui/material/Table';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SelectLevel } from '~/components/SelectLevel';
import { Seo } from '~/components/Seo';
import { loadTableData } from '~/utils/loadTableData';

const DifficultyTable = () => {
  const [tableData, setTableData] = useState<ILevelList>({
    'LEVEL 1': [],
    'LEVEL 2': [],
    'LEVEL 3': [],
    'LEVEL 4': [],
    'LEVEL 5': [],
    'LEVEL 6': [],
    'LEVEL 7': [],
    'LEVEL 8': [],
    'LEVEL 9': [],
    'LEVEL 10': [],
    'LEVEL 11': [],
    'LEVEL 12': [],
    'LEVEL 13': [],
    'LEVEL 14': [],
    'LEVEL 15': [],
    'LEVEL 15+': [],
    'LEVEL 16': [],
    'LEVEL 16+': [],
    'LEVEL 17': [],
    'LEVEL 17+': [],
    'LEVEL 18': [],
    'LEVEL 18+': [],
    'LEVEL 19': [],
    'LEVEL 19+': [],
    'LEVEL 20': [],
    'LEVEL 20+': [],
    'LEVEL 99': [],
    'LEVEL GIMMICK': [],
    'LEVEL SPECIAL': [],
    'LEVEL DUMMY': [],
    'OLD CHARTS': []
  });

  const [selectedLevel, setSelectedLevel] = useState<'모두 보기' | AeryLevel>('모두 보기');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedLevel(event.target.value as '모두 보기' | AeryLevel);
  };

  useEffect(() => {
    const load = async () => {
      const _ = await loadTableData();
      setTableData(_);
    };
    load();
  }, []);

  if (!tableData) return <></>;

  return (
    <>
      <Seo type='table' />

      <SelectLevel
        selectedLevel={selectedLevel}
        handleChange={handleChange}
        tableData={tableData}
        showAll
      />

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
              <TableCell sx={{ width: '10%' }}>
                <Typography variant='h2' fontWeight={700} textAlign='center'>
                  Level
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '40%' }}>
                <Typography variant='h2' fontWeight={700}>
                  Title
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '40%' }}>
                <Typography variant='h2' fontWeight={700}>
                  Artist
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
            {selectedLevel === '모두 보기'
              ? Object.values(tableData)
                  .flat()
                  ?.map(song => {
                    return (
                      <>
                        <TableRow>
                          <TableCell key={song.level} align='center'>
                            <Typography variant='h3'>{song.level}</Typography>
                          </TableCell>
                          <TableCell key={song.title}>
                            <Typography variant='h3'>{song.title}</Typography>
                          </TableCell>
                          <TableCell key={song.artist}>
                            <Typography variant='h3'>{song.artist}</Typography>
                          </TableCell>
                          <TableCell key={song.md5} align='center'>
                            <Link
                              href={`http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=${song.md5}`}
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
                  })
              : tableData[selectedLevel]?.map((song: ISongData) => {
                  return (
                    <>
                      <TableRow>
                        <TableCell key={song.level} align='center'>
                          <Typography variant='h3'>{song.level}</Typography>
                        </TableCell>
                        <TableCell key={song.title}>
                          <Typography variant='h3'>{song.title}</Typography>
                        </TableCell>
                        <TableCell key={song.artist}>
                          <Typography variant='h3'>{song.artist}</Typography>
                        </TableCell>
                        <TableCell key={song.md5} align='center'>
                          <Link
                            href={`http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=${song.md5}`}
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

export async function getServerSideProps() {
  return {
    props: {}
  };
}

export default DifficultyTable;
