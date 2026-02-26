import {
  Delete as DeleteIcon,
  Save as SaveIcon,
  Search as SearchIcon,
  Upload as UploadIcon
} from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Fade,
  FormControl,
  IconButton,
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
  Tooltip,
  Typography
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FixedSizeList as VirtualList } from 'react-window';
import useLoginUser from '~/hooks/useLoginUser';
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
  const { songs, isLoading, error, fetchSongs, updateSongs, importSongs } = useAeryTableStore();
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<AeryLevel>('LEVEL 1');
  const [filteredSongs, setFilteredSongs] = useState<ISongData[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editedSongs, setEditedSongs] = useState<Map<string, ISongData>>(new Map());
  const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  const { admin } = useLoginUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importResult, setImportResult] = useState<{ added: number; skipped: number } | null>(null);
  const [importToastOpen, setImportToastOpen] = useState(false);
  const [pendingImportCount, setPendingImportCount] = useState(0);
  const [deletedMd5s, setDeletedMd5s] = useState<Set<string>>(new Set());

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
      'LEVEL 15+',
      'LEVEL 16',
      'LEVEL 16+',
      'LEVEL 17',
      'LEVEL 17+',
      'LEVEL 18',
      'LEVEL 18+',
      'LEVEL 19',
      'LEVEL 19+',
      'LEVEL 20',
      'LEVEL 20+',
      'LEVEL 99',
      'LEVEL GIMMICK',
      'LEVEL SPECIAL',
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

  // 삭제 토글 처리
  const handleDeleteToggle = useCallback((md5: string) => {
    setDeletedMd5s(prev => {
      const next = new Set(prev);
      if (next.has(md5)) {
        next.delete(md5);
      } else {
        next.add(md5);
      }
      return next;
    });
  }, []);

  // 레벨 변경 처리
  const handleLevelChange = useCallback(
    (md5: string, newLevel: AeryLevel) => {
      const song = songs.find(s => s.md5 === md5);
      if (song) {
        const updatedSong = { ...song, level: newLevel, folder: newLevel };
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

  // 임포트 토스트 타이머
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (importToastOpen) {
      timer = setTimeout(() => {
        setImportToastOpen(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [importToastOpen]);

  // JSON 파일 업로드 처리
  const handleJsonUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = event => {
        try {
          const parsed = JSON.parse(event.target?.result as string) as ISongData[];
          if (!Array.isArray(parsed)) {
            throw new Error('JSON 파일은 배열 형식이어야 합니다.');
          }
          const result = importSongs(parsed);
          setImportResult(result);
          setImportToastOpen(true);
          if (result.added > 0) {
            setPendingImportCount(prev => prev + result.added);
          }
        } catch (err) {
          setImportResult(null);
          setImportToastOpen(true);
          console.error(err);
        } finally {
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }
      };
      reader.readAsText(file);
    },
    [importSongs]
  );

  // 변경사항 저장
  const handleSave = async () => {
    if (editedSongs.size === 0 && pendingImportCount === 0 && deletedMd5s.size === 0) {
      return;
    }

    setIsSubmitting(true);
    setSaveSuccess(null);

    try {
      // 삭제 대상 제외 후 변경된 곡 정보 적용 (임포트된 곡은 이미 songs에 포함됨)
      const updatedSongs = songs
        .filter(song => !deletedMd5s.has(song.md5))
        .map(song => {
          const editedSong = editedSongs.get(song.md5);
          return editedSong || song;
        });

      // API 호출하여 저장
      const success = await updateSongs(updatedSongs);

      if (success) {
        setSaveSuccess(true);
        setEditedSongs(new Map());
        setPendingImportCount(0);
        setDeletedMd5s(new Set());
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

  // 편집된 곡 개수 계산 (임포트 대기 + 삭제 대기 포함)
  const editCount = useMemo(
    () => editedSongs.size + pendingImportCount + deletedMd5s.size,
    [editedSongs, pendingImportCount, deletedMd5s]
  );

  // 가상 테이블 행 렌더러
  const RowRenderer = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      if (index >= filteredSongs.length) return null;

      const song = filteredSongs[index];
      const editedSong = editedSongs.get(song.md5);
      const isEdited = !!editedSong && editedSong.level !== song.level;
      const isDeleted = deletedMd5s.has(song.md5);

      return (
        <TableRow
          key={song.md5}
          style={{ ...style, display: 'flex' }}
          sx={
            isDeleted
              ? { backgroundColor: 'rgba(211, 47, 47, 0.08)', opacity: 0.6 }
              : isEdited
                ? { backgroundColor: 'rgba(25, 118, 210, 0.08)' }
                : {}
          }
        >
          <TableCell
            sx={{
              width: '40%',
              height: '5.2rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography
              variant='h3'
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textDecoration: isDeleted ? 'line-through' : 'none',
                color: isDeleted ? 'text.disabled' : 'inherit'
              }}
            >
              {song.title}
            </Typography>
          </TableCell>

          <TableCell
            sx={{
              width: '22%',
              height: '5.2rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography
              variant='h3'
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textDecoration: isDeleted ? 'line-through' : 'none',
                color: isDeleted ? 'text.disabled' : 'inherit'
              }}
            >
              {song.artist}
            </Typography>
          </TableCell>

          <TableCell
            sx={{
              width: '13%',
              height: '5.2rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography
              variant='h3'
              sx={{
                textDecoration: isDeleted ? 'line-through' : 'none',
                color: isDeleted ? 'text.disabled' : 'inherit'
              }}
            >
              {song.level}
            </Typography>
          </TableCell>

          <TableCell
            sx={{
              width: '18%',
              height: '5.2rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <FormControl fullWidth size='small' disabled={isDeleted}>
              <Select
                value={editedSong?.level || song.level}
                onChange={e => handleLevelChange(song.md5, e.target.value as AeryLevel)}
                sx={isEdited ? { borderColor: 'primary.main' } : {}}
              >
                {levels.map(level => (
                  <MenuItem key={level} value={level}>
                    <Typography variant='h3'>{level}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </TableCell>

          <TableCell
            sx={{
              width: '7%',
              height: '5.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Tooltip title={isDeleted ? '삭제 취소' : '삭제'}>
              <IconButton
                size='small'
                onClick={() => handleDeleteToggle(song.md5)}
                color={isDeleted ? 'default' : 'error'}
              >
                <DeleteIcon sx={{ width: '1.8rem', height: '1.8rem' }} />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      );
    },
    [filteredSongs, editedSongs, deletedMd5s, handleLevelChange, handleDeleteToggle, levels]
  );

  if (!admin) {
    return <></>;
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '65vh' }}>
        <CircularProgress size={20} />
        <Typography variant='h4' sx={{ ml: 2 }}>
          데이터를 불러오는 중...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '65vh' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant='h4' color='error' gutterBottom>
            오류 발생
          </Typography>
          <Typography variant='h4' gutterBottom>
            {error}
          </Typography>
          <Button variant='contained' onClick={() => fetchSongs()} sx={{ mt: 2 }}>
            <Typography variant='h4'>다시 시도</Typography>
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Typography variant='h1' component='h1' fontWeight={700} gutterBottom>
        Aery 레벨 편집기
      </Typography>

      <input
        ref={fileInputRef}
        type='file'
        accept='.json'
        style={{ display: 'none' }}
        onChange={handleJsonUpload}
      />

      <Fade in={importToastOpen} timeout={{ enter: 300, exit: 500 }}>
        <CenteredToast>
          <MuiAlert
            onClose={() => setImportToastOpen(false)}
            severity={importResult ? 'success' : 'error'}
            variant='filled'
            sx={{ minWidth: '30rem', textAlign: 'center', display: 'flex', alignItems: 'center' }}
          >
            <Typography variant='h4'>
              {importResult
                ? `${importResult.added}곡 추가됨 (중복 ${importResult.skipped}곡 제외)`
                : 'JSON 파일을 파싱하는 중 오류가 발생했습니다.'}
            </Typography>
          </MuiAlert>
        </CenteredToast>
      </Fade>

      <Fade in={toastOpen && saveSuccess !== null} timeout={{ enter: 300, exit: 500 }}>
        <CenteredToast>
          <MuiAlert
            onClose={() => setToastOpen(false)}
            severity={saveSuccess ? 'success' : 'error'}
            variant='filled'
            sx={{ minWidth: '30rem', textAlign: 'center', display: 'flex', alignItems: 'center' }}
          >
            <Typography variant='h4'>
              {saveSuccess
                ? '변경사항이 성공적으로 저장되었습니다.'
                : '저장 중 오류가 발생했습니다.'}
            </Typography>
          </MuiAlert>
        </CenteredToast>
      </Fade>

      <Paper sx={{ p: 2, mb: 2, display: 'flex', gap: 2, borderRadius: '1.4rem' }}>
        <TextField
          sx={{ width: '50%' }}
          variant='outlined'
          label='제목 또는 아티스트로 검색'
          value={search}
          onChange={e => setSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <SearchIcon sx={{ mr: 1, color: 'action.active', width: '2rem', height: '2rem' }} />
              ),
              sx: {
                fontSize: '1.6rem'
              }
            },
            inputLabel: {
              sx: {
                fontSize: '1.4rem'
              }
            }
          }}
        />

        <FormControl sx={{ width: '25%' }} variant='outlined'>
          <InputLabel>
            <Typography variant='h4'>레벨 선택</Typography>
          </InputLabel>

          <Select
            value={selectedLevel}
            onChange={e => setSelectedLevel(e.target.value as AeryLevel)}
            label='레벨 선택'
            disabled={isFiltering}
          >
            {levels.map(level => (
              <MenuItem key={level} value={level}>
                <Typography variant='h3'>{level}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          sx={{ width: '10%' }}
          variant='outlined'
          color='secondary'
          startIcon={<UploadIcon />}
          onClick={() => fileInputRef.current?.click()}
        >
          <Typography variant='h4'>JSON 추가</Typography>
        </Button>

        <Button
          sx={{ width: '10%' }}
          variant='contained'
          color='primary'
          startIcon={isSubmitting ? <CircularProgress size={20} color='inherit' /> : <SaveIcon />}
          onClick={handleSave}
          disabled={isSubmitting || editCount === 0}
        >
          <Typography variant='h4'>저장 ({editCount})</Typography>
        </Button>
      </Paper>

      <StyledTableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow style={{ display: 'flex' }}>
              <TableCell sx={{ width: '40%' }}>
                <Typography variant='h2' fontWeight={700}>
                  제목
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '22%' }}>
                <Typography variant='h2' fontWeight={700}>
                  아티스트
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '13%' }}>
                <Typography variant='h2' fontWeight={700}>
                  현재 레벨
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '18%' }}>
                <Typography variant='h2' fontWeight={700}>
                  변경할 레벨
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '7%' }} />
            </TableRow>
          </TableHead>

          <TableBody sx={{}}>
            {isFiltering ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 3 }}>
                <CircularProgress size={20} />
                <Typography variant='h4' sx={{ ml: 1 }}>
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
                  <Typography variant='h4'>검색 결과가 없습니다.</Typography>
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
