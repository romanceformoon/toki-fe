import { Avatar, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export const Logo = () => {
  const router = useRouter()

  return (
    <Button
      sx={{
        color: 'white',
        display: { xs: 'none', md: 'flex' }
      }}
      onClick={() => {
        router.push('/')
      }}
    >
      <Avatar
        sx={{
          mr: '0.6rem',
          '&:hover': {
            cursor: 'pointer'
          }
        }}
        alt='logo'
        src='/assets/images/logo.png'
      />

      <Typography
        variant='h6'
        noWrap
        sx={{
          mr: 2,
          fontWeight: 700,
          letterSpacing: '.3rem',
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
  )
}
