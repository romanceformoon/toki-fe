import { useState } from 'react'
import { useQuery } from 'react-query'
import authToken from '~/auth'
import axiosInstance from '~/utils/axiosInstance'

const refresh = () => {
  return axiosInstance.get('/toki-api/auth/user/refresh')
}

const useSilentRefresh = ({
  setIsRefreshed
}: {
  setIsRefreshed: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [refreshStop, setRefreshStop] = useState(false)

  useQuery(['silentRefresh'], refresh, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 0,
    refetchInterval: refreshStop ? false : 58 * 60 * 1000,
    refetchIntervalInBackground: true,
    onError: () => {
      setRefreshStop(true)
      authToken.setToken('')
    },
    onSuccess: data => {
      const token = data?.data?.accessToken
      if (token) authToken.setToken(token)
    },
    onSettled: () => {
      setIsRefreshed(true)
    }
  })

  return
}

export default useSilentRefresh
