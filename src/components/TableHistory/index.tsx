import ImportExportIcon from '@mui/icons-material/ImportExport';
import LinkIcon from '@mui/icons-material/Link';
import {
  Box,
  IconButton,
  Paper,
  SelectChangeEvent,
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
import { convertClearToNumber } from '~/utils/convertClearToNumber';
import { ClickableText } from '../ClickableText';
import { SelectLevel } from '../SelectLevel';

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
  selectedLevel: string;
  handleLevelChange: (event: SelectChangeEvent) => void;
  historyData: IHistory;
}

export const TableHistory = ({ selectedLevel, handleLevelChange, historyData }: IHistoryProps) => {
  const [songList, setSongList] = useState<IHistorySelectedLevel[]>([]);

  const [isDesc, setIsDesc] = useState<IHistorySortedDesc>({
    title: false,
    clear: false,
    exp: false,
    bp: false,
    rate: false,
    md5: false
  });

  const ascTitle = useCallback(() => {
    setSongList((prevState: IHistorySelectedLevel[]) => {
      const newArray = prevState.sort((a: IHistorySelectedLevel, b: IHistorySelectedLevel) => {
        return a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1;
      });
      return [...newArray];
    });
    setIsDesc((prevState: IHistorySortedDesc) => {
      prevState.title = false;
      return { ...prevState };
    });
  }, []);

  const descTitle = useCallback(() => {
    setSongList((prevState: IHistorySelectedLevel[]) => {
      const newArray = prevState.sort((a: IHistorySelectedLevel, b: IHistorySelectedLevel) => {
        return a.title.toUpperCase() > b.title.toUpperCase() ? -1 : 1;
      });
      return [...newArray];
    });
    setIsDesc((prevState: IHistorySortedDesc) => {
      prevState.title = true;
      return { ...prevState };
    });
  }, []);

  const ascClear = useCallback(() => {
    setSongList((prevState: IHistorySelectedLevel[]) => {
      const newArray = prevState.sort((a: IHistorySelectedLevel, b: IHistorySelectedLevel) => {
        return convertClearToNumber(a.clear) > convertClearToNumber(b.clear) ? 1 : -1;
      });
      return [...newArray];
    });
    setIsDesc((prevState: IHistorySortedDesc) => {
      prevState.clear = false;
      return { ...prevState };
    });
  }, []);

  const descClear = useCallback(() => {
    setSongList((prevState: IHistorySelectedLevel[]) => {
      const newArray = prevState.sort((a: IHistorySelectedLevel, b: IHistorySelectedLevel) => {
        return convertClearToNumber(a.clear) > convertClearToNumber(b.clear) ? -1 : 1;
      });
      return [...newArray];
    });
    setIsDesc((prevState: IHistorySortedDesc) => {
      prevState.clear = true;
      return { ...prevState };
    });
  }, []);

  const ascBP = useCallback(() => {
    setSongList((prevState: IHistorySelectedLevel[]) => {
      const newArray = prevState.sort((a: IHistorySelectedLevel, b: IHistorySelectedLevel) => {
        return a.bp > b.bp ? 1 : -1;
      });
      return [...newArray];
    });
    setIsDesc((prevState: IHistorySortedDesc) => {
      prevState.bp = false;
      return { ...prevState };
    });
  }, []);

  const descBP = useCallback(() => {
    setSongList((prevState: IHistorySelectedLevel[]) => {
      const newArray = prevState.sort((a: IHistorySelectedLevel, b: IHistorySelectedLevel) => {
        return a.bp > b.bp ? -1 : 1;
      });
      return [...newArray];
    });
    setIsDesc((prevState: IHistorySortedDesc) => {
      prevState.bp = true;
      return { ...prevState };
    });
  }, []);

  const ascRate = useCallback(() => {
    setSongList((prevState: IHistorySelectedLevel[]) => {
      const newArray = prevState.sort((a: IHistorySelectedLevel, b: IHistorySelectedLevel) => {
        return a.rate > b.rate ? 1 : -1;
      });
      return [...newArray];
    });
    setIsDesc((prevState: IHistorySortedDesc) => {
      prevState.rate = false;
      return { ...prevState };
    });
  }, []);

  const descRate = useCallback(() => {
    setSongList((prevState: IHistorySelectedLevel[]) => {
      const newArray = prevState.sort((a: IHistorySelectedLevel, b: IHistorySelectedLevel) => {
        return a.rate > b.rate ? -1 : 1;
      });
      return [...newArray];
    });
    setIsDesc((prevState: IHistorySortedDesc) => {
      prevState.rate = true;
      return { ...prevState };
    });
  }, []);

  const ascExp = useCallback(() => {
    setSongList((prevState: IHistorySelectedLevel[]) => {
      const newArray = prevState.sort((a: IHistorySelectedLevel, b: IHistorySelectedLevel) => {
        return a.exp > b.exp ? 1 : -1;
      });
      return [...newArray];
    });
    setIsDesc((prevState: IHistorySortedDesc) => {
      prevState.exp = false;
      return { ...prevState };
    });
  }, []);

  const descExp = useCallback(() => {
    setSongList((prevState: IHistorySelectedLevel[]) => {
      const newArray = prevState.sort((a: IHistorySelectedLevel, b: IHistorySelectedLevel) => {
        return a.exp > b.exp ? -1 : 1;
      });
      return [...newArray];
    });
    setIsDesc((prevState: IHistorySortedDesc) => {
      prevState.exp = true;
      return { ...prevState };
    });
  }, []);

  useEffect(() => {
    setSongList(historyData[selectedLevel]);
    ascTitle();
  }, [ascTitle, historyData, selectedLevel]);

  if (!historyData) return <></>;
  if (!songList) return <></>;

  return (
    <>
      <SelectLevel
        selectedLevel={selectedLevel}
        handleChange={handleLevelChange}
        tableData={historyData}
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

              <TableCell sx={{ width: '30%' }}>
                <ClickableText
                  onClick={() => {
                    if (isDesc.title) ascTitle();
                    else descTitle();
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant='h2' fontWeight={700}>
                      Title
                    </Typography>
                    <ImportExportIcon sx={{ width: '2.0rem', height: '2.0rem' }} />
                  </Box>
                </ClickableText>
              </TableCell>

              <TableCell sx={{ width: '20%' }}>
                <ClickableText
                  onClick={() => {
                    if (isDesc.clear) ascClear();
                    else descClear();
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant='h2' fontWeight={700}>
                      Clear
                    </Typography>
                    <ImportExportIcon sx={{ width: '2.0rem', height: '2.0rem' }} />
                  </Box>
                </ClickableText>
              </TableCell>
              <TableCell sx={{ width: '10%' }}>
                <ClickableText
                  onClick={() => {
                    if (isDesc.bp) ascBP();
                    else descBP();
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant='h2' fontWeight={700}>
                      BP
                    </Typography>
                    <ImportExportIcon sx={{ width: '2.0rem', height: '2.0rem' }} />
                  </Box>
                </ClickableText>
              </TableCell>

              <TableCell sx={{ width: '10%' }}>
                <ClickableText
                  onClick={() => {
                    if (isDesc.rate) ascRate();
                    else descRate();
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant='h2' fontWeight={700}>
                      Rate
                    </Typography>
                    <ImportExportIcon sx={{ width: '2.0rem', height: '2.0rem' }} />
                  </Box>
                </ClickableText>
              </TableCell>

              <TableCell sx={{ width: '10%' }}>
                <ClickableText
                  onClick={() => {
                    if (isDesc.exp) ascExp();
                    else descExp();
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant='h2' fontWeight={700}>
                      EXP
                    </Typography>
                    <ImportExportIcon sx={{ width: '2.0rem', height: '2.0rem' }} />
                  </Box>
                </ClickableText>
              </TableCell>

              <TableCell sx={{ width: '10%' }}>
                <Typography variant='h2' fontWeight={700} textAlign='center'>
                  LR2IR
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {songList.map((data, idx) => {
              return (
                <>
                  <TableRow sx={{ backgroundColor: colorPick(data.clear) }}>
                    <TableCell>
                      <Typography variant='h3' align='center'>
                        {selectedLevel}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='h3' sx={{ maxWidth: 500, wordWrap: 'break-word' }}>
                        {data.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='h3'>{data.clear}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='h3'>{data.bp}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='h3'>{data.rate}%</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='h3'>{data.exp.toFixed(2)}</Typography>
                    </TableCell>
                    <TableCell key={data.md5} align='center'>
                      <Link
                        href={`http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=${data.md5}`}
                        target='_blank'
                      >
                        <IconButton>
                          <LinkIcon sx={{ width: '2.0rem', height: '2.0rem' }} />
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
