import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Box,
  IconButton,
  LinearProgress,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useLoginUser from "~/auth/hooks/useLoginUser";
import { BarChartSkeleton } from "~/components/BarChartSkeleton";
import { UserNickname } from "~/components/UserNickname";
import { yLabels } from "~/const/graphLabels";
import axiosInstance from "~/utils/axiosInstance";
import { getExpBar, getLevel, getNextExp } from "~/utils/exp";

const UserPage = () => {
  const router = useRouter();

  const uid = router.query.uid;

  const { isLogined, uid: loginUid } = useLoginUser();

  const [graphData, setGraphData] = useState<IGraphResult>();
  const [userNickname, setUserNickname] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [userDan, setUserDan] = useState<IDan>("None");
  const [userExp, setUserExp] = useState<number>(0);
  const [userLevel, setUserLevel] = useState<number>(1);

  // https://sanctacrux.tistory.com/1107
  useEffect(() => {
    const getUserData = async () => {
      const response = await axiosInstance.get(`/toki-api/analyze/user/${uid}`);
      setGraphData(response.data.graph);
      setUserNickname(response.data.nickname);
      setUserAvatar(response.data.avatar);
      setUserDan(response.data.clearDan);
      setUserExp(response.data.exp);
      setUserLevel(getLevel(response.data.exp));
    };
    getUserData();
  }, [uid]);

  const [changeNickname, setChangeNickname] = useState<boolean>(false);
  const [inputNickname, setInputNickname] = useState<string>("");

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNickname(e.target.value);
  };

  if (!graphData)
    return (
      <>
        <NextSeo
          title={`${userNickname} | Asuma Toki`}
          description={`${userNickname} Profile`}
          openGraph={{
            type: "website",
            locale: "ko_KR",
            url: `https://asumatoki.kr/user/${uid}`,
            title: `${userNickname} | Asuma Toki`,
            description: `${userNickname} Profile`,
            images: [
              {
                url: userAvatar
                  ? `https://cdn.discordapp.com/avatars/${uid}/${userAvatar}.png`
                  : "/assets/images/logo.png",
                width: 400,
                height: 400,
              },
            ],
          }}
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
      <NextSeo
        title={`${userNickname} | Asuma Toki`}
        description={`${userNickname} Profile`}
        openGraph={{
          type: "website",
          locale: "ko_KR",
          url: `https://asumatoki.kr/user/${uid}`,
          title: `${userNickname} | Asuma Toki`,
          description: `${userNickname} Profile`,
          images: [
            {
              url: userAvatar
                ? `https://cdn.discordapp.com/avatars/${uid}/${userAvatar}.png`
                : "/assets/images/logo.png",
              width: 400,
              height: 400,
            },
          ],
        }}
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
                {userDan === "None" ? (
                  <Typography fontSize="24px" fontWeight={700}>
                    {userNickname}
                  </Typography>
                ) : (
                  <UserNickname clearDan={userDan}>{userNickname}</UserNickname>
                )}

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

          <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
            <Typography fontSize="18px" fontWeight={700}>
              Level: {userLevel.toFixed(0)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Tooltip title={`${userExp} / ${getNextExp(userExp)}`}>
              <LinearProgress
                variant="determinate"
                sx={{
                  height: 20,
                  width: "50%",
                  borderRadius: 5,
                }}
                value={getExpBar(userExp)}
              />
            </Tooltip>
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
