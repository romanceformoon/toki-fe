import { useQuery } from "react-query";
import axiosInstance from "~/utils/axiosInstance";

const useUserInfoQuery = ({
  uid,
  category,
}: {
  uid: string | string[] | undefined;
  category: string;
}) => {
  const query = useQuery(
    ["get-user-info", uid, category],
    async () => {
      const response = await axiosInstance.get<IUserGameInfo>(
        `/toki-api/user/${category}/${uid}`
      );

      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      keepPreviousData: true,
    }
  );

  return query;
};

export default useUserInfoQuery;
