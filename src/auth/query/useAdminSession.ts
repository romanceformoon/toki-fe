import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSession = async () => {
  const response = await axios.get<{ admin: boolean }>('/api/admin/session')
  return response.data
}

const useAdminSession = () => {
  return useQuery(['adminSession'], fetchSession, {
    refetchOnWindowFocus: false,
    retry: 0
  })
}

export default useAdminSession
