import { useQuery } from 'react-query';
import AeryAPI from '~/api/aery';

/**
 * Aery 테이블 데이터를 가져오는 React Query 훅
 * @returns React Query 결과 (tableData, isLoading, isError 등)
 */
const useAeryTableDataQuery = () => {
  return useQuery(
    ['table-data', 'aery'], // 쿼리 키
    async () => {
      const data = await AeryAPI.fetchTableData();
      return data;
    },
    {
      staleTime: 1000 * 60 * 60, // 1시간 동안 데이터 캐싱
      cacheTime: 1000 * 60 * 60 * 2, // 2시간 동안 캐시 유지
      refetchOnMount: true,
      refetchOnWindowFocus: false
    }
  );
};

export default useAeryTableDataQuery;
