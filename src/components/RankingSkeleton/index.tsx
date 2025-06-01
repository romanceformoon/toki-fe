import {
  Avatar,
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';

export const RankingSkeleton = () => {
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
              <TableCell sx={{ width: '15%' }}>
                <Typography
                  variant='h2'
                  fontWeight={700}
                  fontStyle={{ color: 'primary.main' }}
                  textAlign='center'
                >
                  순위
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '35%' }}>
                <Typography variant='h2' fontWeight={700} fontStyle={{ color: 'primary.main' }}>
                  닉네임
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '25%' }}>
                <Typography variant='h2' fontWeight={700} fontStyle={{ color: 'primary.main' }}>
                  레벨
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '25%' }}>
                <Typography variant='h2' fontWeight={700} fontStyle={{ color: 'primary.main' }}>
                  경험치
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 10 }, (_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant='h2' fontWeight={500} align='center'>
                    {index + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      alt='Profile Image'
                      sx={{
                        height: '3.6rem',
                        width: '3.6rem',
                        mr: 2
                      }}
                    />
                    <Skeleton width={120} height={32} />
                  </Box>
                </TableCell>
                <TableCell>
                  <Skeleton width={50} height={32} />
                </TableCell>
                <TableCell>
                  <Skeleton width={100} height={32} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export const RatingRankingSkeleton = () => {
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
              <TableCell sx={{ width: '15%' }}>
                <Typography
                  variant='h2'
                  fontWeight={700}
                  fontStyle={{ color: 'primary.main' }}
                  textAlign='center'
                >
                  순위
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '35%' }}>
                <Typography variant='h2' fontWeight={700} fontStyle={{ color: 'primary.main' }}>
                  닉네임
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '25%' }}>
                <Typography variant='h2' fontWeight={700} fontStyle={{ color: 'primary.main' }}>
                  레벨
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '25%' }}>
                <Typography variant='h2' fontWeight={700} fontStyle={{ color: 'primary.main' }}>
                  레이팅
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 10 }, (_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant='h2' align='center'>
                    {index + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      alt='Profile Image'
                      sx={{
                        height: '3.6rem',
                        width: '3.6rem',
                        mr: 2
                      }}
                    />
                    <Skeleton width={120} height={32} />
                  </Box>
                </TableCell>
                <TableCell>
                  <Skeleton width={50} height={32} />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Skeleton width={70} height={32} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
