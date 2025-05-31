import MenuIcon from '@mui/icons-material/Menu'
import { Avatar, Box, Button, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const MobileMenu = () => {
  const pages = [
    { name: 'Analyze', link: 'analyze' },
    { name: 'Ranking', link: 'ranking' },
    { name: '5KEYS AERY' },
    { name: '난이도표', link: 'table' },
    { name: '단위인정', link: 'skill' },
    // { name: '서열표', link: 'grade' },
    { name: 'TOOLS' },
    { name: 'BMS 채보 뷰어', link: 'tools/viewer' }
  ]

  const router = useRouter()

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      {/* 모바일 메뉴 버튼 */}
      <IconButton
        size='large'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleOpenNavMenu}
        color='inherit'
      >
        <MenuIcon />
      </IconButton>

      {/* 모바일 링크 */}
      <Menu
        id='menu-appbar'
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' }
        }}
        MenuListProps={{
          style: {
            maxHeight: '15rem',
            width: '20ch'
          }
        }}
      >
        {pages.map(page => {
          if (page.link) {
            return (
              <MenuItem
                key={page.name}
                onClick={() => {
                  handleCloseNavMenu()
                  router.push(`/${page.link}`)
                }}
              >
                {page.name}
              </MenuItem>
            )
          } else {
            return (
              <Divider key={page.name} sx={{ my: 0.5 }}>
                <Typography
                  fontSize='12px'
                  fontWeight={500}
                  sx={{
                    color: 'grey'
                  }}
                >
                  {page.name}
                </Typography>
              </Divider>
            )
          }
        })}
      </Menu>
      <Button
        sx={{
          color: 'white',
          display: { xs: 'flex' }
        }}
        onClick={() => {
          router.push('/')
        }}
      >
        <Avatar
          sx={{
            mr: '0.6rem',
            justifyContent: 'center',
            '&:hover': {
              cursor: 'pointer'
            }
          }}
          alt='logo'
          src='/assets/images/logo.png'
        />
      </Button>
    </Box>
  )
}
