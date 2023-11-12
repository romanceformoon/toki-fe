import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Button, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useLoginUser from "~/auth/hooks/useLoginUser";
import { BarChartSkeleton } from "~/components/BarChartSkeleton";
import { CommonButton } from "~/components/CommonButton";
import { HeadMeta } from "~/components/HeadMeta";
import { yLabels } from "~/const/graphLabels";
import axiosInstance from "~/utils/axiosInstance";

const LampGraph = () => {
  const router = useRouter();

  const { isLogined, uid } = useLoginUser();

  const [uploadFile, setUploadFile] = useState<File>();
  const [graphData, setGraphData] = useState<IGraphResult>();

  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      const dbFile = e.target.files[0];
      if (dbFile === uploadFile) return;

      const maxSize = 1024 ** 2 * 5; // 1MB * 5

      if (maxSize < dbFile.size) {
        alert("해당 파일은 제한된 용량을 초과하였습니다.");
        router.reload();
        return;
      }

      const formData = new FormData();
      formData.append("db", dbFile);
      const response = await axiosInstance.post(
        `/toki-api/analyze/graph`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setGraphData(response.data);
      setUploadFile(uploadFile);
    }
  };

  useEffect(() => {
    const getGraph = async () => {
      const response = await axiosInstance.get(
        `/toki-api/analyze/graph/${uid}`
      );
      setGraphData(response.data.graph);
    };
    if (isLogined) getGraph();
  }, [isLogined, uid]);

  if (!graphData)
    return (
      <>
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ mb: 1 }}>
            <Typography fontWeight={500}>
              LR2files/Database/Score 경로에 있는
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography fontWeight={700}>.db 확장자 파일</Typography>
              <Typography fontWeight={500}>을 업로드 해주세요.</Typography>
            </Box>
            <Typography fontWeight={500}>
              일반적으로 용량이 제일 큰 파일이 현재 사용 중인 파일입니다.
            </Typography>
          </Box>
          {isLogined ? (
            <CommonButton>
              <input type="file" accept=".db" onChange={onChangeFile} hidden />
              <AddIcon sx={{ mr: 1 }} />
              업로드
            </CommonButton>
          ) : (
            <CommonButton
              onClick={async () => {
                const response = await axios.get(
                  "/toki-api/auth/discord/oauth-url"
                );
                router.push(response.data.oauth_url);
              }}
            >
              <PersonIcon sx={{ mr: 1 }} />
              로그인이 필요합니다.
            </CommonButton>
          )}
        </Box>
        <BarChartSkeleton />
      </>
    );

  return (
    <>
      <HeadMeta
        title="Analyze | Asuma Toki"
        description="BMS Score Analyze"
        url="https://asumatoki.kr/analyze"
        image="/assets/images/logo.png"
      />

      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ mb: 1 }}>
          <Typography fontWeight={500}>
            LR2files/Database/Score 경로에 있는
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography fontWeight={700}>.db 확장자 파일</Typography>
            <Typography fontWeight={500}>을 업로드 해주세요.</Typography>
          </Box>
          <Typography fontWeight={500}>
            일반적으로 용량이 제일 큰 파일이 현재 사용 중인 파일입니다.
          </Typography>
        </Box>
        <Button variant="contained" component="label" sx={{ borderRadius: 10 }}>
          <input type="file" accept=".db" onChange={onChangeFile} hidden />
          <AddIcon sx={{ mr: 1 }} />
          업로드
        </Button>
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

export default LampGraph;
