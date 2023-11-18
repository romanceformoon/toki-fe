import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { TabList } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import {
  Avatar,
  Box,
  IconButton,
  Link,
  SelectChangeEvent,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useLoginUser from "~/auth/hooks/useLoginUser";
import { BarChartSkeleton } from "~/components/BarChartSkeleton";
import { Graph } from "~/components/Graph";
import { History } from "~/components/History";
import { UserNickname } from "~/components/UserNickname";
import axiosInstance from "~/utils/axiosInstance";
import { getExpTable, getLevel } from "~/utils/exp";

const UserPage = ({
  _uid,
  avatar,
  nickname,
  clearDan,
  exp,
  lr2Id,
}: InferGetServerSidePropsType<GetServerSideProps>) => {
  const router = useRouter();

  const uid = router.query.uid;

  const { isLogined, uid: loginUid } = useLoginUser();

  const [tab, setTab] = useState<string>("Graph");
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const [userNickname, setUserNickname] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [userDan, setUserDan] = useState<IDan>("None");
  const [userExp, setUserExp] = useState<number>(0);
  const [userLevel, setUserLevel] = useState<number>(1);
  const [expTable, setExpTable] = useState<number[]>([]);
  const [userLR2ID, setUserLR2ID] = useState<number>(0);

  const [graphData, setGraphData] = useState<IGraph>();
  const [historyData, setHistoryData] = useState<IHistory>();
  const [selectedLevel, setSelectedLevel] = useState<string>("LEVEL 1");
  const handleLevelChange = (event: SelectChangeEvent) => {
    setSelectedLevel(event.target.value as string);
  };

  useEffect(() => {
    setUserNickname(nickname);
    setUserAvatar(avatar);
    setUserDan(clearDan);
    setUserExp(exp);
    setUserLevel(getLevel(exp));
    setExpTable(getExpTable());
    setUserLR2ID(lr2Id);
  }, [nickname, avatar, clearDan, exp, lr2Id]);

  useEffect(() => {
    const getData = async () => {
      if (tab === "Graph" && !graphData) {
        const response = await axiosInstance.get(
          `/toki-api/analyze/user/graph/${uid}`
        );
        setGraphData(response.data.graph);
      } else if (tab === "History" && !historyData) {
        const response = await axiosInstance.get(
          `/toki-api/analyze/user/history/${uid}`
        );
        setHistoryData(response.data.history);
      }
    };
    getData();
  }, [uid, tab, graphData, historyData]);

  const [changeNickname, setChangeNickname] = useState<boolean>(false);
  const [inputNickname, setInputNickname] = useState<string>("");

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNickname(e.target.value);
  };

  if (!graphData)
    return (
      <>
        <NextSeo
          title={`${nickname} | Asuma Toki`}
          description={`${nickname} Profile`}
          openGraph={{
            type: "website",
            locale: "ko_KR",
            url: `https://asumatoki.kr/user/${_uid}`,
            title: `${nickname} | Asuma Toki`,
            description: `${nickname} Profile`,
            images: [
              {
                url: avatar
                  ? `https://cdn.discordapp.com/avatars/${_uid}/${avatar}.png`
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
                <Link
                  href={`http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=mypage&playerid=${userLR2ID}`}
                  underline="none"
                >
                  <UserNickname clearDan={userDan}>{userNickname}</UserNickname>
                </Link>

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
              Level: {userLevel}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography fontSize="15px" fontWeight={500}>
              Exp: {userExp.toFixed(0)} /{" "}
              {userLevel < 99 ? expTable[userLevel].toFixed(0) : "-"}
            </Typography>
          </Box>
        </Box>
      </Box>

      <TabContext value={tab}>
        <TabList onChange={handleTabChange} variant="fullWidth" centered>
          <Tab sx={{ fontWeight: 700 }} label="Graph" value="Graph" />
          <Tab sx={{ fontWeight: 700 }} label="History" value="History" />
        </TabList>
        <TabPanel value="Graph">
          <Graph graphData={graphData} />
        </TabPanel>
        <TabPanel value="History">
          <History
            selectedLevel={selectedLevel}
            handleLevelChange={handleLevelChange}
            historyData={historyData ?? {}}
          />
        </TabPanel>
      </TabContext>
    </>
  );
};

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { uid } = query;

  const isDevelopmentEnv = process.env.NODE_ENV === "development";

  const requestURI = isDevelopmentEnv
    ? process.env.NEXT_PUBLIC_DEV
    : process.env.NEXT_PUBLIC_PROD;

  const result = await axios.get(
    `${requestURI}/toki-api/analyze/user/score/${uid}`
  );

  return {
    props: {
      _uid: uid,
      avatar: result.data.avatar,
      nickname: result.data.nickname,
      clearDan: result.data.clearDan,
      exp: result.data.exp,
      lr2Id: result.data.lr2Id,
    },
  };
}

export default UserPage;
