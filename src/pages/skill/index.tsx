import { Box, Card, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import { ClickableText } from '~/components/ClickableText';
import { Seo } from '~/components/Seo';
import { aerySkillSimulators } from '~/const/skillSimulator';

const Skill = () => {
  const danData: IAeryDan = aerySkillSimulators;

  return (
    <>
      <Seo type='skill' />

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
        <Typography variant='h1' fontWeight={700}>
          [5KEYS AERY] 段位認定
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Link href='https://naver.me/I5yHVLTA' target='_blank'>
          <Typography variant='h3' fontWeight={700}>
            다운로드
          </Typography>
        </Link>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {Object.keys(danData).map((dan, idx) => (
          <>
            <Card
              sx={{
                width: '60rem',
                mb: 3
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', width: '100%' }}>
                  <Link
                    href={`http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=${danData[dan]['hash']}`}
                    style={{ textDecoration: 'none' }}
                    target='_blank'
                  >
                    <ClickableText>
                      <Typography
                        variant='h2'
                        fontWeight={700}
                        sx={{
                          mb: 1.5,
                          color: danData[dan]['color'],
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {dan}
                      </Typography>
                    </ClickableText>
                  </Link>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant='h4'>{danData[dan]['list'][0]}</Typography>
                  <Typography variant='h4'>{danData[dan]['list'][1]}</Typography>
                  <Typography variant='h4'>{danData[dan]['list'][2]}</Typography>
                  <Typography variant='h4'>{danData[dan]['list'][3]}</Typography>
                </Box>
              </CardContent>
            </Card>
          </>
        ))}
      </Box>
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {}
  };
}

export default Skill;
