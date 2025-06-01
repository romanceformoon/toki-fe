import { Avatar, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export const Logo = () => {
  const router = useRouter();

  return (
    <Button
      sx={{
        color: 'white',
        display: { xs: 'none', md: 'flex' }
      }}
      onClick={() => {
        router.push('/');
      }}
    >
      <Avatar
        sx={{
          mr: '1rem',
          '&:hover': {
            cursor: 'pointer'
          }
        }}
        alt='logo'
        src='/assets/images/logo.png'
      />

      <Typography
        variant='h1'
        noWrap
        sx={{
          mr: 2,
          fontWeight: 700,
          letterSpacing: '0.5rem',
          color: 'inherit',
          textDecoration: 'none',
          '&:hover': {
            cursor: 'pointer'
          }
        }}
      >
        TOKI
      </Typography>
    </Button>
  );
};
