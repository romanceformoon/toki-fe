import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, IconButton, TextField, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useLoginUser from "~/auth/hooks/useLoginUser";
import { BarChartSkeleton } from "~/components/BarChartSkeleton";
import { HeadMeta } from "~/components/HeadMeta";
import { yLabels } from "~/const/graphLabels";
import axiosInstance from "~/utils/axiosInstance";
const UserPage = () => {
  const router = useRouter();

  const uid = router.query.uid;

  const { isLogined, uid: loginUid } = useLoginUser();

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

  const [changeNickname, setChangeNickname] = useState<boolean>(false);
  const [inputNickname, setInputNickname] = useState<string>("");

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNickname(e.target.value);
  };

  if (!graphData)
    return (
      <>
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ mb: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              <Avatar
                alt={userNickname}
                sx={{ height: "70px", width: "70px" }}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              <Typography fontSize="24px" fontWeight={700}>
                {userNickname}
              </Typography>
            </Box>
          </Box>
        </Box>
        <BarChartSkeleton />
      </>
    );

  return (
    <>
      <HeadMeta
        title={`${userNickname} | Asuma Toki`}
        description={`${userNickname} Profile`}
        url={`https://asumatoki.kr/user/${uid}`}
        image={
          userAvatar
            ? `https://cdn.discordapp.com/avatars/${uid}/${userAvatar}.png`
            : "/assets/images/logo.png"
        }
      />

      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ mb: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
            <Avatar
              alt="Profile Image"
              sx={{ height: "70px", width: "70px" }}
              src={
                userAvatar
                  ? `https://cdn.discordapp.com/avatars/${uid}/${userAvatar}.png`
                  : undefined
              }
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
            {!changeNickname ? (
              <>
                <Typography fontSize="24px" fontWeight={700}>
                  {userNickname}
                </Typography>
                {isLogined && loginUid === uid ? (
                  <IconButton
                    onClick={() => {
                      setInputNickname(userNickname);
                      setChangeNickname(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                <TextField
                  value={inputNickname}
                  id="change-nickname"
                  label=""
                  variant="standard"
                  size="small"
                  inputProps={{
                    maxLength: 16,
                  }}
                  onChange={handleChangeNickname}
                />
                <IconButton
                  onClick={async () => {
                    try {
                      const response = await axiosInstance.post(
                        `/toki-api/auth/user/change-nickname/${inputNickname}`
                      );
                      setUserNickname(response.data.nickname);
                    } catch (err) {
                      alert("에러 발생");
                    }
                    setChangeNickname(false);
                  }}
                >
                  <CheckIcon />
                </IconButton>
                <IconButton onClick={() => setChangeNickname(false)}>
                  <CloseIcon />
                </IconButton>
              </>
            )}
          </Box>
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
