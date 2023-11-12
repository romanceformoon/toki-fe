import { Avatar, Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BarChartSkeleton } from "~/components/BarChartSkeleton";
import { yLabels } from "~/const/graphLabels";
import axiosInstance from "~/utils/axiosInstance";

const UserPage = () => {
  const router = useRouter();

  const uid = router.query.uid;

  const [graphData, setGraphData] = useState<IGraphResult>();
  const [userNickname, setUserNickname] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");

  useEffect(() => {
    const getGraph = async () => {
      const response = await axiosInstance.get(
        `/toki-api/analyze/graph/${uid}`
      );
      setGraphData(response.data.graph);
      setUserNickname(response.data.nickname);
      setUserAvatar(response.data.avatar);
    };
    getGraph();
  }, [uid]);

  if (!graphData)
    return (
      <>
        <BarChartSkeleton />
      </>
    );

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ mb: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
            <Avatar
              alt="Profile Image"
              sx={{ height: "70px", width: "70px" }}
              src={`https://cdn.discordapp.com/avatars/${uid}/${userAvatar}.png`}
            />
          </Box>
          <Typography fontSize="24px" fontWeight={700}>
            {userNickname}
          </Typography>
        </Box>
      </Box>

      <BarChart
        sx={{
          mt: 1,
          minWidth: "100%",
          border: 1,
          borderRadius: 5,
        }}
        margin={{ top: 100 }}
        layout="horizontal"
        height={700}
        series={[
          {
            data: Object.values(graphData["FC_COUNT"]),
            label: "Full Combo",
            id: "fc",
            stack: "total",
            color: "#fde1f5",
            stackOffset: "expand",
          },
          {
            data: Object.values(graphData["HARD_COUNT"]),
            label: "Hard Clear",
            id: "hard",
            stack: "total",
            color: "#dd3959",
            stackOffset: "expand",
          },
          {
            data: Object.values(graphData["GROOVE_COUNT"]),
            label: "Groove Clear",
            id: "groove",
            stack: "total",
            color: "#5e99ff",
            stackOffset: "expand",
          },
          {
            data: Object.values(graphData["EASY_COUNT"]),
            label: "Easy Clear",
            id: "easy",
            stack: "total",
            color: "#79e158",
            stackOffset: "expand",
          },
          {
            data: Object.values(graphData["FAILED_COUNT"]),
            label: "Failed",
            id: "failed",
            stack: "total",
            color: "#333333",
            stackOffset: "expand",
          },
          {
            data: Object.values(graphData["NOPLAY_COUNT"]),
            label: "No Play",
            id: "noplay",
            stack: "total",
            color: "#00000000",
            stackOffset: "expand",
          },
        ]}
        yAxis={[
          {
            data: yLabels,
            scaleType: "band",
          },
        ]}
        bottomAxis={null}
      />
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default UserPage;
