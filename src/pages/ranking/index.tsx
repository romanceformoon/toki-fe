import { TabList } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { ExpRanking } from '~/components/ExpRanking';
import { RankingSkeleton, RatingRankingSkeleton } from '~/components/RankingSkeleton';
import { RatingRanking } from '~/components/RatingRanking';
import { Seo } from '~/components/Seo';
import useAeryTableDataQuery from '~/query/useAeryTableDataQuery';
import useEXPRankingQuery from '~/query/useEXPRankingQuery';
import useRatingRankingQuery from '~/query/useRatingRankingQuery';

const Ranking = () => {
  const [category, setCategory] = useState<string>('aery');
  const handleCategoryChange = (event: React.SyntheticEvent, newValue: string) => {
    setCategory(newValue);
  };

  const [tab, setTab] = useState<string>('EXP');
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const {
    data: ranking,
    isLoading: isExpRankingLoading,
    isError: isExpError
  } = useEXPRankingQuery({ category });

  const {
    data: ratingRanking,
    isLoading: isRatingRankingLoading,
    isError: isRatingError
  } = useRatingRankingQuery({ category });

  const {
    data: tableData,
    isLoading: isTableDataLoading,
    isError: isTableDataError
  } = useAeryTableDataQuery();

  if (isTableDataError) {
    return <>Error</>;
  }

  if (
    !ranking ||
    !ratingRanking ||
    isExpRankingLoading ||
    isExpError ||
    isRatingRankingLoading ||
    isRatingError ||
    (category === 'aery' && (isTableDataLoading || !tableData))
  ) {
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
            <Tab sx={{ fontSize: '1.4rem', fontWeight: 700 }} label='5KEYS AERY' value='aery' />
            <Tab sx={{ fontSize: '1.4rem', fontWeight: 700 }} label='発狂BMS' value='insane' />
            <Tab sx={{ fontSize: '1.4rem', fontWeight: 700 }} label='Satellite' value='sl' />
            <Tab sx={{ fontSize: '1.4rem', fontWeight: 700 }} label='Stella' value='st' />
          </Tabs>
        </Box>

        <TabContext value={tab}>
          <TabList onChange={handleTabChange} variant='fullWidth' centered>
            <Tab sx={{ fontSize: '1.8rem', fontWeight: 700 }} label='경험치 랭킹' value='EXP' />
            <Tab sx={{ fontSize: '1.8rem', fontWeight: 700 }} label='레이팅 랭킹' value='Rating' />
          </TabList>
          <Box sx={{ display: 'flex' }}>
            <TabPanel value='EXP' sx={{ width: '100%' }}>
              <RankingSkeleton />
            </TabPanel>
            <TabPanel value='Rating' sx={{ width: '100%' }}>
              <RatingRankingSkeleton />
            </TabPanel>
          </Box>
        </TabContext>
      </>
    );
  }

  if (ranking || ratingRanking) {
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
            <Tab sx={{ fontSize: '1.4rem', fontWeight: 700 }} label='5KEYS AERY' value='aery' />
            <Tab sx={{ fontSize: '1.4rem', fontWeight: 700 }} label='発狂BMS' value='insane' />
            <Tab sx={{ fontSize: '1.4rem', fontWeight: 700 }} label='Satellite' value='sl' />
            <Tab sx={{ fontSize: '1.4rem', fontWeight: 700 }} label='Stella' value='st' />
          </Tabs>
        </Box>

        <TabContext value={tab}>
          <TabList onChange={handleTabChange} variant='fullWidth' centered>
            <Tab sx={{ fontSize: '1.8rem', fontWeight: 700 }} label='경험치 랭킹' value='EXP' />
            <Tab sx={{ fontSize: '1.8rem', fontWeight: 700 }} label='레이팅 랭킹' value='Rating' />
          </TabList>
          <Box sx={{ display: 'flex' }}>
            <TabPanel value='EXP' sx={{ width: '100%' }}>
              <ExpRanking ranking={ranking} />
            </TabPanel>
            <TabPanel value='Rating' sx={{ width: '100%' }}>
              <RatingRanking
                ratingRanking={ratingRanking}
                category={category}
                tableData={tableData}
              />
            </TabPanel>
          </Box>
        </TabContext>
      </>
    );
  }
};

export async function getServerSideProps() {
  return {
    props: {}
  };
}

export default Ranking;
