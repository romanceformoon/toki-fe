import InfoIcon from '@mui/icons-material/Info'
import { TabList } from '@mui/lab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import {
  Avatar,
  Box,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tooltip,
  Typography
} from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { RankingSkeleton } from '~/components/RankingSkeleton'
import { RatingText } from '~/components/RatingText'
import { Seo } from '~/components/Seo'
import { UserNickname } from '~/components/UserNickname'
import useEXPRankingQuery from '~/query/useEXPRankingQuery'
import useRatingRankingQuery from '~/query/useRatingRankingQuery'
import { getLevel } from '~/utils/exp'
import { getRating } from '~/utils/rating'

const Ranking = () => {
  const router = useRouter()

  const [category, setCategory] = useState<string>('aery')
  const handleCategoryChange = (event: React.SyntheticEvent, newValue: string) => {
    setCategory(newValue)
  }

  const [tab, setTab] = useState<string>('EXP')
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue)
  }

  const {
    data: ranking,
    isLoading: isExpRankingLoading,
    isError: isExpError
  } = useEXPRankingQuery({ category })

  const {
    data: ratingRanking,
    isLoading: isRatingRankingLoading,
    isError: isRatingError
  } = useRatingRankingQuery({ category })

  if (
    !ranking ||
    !ratingRanking ||
    isExpRankingLoading ||
    isExpError ||
    isRatingRankingLoading ||
    isRatingError
  )
    return (
      <>
        <Seo type='ranking' />

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
          <Tabs
            variant='scrollable'
            scrollButtons='auto'
            allowScrollButtonsMobile
            value={category}
            onChange={handleCategoryChange}
          >
            <Tab sx={{ fontWeight: 700 }} label='5KEYS AERY' value='aery' />
            <Tab sx={{ fontWeight: 700 }} label='発狂BMS' value='insane' />
            <Tab sx={{ fontWeight: 700 }} label='Satellite' value='sl' />
            <Tab sx={{ fontWeight: 700 }} label='Stella' value='st' />
          </Tabs>
        </Box>
        <TabContext value={tab}>
          <TabList onChange={handleTabChange} variant='fullWidth' centered>
            <Tab sx={{ fontWeight: 700, fontSize: 20 }} label='경험치 랭킹' value='EXP' />
            <Tab sx={{ fontWeight: 700, fontSize: 20 }} label='레이팅 랭킹' value='Rating' />
          </TabList>
          <Box sx={{ display: 'flex' }}>
            <TabPanel value='EXP' sx={{ width: '100%' }}>
              <RankingSkeleton />
            </TabPanel>
            <TabPanel value='Rating' sx={{ width: '100%' }}>
              <RankingSkeleton />
            </TabPanel>
          </Box>
        </TabContext>
      </>
    )

  if (ranking || ratingRanking)
    return (
      <>
        <Seo type='ranking' />

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
          <Tabs
            variant='scrollable'
            scrollButtons='auto'
            allowScrollButtonsMobile
            value={category}
            onChange={handleCategoryChange}
          >
            <Tab sx={{ fontWeight: 700 }} label='5KEYS AERY' value='aery' />
            <Tab sx={{ fontWeight: 700 }} label='発狂BMS' value='insane' />
            <Tab sx={{ fontWeight: 700 }} label='Satellite' value='sl' />
            <Tab sx={{ fontWeight: 700 }} label='Stella' value='st' />
          </Tabs>
        </Box>

        <TabContext value={tab}>
          <TabList onChange={handleTabChange} variant='fullWidth' centered>
            <Tab sx={{ fontWeight: 700, fontSize: 20 }} label='경험치 랭킹' value='EXP' />
            <Tab sx={{ fontWeight: 700, fontSize: 20 }} label='레이팅 랭킹' value='Rating' />
          </TabList>
          <Box sx={{ display: 'flex' }}>
            <TabPanel value='EXP' sx={{ width: '100%' }}>
              <TableContainer
                sx={{
                  border: 1,
                  borderRadius: '13px',
                  borderColor: 'primary.main'
                }}
                component={Paper}
              >
                <Table sx={{ minWidth: '100%' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: '15%' }}>
                        <Typography
                          fontSize='24px'
                          fontWeight='900'
                          fontStyle={{ color: 'primary.main' }}
                          textAlign='center'
                        >
                          순위
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ width: '35%' }}>
                        <Typography
                          fontSize='24px'
                          fontWeight='900'
                          fontStyle={{ color: 'primary.main' }}
                        >
                          닉네임
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ width: '25%' }}>
                        <Typography
                          fontSize='24px'
                          fontWeight='900'
                          fontStyle={{ color: 'primary.main' }}
                        >
                          레벨
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ width: '25%' }}>
                        <Typography
                          fontSize='24px'
                          fontWeight='900'
                          fontStyle={{ color: 'primary.main' }}
                        >
                          경험치
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ranking?.map((data, idx) => {
                      return (
                        <>
                          <TableRow key={data.uid}>
                            <TableCell>
                              <Typography fontSize='24px' fontWeight='500' align='center'>
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
                                <Box>
                                  <Avatar
                                    alt='Profile Image'
                                    sx={{
                                      height: '50px',
                                      width: '50px',
                                      mr: 2
                                    }}
                                    src={
                                      data.avatar
                                        ? `https://cdn.discordapp.com/avatars/${data.uid}/${data.avatar}`
                                        : undefined
                                    }
                                  />
                                </Box>
                                <Box
                                  sx={{
                                    padding: '4px 0'
                                  }}
                                >
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
                              <Typography fontSize='24px' fontWeight='500'>
                                {getLevel(data.exp).toFixed(0)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography fontSize='24px' fontWeight='500'>
                                {data.exp.toLocaleString()}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value='Rating' sx={{ width: '100%' }}>
              <TableContainer
                sx={{
                  border: 1,
                  borderRadius: '13px',
                  borderColor: 'primary.main'
                }}
                component={Paper}
              >
                <Table sx={{ minWidth: '100%' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: '15%' }}>
                        <Typography
                          fontSize='24px'
                          fontWeight='900'
                          fontStyle={{ color: 'primary.main' }}
                          textAlign='center'
                        >
                          순위
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ width: '35%' }}>
                        <Typography
                          fontSize='24px'
                          fontWeight='900'
                          fontStyle={{ color: 'primary.main' }}
                        >
                          닉네임
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ width: '25%' }}>
                        <Typography
                          fontSize='24px'
                          fontWeight='900'
                          fontStyle={{ color: 'primary.main' }}
                        >
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
                          <Typography
                            fontSize='24px'
                            fontWeight='900'
                            fontStyle={{ color: 'primary.main' }}
                          >
                            레이팅
                          </Typography>
                          {category === 'aery' ? (
                            <Tooltip
                              title='N 레벨까지의 모든 곡을 FULL COMBO 없이 HARD CLEAR 했을 때의 레이팅을 N.000으로 정의한다.'
                              arrow
                            >
                              <InfoIcon sx={{ ml: '0.2rem' }} />
                            </Tooltip>
                          ) : null}
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ratingRanking?.map((data, idx) => {
                      return (
                        <>
                          <TableRow key={data.uid}>
                            <TableCell>
                              <Typography fontSize='24px' fontWeight='500' align='center'>
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
                                <Box>
                                  <Avatar
                                    alt='Profile Image'
                                    sx={{
                                      height: '50px',
                                      width: '50px',
                                      mr: 2
                                    }}
                                    src={
                                      data.avatar
                                        ? `https://cdn.discordapp.com/avatars/${data.uid}/${data.avatar}`
                                        : undefined
                                    }
                                  />
                                </Box>
                                <Box
                                  sx={{
                                    padding: '4px 0'
                                  }}
                                >
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
                              <Typography fontSize='24px' fontWeight='500'>
                                {getLevel(data.exp).toFixed(0)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box
                                sx={{
                                  display: 'flex',
                                  position: 'relative',
                                  letterSpacing: '1.2px'
                                }}
                              >
                                <RatingText rating={getRating(data.rating, category)} />
                              </Box>
                            </TableCell>
                          </TableRow>
                        </>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          </Box>
        </TabContext>
      </>
    )
}

export async function getServerSideProps() {
  return {
    props: {}
  }
}

export default Ranking
