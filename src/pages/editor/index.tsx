import { Save as SaveIcon, Search as SearchIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Fade,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FixedSizeList as VirtualList } from 'react-window';
import useAeryTableStore from '~/store/aeryTableStore';

const StyledTableContainer = styled(TableContainer)({
  maxHeight: '65vh'
});

const CenteredToast = styled(Box)({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 9999
});

const LevelEditor = () => {
  const { songs, isLoading, error, fetchSongs, updateSongs } = useAeryTableStore();
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<AeryLevel>('LEVEL 1');
  const [filteredSongs, setFilteredSongs] = useState<ISongData[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editedSongs, setEditedSongs] = useState<Map<string, ISongData>>(new Map());
  const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  // 레벨 목록
  const levels: AeryLevel[] = useMemo(
    () => [
      'LEVEL 1',
      'LEVEL 2',
      'LEVEL 3',
      'LEVEL 4',
      'LEVEL 5',
      'LEVEL 6',
      'LEVEL 7',
      'LEVEL 8',
      'LEVEL 9',
      'LEVEL 10',
      'LEVEL 11',
      'LEVEL 12',
      'LEVEL 13',
      'LEVEL 14',
      'LEVEL 15',
      'LEVEL 16',
      'LEVEL 17',
      'LEVEL 18',
      'LEVEL 19',
      'LEVEL 20',
      'LEVEL 20+',
      'LEVEL DUMMY',
      'OLD CHARTS'
    ],
    []
  );

  // 페이지 로딩 시 데이터 가져오기
  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  // 레벨별 노래 맵 메모이제이션
  const songsByLevel = useMemo(() => {
    const map = new Map<AeryLevel, ISongData[]>();

    if (songs.length > 0) {
      levels.forEach(level => {
        map.set(level, []);
      });

      songs.forEach(song => {
        const levelSongs = map.get(song.level) || [];
        levelSongs.push(song);
        map.set(song.level, levelSongs);
      });
    }

    return map;
  }, [songs, levels]);

  // 필터링된 곡 목록 - 검색어가 있을 때만 전체 검색, 없으면 현재 레벨만 사용
  useEffect(() => {
    if (songs.length > 0) {
      setIsFiltering(true);

      // 디바운스를 위한 타이머 설정
      const timer = setTimeout(() => {
        let filtered;

        if (search.trim() === '') {
          // 검색어가 없을 때는 현재 레벨의 곡만 표시
          filtered = songsByLevel.get(selectedLevel) || [];
        } else {
          // 검색어가 있을 때는 현재 레벨에서 검색
          const levelSongs = songsByLevel.get(selectedLevel) || [];
          const searchLower = search.toLowerCase();

          filtered = levelSongs.filter(
            song =>
              song.title.toLowerCase().includes(searchLower) ||
              song.artist.toLowerCase().includes(searchLower)
          );
        }

        setFilteredSongs(filtered);
        setIsFiltering(false);
      }, 300); // 300ms 디바운스

      return () => clearTimeout(timer);
    }
  }, [songs, selectedLevel, search, songsByLevel]);

  // 레벨 변경 처리
  const handleLevelChange = useCallback(
    (md5: string, newLevel: AeryLevel) => {
      const song = songs.find(s => s.md5 === md5);
      if (song) {
        const updatedSong = { ...song, level: newLevel };
        // 변경 내역 저장
        setEditedSongs(prev => new Map(prev.set(md5, updatedSong)));
      }
    },
    [songs]
  );

  // 토스트 타이머 설정
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (toastOpen) {
      timer = setTimeout(() => {
        setToastOpen(false);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [toastOpen]);

  // 변경사항 저장
  const handleSave = async () => {
    if (editedSongs.size === 0) {
      return;
    }

    setIsSubmitting(true);
    setSaveSuccess(null);

    try {
      // 변경된 곡 정보를 적용
      const updatedSongs = songs.map(song => {
        const editedSong = editedSongs.get(song.md5);
        return editedSong || song;
      });

      // API 호출하여 저장
      const success = await updateSongs(updatedSongs);

      if (success) {
        setSaveSuccess(true);
        setEditedSongs(new Map());
      } else {
        setSaveSuccess(false);
      }
      setToastOpen(true);
    } catch (err) {
      setSaveSuccess(false);
      setToastOpen(true);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 편집된 곡 개수 계산
  const editCount = useMemo(() => editedSongs.size, [editedSongs]);

  // 가상 테이블 행 렌더러
  const RowRenderer = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      if (index >= filteredSongs.length) return null;

      const song = filteredSongs[index];
      const editedSong = editedSongs.get(song.md5);
      const isEdited = !!editedSong && editedSong.level !== song.level;

      return (
        <TableRow
          key={song.md5}
          style={{ ...style, display: 'flex' }}
          sx={isEdited ? { backgroundColor: 'rgba(25, 118, 210, 0.08)' } : {}}
        >
          <TableCell
            variant='body'
            sx={{
              width: '40%',
              height: '52px',
              padding: '6px 16px',
              fontWeight: 'medium',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {song.title}
          </TableCell>
          <TableCell
            variant='body'
            sx={{
              width: '30%',
              height: '52px',
              padding: '6px 16px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {song.artist}
          </TableCell>
          <TableCell
            variant='body'
            sx={{
              width: '15%',
              height: '52px',
              padding: '6px 16px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {song.level}
          </TableCell>
          <TableCell
            variant='body'
            sx={{
              width: '15%',
              height: '52px',
              padding: '6px 16px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <FormControl fullWidth size='small'>
              <Select
                value={editedSong?.level || song.level}
                onChange={e => handleLevelChange(song.md5, e.target.value as AeryLevel)}
                sx={isEdited ? { borderColor: 'primary.main' } : {}}
              >
                {levels.map(level => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </TableCell>
        </TableRow>
      );
    },
    [filteredSongs, editedSongs, handleLevelChange, levels]
  );

  if (isLoading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress />
        <Typography variant='h6' sx={{ ml: 2 }}>
          데이터를 불러오는 중...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant='h4' color='error' gutterBottom>
            오류 발생
          </Typography>
          <Typography variant='body1' gutterBottom>
            {error}
          </Typography>
          <Button variant='contained' onClick={() => fetchSongs()} sx={{ mt: 2 }}>
            다시 시도
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Typography variant='h4' component='h4' gutterBottom>
        Aery 레벨 편집기
      </Typography>

      <Fade in={toastOpen && saveSuccess !== null} timeout={{ enter: 300, exit: 500 }}>
        <CenteredToast>
          <MuiAlert
            onClose={() => setToastOpen(false)}
            severity={saveSuccess ? 'success' : 'error'}
            variant='filled'
            sx={{ minWidth: '30rem', textAlign: 'center' }}
          >
            {saveSuccess ? '변경사항이 성공적으로 저장되었습니다.' : '저장 중 오류가 발생했습니다.'}
          </MuiAlert>
        </CenteredToast>
      </Fade>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant='outlined'
              label='제목 또는 아티스트로 검색'
              value={search}
              onChange={e => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant='outlined'>
              <InputLabel>레벨 선택</InputLabel>
              <Select
                value={selectedLevel}
                onChange={e => setSelectedLevel(e.target.value as AeryLevel)}
                label='레벨 선택'
                disabled={isFiltering}
              >
                {levels.map(level => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              startIcon={
                isSubmitting ? <CircularProgress size={24} color='inherit' /> : <SaveIcon />
              }
              onClick={handleSave}
              disabled={isSubmitting || editCount === 0}
            >
              저장 ({editCount})
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <StyledTableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow style={{ display: 'flex' }}>
              <TableCell sx={{ width: '40%', display: 'block' }}>제목</TableCell>
              <TableCell sx={{ width: '30%', display: 'block' }}>아티스트</TableCell>
              <TableCell sx={{ width: '15%', display: 'block' }}>현재 레벨</TableCell>
              <TableCell sx={{ width: '15%', display: 'block' }}>변경할 레벨</TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ display: 'block' }}>
            {isFiltering ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                <CircularProgress size={24} />
                <Typography variant='body2' sx={{ ml: 1 }}>
                  데이터 필터링 중...
                </Typography>
              </Box>
            ) : filteredSongs.length > 0 ? (
              <VirtualList
                height={550} // 테이블 높이 (StyledTableContainer의 maxHeight와 일치시키는 게 좋음)
                width='100%'
                itemCount={filteredSongs.length}
                itemSize={52} // 행 높이
                overscanCount={10} // 화면 밖에 미리 렌더링할 행 수
                innerElementType='div'
              >
                {RowRenderer}
              </VirtualList>
            ) : (
              <TableRow>
                <TableCell colSpan={4} align='center' sx={{ py: 3 }}>
                  <Typography variant='body1'>검색 결과가 없습니다.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </>
  );
};

export default LevelEditor;
