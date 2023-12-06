import { useQuery } from "react-query";
import axiosInstance from "~/utils/axiosInstance";

const useRatingRankingQuery = () => {
  const query = useQuery(
    ["get-rating-ranking"],
    async () => {
      const response = await axiosInstance.get<
        {
          uid: number;
          exp: number;
          rating: number;
          avatar: string;
          nickname: string;
          clearDan: IDan;
        }[]
      >("/toki-api/analyze/rating-ranking");

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

export default useRatingRankingQuery;
