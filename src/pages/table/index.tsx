import LinkIcon from '@mui/icons-material/Link';
import {
  Box,
  IconButton,
  Paper,
  SelectChangeEvent,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import Table from '@mui/material/Table';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FixedSizeList as VirtualList } from 'react-window';
import AeryAPI from '~/api/aery';
import Aery7API from '~/api/aery7';
import { SelectLevel } from '~/components/SelectLevel';
import { Seo } from '~/components/Seo';
import { loadTableData } from '~/utils/loadTableData';

type KeyMode = 'aery' | 'aery7';

const tableApiMap = {
  aery: AeryAPI,
  aery7: Aery7API
};

const ROW_HEIGHT = 52;
const LIST_HEIGHT = 900;

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

  const [keyMode, setKeyMode] = useState<KeyMode>('aery');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedLevel(event.target.value as '모두 보기' | AeryLevel);
  };

  const handleKeyModeChange = (_event: React.MouseEvent<HTMLElement>, newKeyMode: KeyMode | null) => {
    if (!newKeyMode || newKeyMode === keyMode) return;
    setKeyMode(newKeyMode);
  };

  useEffect(() => {
    const load = async () => {
      const _ = await loadTableData(tableApiMap[keyMode]);
      setTableData(_);
    };
    load();
  }, [keyMode]);

  // 화면에 표시할 곡 목록 (모두 보기일 때는 전체를 펼침)
  const displayedSongs = useMemo<ISongData[]>(() => {
    if (selectedLevel === '모두 보기') {
      return Object.values(tableData).flat();
    }
    return tableData[selectedLevel] ?? [];
  }, [tableData, selectedLevel]);

  // 가상 테이블 행 렌더러 (화면에 보이는 행만 렌더링)
  const RowRenderer = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const song = displayedSongs[index];
      if (!song) return null;

      return (
        <TableRow key={song.md5} style={{ ...style, display: 'flex' }}>
          <TableCell
            align='center'
            sx={{ width: '10%', height: `${ROW_HEIGHT / 10}rem`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Typography variant='h3'>{song.level}</Typography>
          </TableCell>
          <TableCell sx={{ width: '40%', height: `${ROW_HEIGHT / 10}rem`, display: 'flex', alignItems: 'center' }}>
            <Typography
              variant='h3'
              sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {song.title}
            </Typography>
          </TableCell>
          <TableCell sx={{ width: '40%', height: `${ROW_HEIGHT / 10}rem`, display: 'flex', alignItems: 'center' }}>
            <Typography
              variant='h3'
              sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {song.artist}
            </Typography>
          </TableCell>
          <TableCell
            align='center'
            sx={{ width: '10%', height: `${ROW_HEIGHT / 10}rem`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
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
      );
    },
    [displayedSongs]
  );

  if (!tableData) return <></>;

  return (
    <>
      <Seo type='table' />

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: '1.5rem' }}>
        <ToggleButtonGroup value={keyMode} exclusive color='primary' onChange={handleKeyModeChange}>
          <ToggleButton value='aery'>
            <Typography variant='h4'>5KEYS</Typography>
          </ToggleButton>
          <ToggleButton value='aery7'>
            <Typography variant='h4'>7KEYS</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

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
            <TableRow style={{ display: 'flex' }}>
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
            {displayedSongs.length > 0 ? (
              <VirtualList
                height={LIST_HEIGHT}
                width='100%'
                itemCount={displayedSongs.length}
                itemSize={ROW_HEIGHT}
                overscanCount={10}
                innerElementType='div'
              >
                {RowRenderer}
              </VirtualList>
            ) : (
              <TableRow>
                <TableCell colSpan={4} align='center' sx={{ py: 3 }}>
                  <Typography variant='h4'>데이터가 없습니다.</Typography>
                </TableCell>
              </TableRow>
            )}
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
