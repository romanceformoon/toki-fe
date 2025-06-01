import { useQuery } from 'react-query';
import axiosInstance from '~/utils/axiosInstance';

const useEXPRankingQuery = ({ category }: { category: string }) => {
  const query = useQuery(['get-exp-ranking', category], async () => {
    const response = await axiosInstance.get<RankingUser[]>(`/toki-api/ranking/exp/${category}`);

    return response.data;
  });

  return query;
};

export default useEXPRankingQuery;
