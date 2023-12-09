import { useQuery } from "react-query";
import axiosInstance from "~/utils/axiosInstance";

const useGraphQuery = ({
  uid,
  category,
}: {
  uid: string | string[] | undefined;
  category: string;
}) => {
  const query = useQuery(
    ["get-graph-info", uid, category],
    async () => {
      const response = await axiosInstance.get<IGraph>(
        `/toki-api/user/graph/${category}/${uid}`
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

export default useGraphQuery;
