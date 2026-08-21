import LogoutIcon from '@mui/icons-material/Logout'
import { Box, Button, Tooltip, Typography } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { useQueryClient } from 'react-query'

export const UserMenu = () => {
  const queryClient = useQueryClient()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)
    try {
      await axios.post('/api/admin/logout')
      await queryClient.invalidateQueries(['adminSession'])
    } catch (err) {
      console.error('로그아웃 실패:', err)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <Box sx={{ flexGrow: 0, ml: 2.5 }}>
      <Tooltip title='로그아웃'>
        <Button
          onClick={handleLogout}
          disabled={isLoggingOut}
          sx={{ color: 'white', minWidth: 'auto' }}
          startIcon={<LogoutIcon sx={{ width: '2rem', height: '2rem' }} />}
        >
          <Typography variant='h4'>로그아웃</Typography>
        </Button>
      </Tooltip>
    </Box>
  )
}
