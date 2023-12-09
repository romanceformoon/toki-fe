import { useQuery } from "react-query";
import axiosInstance from "~/utils/axiosInstance";

const useRatingRankingQuery = ({ category }: { category: string }) => {
  const query = useQuery(
    ["get-rating-ranking", category],
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
      >(`/toki-api/ranking/rating/${category}`);

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
