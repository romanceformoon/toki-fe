import { useQuery } from "react-query";
import axiosInstance from "~/utils/axiosInstance";

const useHistoryQuery = ({
  uid,
  category,
}: {
  uid: string | string[] | undefined;
  category: string;
}) => {
  const query = useQuery(["get-history-info", uid, category], async () => {
    const response = await axiosInstance.get<IHistory>(
      `/toki-api/user/history/${category}/${uid}`
    );

    return response.data;
  });

  return query;
};

export default useHistoryQuery;
