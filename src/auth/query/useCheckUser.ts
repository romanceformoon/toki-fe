import { useQuery } from 'react-query';
import authToken from '~/auth';
import axiosInstance from '~/utils/axiosInstance';

const checkUser = () => {
  return axiosInstance.get<{ user: IUser }>('/toki-api/auth/user/check-user');
};

const useCheckUser = ({
  isRefreshed,
  setIsRefreshed
}: {
  isRefreshed: boolean;
  setIsRefreshed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const query = useQuery(['checkUser'], checkUser, {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: 0,
    onError: async () => {
      authToken.setToken('');
    },
    onSuccess: () => {
      setIsRefreshed(false);
    },
    enabled: !!isRefreshed
  });

  return query;
};

export default useCheckUser;
