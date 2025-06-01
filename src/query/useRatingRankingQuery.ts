import { useQuery } from 'react-query';
import axiosInstance from '~/utils/axiosInstance';

const useRatingRankingQuery = ({ category }: { category: string }) => {
  const query = useQuery(['get-rating-ranking', category], async () => {
    const response = await axiosInstance.get<RatingRankingUser[]>(
      `/toki-api/ranking/rating/${category}`
    );

    return response.data;
  });

  return query;
};

export default useRatingRankingQuery;
