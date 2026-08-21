import MenuIcon from '@mui/icons-material/Menu'
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useLoginUser from '~/hooks/useLoginUser'

const PUBLIC_LINKS = [
  { name: '난이도표', link: 'table' },
  { name: '단위인정', link: 'skill' },
  { name: 'BMS 채보 뷰어', link: 'tools/viewer' }
]

export const MobileMenu = () => {
  const router = useRouter()
  const { admin } = useLoginUser()

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const links = admin
    ? [...PUBLIC_LINKS, { name: 'EDITOR', link: 'editor' }]
    : PUBLIC_LINKS

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size='large'
        aria-label='navigation menu'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleOpenNavMenu}
        color='inherit'
      >
        <MenuIcon sx={{ width: '2.4rem', height: '2.4rem' }} />
      </IconButton>

      <Menu
        id='menu-appbar'
        anchorEl={anchorElNav}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {links.map(page => (
          <MenuItem
            key={page.link}
            onClick={() => {
              handleCloseNavMenu()
              router.push(`/${page.link}`)
            }}
          >
            <Typography variant='h4'>{page.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
