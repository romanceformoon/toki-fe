import LockIcon from '@mui/icons-material/Lock'
import { Box, Button, CircularProgress, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { useQueryClient } from 'react-query'

export const AdminLogin = () => {
  const queryClient = useQueryClient()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!password || isSubmitting) return

    setIsSubmitting(true)
    setError('')

    try {
      await axios.post('/api/admin/login', { password })
      await queryClient.invalidateQueries(['adminSession'])
    } catch (err) {
      setError('비밀번호가 올바르지 않습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '65vh' }}>
      <Paper
        component='form'
        onSubmit={handleSubmit}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: '38rem',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: '1.4rem'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <LockIcon color='primary' sx={{ width: '2.4rem', height: '2.4rem' }} />
          <Typography variant='h2' fontWeight={700}>
            관리자 로그인
          </Typography>
        </Box>

        <TextField
          type='password'
          label='관리자 비밀번호'
          value={password}
          onChange={e => setPassword(e.target.value)}
          error={!!error}
          helperText={error || ' '}
          autoFocus
          slotProps={{
            input: { sx: { fontSize: '1.6rem' } },
            inputLabel: { sx: { fontSize: '1.4rem' } }
          }}
        />

        <Button
          type='submit'
          variant='contained'
          disabled={isSubmitting || !password}
          startIcon={isSubmitting ? <CircularProgress size={18} color='inherit' /> : undefined}
        >
          <Typography variant='h4'>로그인</Typography>
        </Button>
      </Paper>
    </Box>
  )
}
