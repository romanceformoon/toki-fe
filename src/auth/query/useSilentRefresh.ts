import { useState } from "react";
import { useQuery } from "react-query";
import authToken from "~/auth";
import axiosInstance from "~/utils/axiosInstance";

const refresh = async () => {
  return await axiosInstance.get("/toki-api/auth/user/refresh");
};

const useSilentRefresh = () => {
  const [refreshStop, setRefreshStop] = useState(false);

  useQuery(["silentRefresh"], refresh, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 0,
    refetchInterval: refreshStop ? false : 58 * 60 * 1000, // 1시간 인 상황
    refetchIntervalInBackground: true,
    onError: async () => {
      setRefreshStop(true);
      authToken.setToken("");
    },
    onSuccess: (data) => {
      console.log("refresh check");
      const token = data?.data?.accessToken;
      if (token) authToken.setToken(token);
    },
  });

  return;
};

export default useSilentRefresh;
