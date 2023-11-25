import { useQuery } from "react-query";
import axiosInstance from "~/utils/axiosInstance";

const useGraphQuery = ({ uid }: { uid: string | string[] | undefined }) => {
  const query = useQuery(
    ["get-graph-info", uid],
    async () => {
      const response = await axiosInstance.get<IGraph>(
        `/toki-api/analyze/user/graph/${uid}`
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

export default useGraphQuery;
