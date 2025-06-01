import InfoIcon from '@mui/icons-material/Info';
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
  Tooltip,
  Typography
} from '@mui/material';
import { useRouter } from 'next/router';
import { RatingText } from '~/components/RatingText';
import { UserNickname } from '~/components/UserNickname';
import { getLevel } from '~/utils/exp';
import { getRating } from '~/utils/rating';

interface RatingRankingProps {
  ratingRanking: RatingRankingUser[];
  category: string;
  tableData?: any;
}

export const RatingRanking = ({ ratingRanking, category, tableData }: RatingRankingProps) => {
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
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant='h2' fontWeight={700} fontStyle={{ color: 'primary.main' }}>
                  레이팅
                </Typography>
                {category === 'aery' ? (
                  <Tooltip
                    title='N 레벨까지의 모든 곡을 FULL COMBO 없이 HARD CLEAR 했을 때의 레이팅을 N.000으로 정의한다.'
                    arrow
                  >
                    <InfoIcon sx={{ ml: '0.75rem' }} />
                  </Tooltip>
                ) : null}
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {ratingRanking.map((data, idx) => (
            <TableRow key={data.uid}>
              <TableCell>
                <Typography variant='h2' align='center'>
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
                <Box
                  sx={{
                    display: 'flex',
                    position: 'relative',
                    letterSpacing: '1.2px'
                  }}
                >
                  <RatingText
                    rating={
                      category === 'aery' && tableData ? getRating(data.rating, tableData) : '-'
                    }
                  />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
