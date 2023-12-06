import { useQuery } from "react-query";
import axiosInstance from "~/utils/axiosInstance";

const useEXPRankingQuery = () => {
  const query = useQuery(
    ["get-exp-ranking"],
    async () => {
      const response = await axiosInstance.get<
        {
          uid: number;
          exp: number;
          avatar: string;
          nickname: string;
          clearDan: IDan;
        }[]
      >("/toki-api/analyze/ranking");

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

export default useEXPRankingQuery;
