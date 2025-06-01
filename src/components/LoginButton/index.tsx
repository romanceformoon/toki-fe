import PersonIcon from '@mui/icons-material/Person';
import { Button, Tooltip } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

export const LoginButton = () => {
  const router = useRouter();
  return (
    <Button
      variant='text'
      component='label'
      sx={{ borderRadius: 10, color: '#ffffff' }}
      onClick={async () => {
        const response = await axios.get('/toki-api/auth/discord/oauth-url');
        router.push(response.data.oauth_url);
      }}
    >
      <Tooltip title='로그인'>
        <PersonIcon sx={{ width: '2.4rem', height: '2.4rem' }} />
      </Tooltip>
    </Button>
  );
};
