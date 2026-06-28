import { Box, Card, CardContent, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { ClickableText } from '~/components/ClickableText';
import { Seo } from '~/components/Seo';
import { aery7SkillSimulators, aerySkillSimulators } from '~/const/skillSimulator';

type KeyMode = 'aery' | 'aery7';

const danDataMap: Record<KeyMode, IAeryDan> = {
  aery: aerySkillSimulators,
  aery7: aery7SkillSimulators
};

const Skill = () => {
  const [keyMode, setKeyMode] = useState<KeyMode>('aery');

  const danData: IAeryDan = danDataMap[keyMode];

  const handleKeyModeChange = (_event: React.MouseEvent<HTMLElement>, newKeyMode: KeyMode | null) => {
    if (!newKeyMode || newKeyMode === keyMode) return;
    setKeyMode(newKeyMode);
  };

  const dans = Object.keys(danData);

  return (
    <>
      <Seo type='skill' />

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <ToggleButtonGroup value={keyMode} exclusive color='primary' onChange={handleKeyModeChange}>
          <ToggleButton value='aery'>
            <Typography variant='h4'>5KEYS</Typography>
          </ToggleButton>
          <ToggleButton value='aery7'>
            <Typography variant='h4'>7KEYS</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
        <Typography variant='h1' fontWeight={700}>
          [{keyMode === 'aery' ? '5KEYS' : '7KEYS'} AERY] 段位認定
        </Typography>
      </Box>
      {keyMode === 'aery' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Link href='https://naver.me/I5yHVLTA' target='_blank'>
            <Typography variant='h3' fontWeight={700}>
              다운로드
            </Typography>
          </Link>
        </Box>
      )}

      {dans.length === 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Typography variant='h3' fontWeight={600} sx={{ color: 'text.secondary' }}>
            아직 준비 중입니다.
          </Typography>
        </Box>
      )}

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
