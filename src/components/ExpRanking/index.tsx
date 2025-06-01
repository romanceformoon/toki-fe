import {
  Avatar,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { useRouter } from 'next/router';
import { UserNickname } from '~/components/UserNickname';
import { getLevel } from '~/utils/exp';

interface ExpRankingProps {
  ranking: RankingUser[];
}

export const ExpRanking = ({ ranking }: ExpRankingProps) => {
  const router = useRouter();

  return (
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
          {ranking.map((data, idx) => (
            <TableRow key={data.uid}>
              <TableCell>
                <Typography variant='h2' fontWeight={500} align='center'>
                  {idx + 1}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    width: '10%',
                    display: 'flex'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      alt='Profile Image'
                      sx={{
                        height: '3.6rem',
                        width: '3.6rem',
                        mr: 2
                      }}
                      src={
                        data.avatar
                          ? `https://cdn.discordapp.com/avatars/${data.uid}/${data.avatar}`
                          : undefined
                      }
                    />

                    <UserNickname
                      clearDan={data.clearDan}
                      onClick={() => router.push(`/user/${data.uid}`)}
                    >
                      {data.nickname}
                    </UserNickname>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant='h2'>{getLevel(data.exp).toFixed(0)}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h2'>{data.exp.toLocaleString()}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
