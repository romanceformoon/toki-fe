import { Save as SaveIcon, Search as SearchIcon } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
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
import { styled } from '@mui/system';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useAeryTableStore from '~/store/aeryTableStore';

const StyledTableContainer = styled(TableContainer)({
  maxHeight: '57vh'
});

const LevelEditor = () => {
  const { songs, isLoading, error, fetchSongs, updateSongs } = useAeryTableStore();
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<AeryLevel>('LEVEL 1');
  const [filteredSongs, setFilteredSongs] = useState<ISongData[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editedSongs, setEditedSongs] = useState<Map<string, ISongData>>(new Map());
  const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);

  // 레벨 목록
  const levels: AeryLevel[] = [
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
  ];

  // 페이지 로딩 시 데이터 가져오기
  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  // 필터링된 곡 목록
  useEffect(() => {
    if (songs.length > 0) {
      const filtered = songs.filter(
        song =>
          song.level === selectedLevel &&
          (song.title.toLowerCase().includes(search.toLowerCase()) ||
            song.artist.toLowerCase().includes(search.toLowerCase()))
      );
      setFilteredSongs(filtered);
    }
  }, [songs, selectedLevel, search]);

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
    } catch (err) {
      setSaveSuccess(false);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 편집된 곡 개수 계산
  const editCount = useMemo(() => editedSongs.size, [editedSongs]);

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

      {saveSuccess !== null && (
        <Alert severity={saveSuccess ? 'success' : 'error'} sx={{ mb: 2 }}>
          {saveSuccess ? '변경사항이 성공적으로 저장되었습니다.' : '저장 중 오류가 발생했습니다.'}
        </Alert>
      )}

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
            <TableRow>
              <TableCell width='40%'>제목</TableCell>
              <TableCell width='30%'>아티스트</TableCell>
              <TableCell width='15%'>현재 레벨</TableCell>
              <TableCell width='15%'>변경할 레벨</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSongs.length > 0 ? (
              filteredSongs.map(song => {
                const editedSong = editedSongs.get(song.md5);
                const isEdited = !!editedSong && editedSong.level !== song.level;

                return (
                  <TableRow
                    key={song.md5}
                    sx={isEdited ? { backgroundColor: 'rgba(25, 118, 210, 0.08)' } : {}}
                  >
                    <TableCell sx={{ fontWeight: 'medium' }}>{song.title}</TableCell>
                    <TableCell>{song.artist}</TableCell>
                    <TableCell>{song.level}</TableCell>
                    <TableCell>
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
              })
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
