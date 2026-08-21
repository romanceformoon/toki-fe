import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import useLoginUser from '~/hooks/useLoginUser'

const PUBLIC_LINKS = [
  { name: '난이도표', link: 'table' },
  { name: '단위인정', link: 'skill' },
  { name: 'BMS 뷰어', link: 'tools/viewer' }
]

export const DesktopRoute = () => {
  const router = useRouter()
  const { admin } = useLoginUser()

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: '1.5rem' }}>
      {PUBLIC_LINKS.map(page => (
        <Button
          key={page.link}
          onClick={() => router.push(`/${page.link}`)}
          sx={{ my: 2, color: 'white' }}
        >
          <Typography variant='h4'>{page.name}</Typography>
        </Button>
      ))}

      {admin ? (
        <Button onClick={() => router.push('/editor')} sx={{ my: 2, color: 'white' }}>
          <Typography variant='h4'>EDITOR</Typography>
        </Button>
      ) : null}
    </Box>
  )
}
