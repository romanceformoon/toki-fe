import { useQuery } from "react-query";
import axiosInstance from "~/utils/axiosInstance";

const useHistoryQuery = ({ uid }: { uid: string | string[] | undefined }) => {
  const query = useQuery(
    ["get-history-info", uid],
    async () => {
      const response = await axiosInstance.get<IHistory>(
        `/toki-api/analyze/user/history/${uid}`
      );

      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  return query;
};

export default useHistoryQuery;
