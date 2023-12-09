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
  SelectChangeEvent,
  Tab,
  Tabs,
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
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import useLoginUser from "~/auth/hooks/useLoginUser";
import { BarChartSkeleton } from "~/components/BarChartSkeleton";
import { Graph } from "~/components/Graph";
import { History } from "~/components/History";
import { Top } from "~/components/TOP";
import { UserNickname } from "~/components/UserNickname";
import useGraphQuery from "~/query/useGraphQuery";
import useHistoryQuery from "~/query/useHistoryQuery";
import useUserInfoQuery from "~/query/useUserInfoQuery";
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
  const queryClient = useQueryClient();

  const uid = router.query.uid;

  const { isLogined, uid: loginUid } = useLoginUser();

  const [category, setCategory] = useState<string>("aery");
  const handleCategoryChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setCategory(newValue);
  };

  const [tab, setTab] = useState<string>("Graph");
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const expTable = getExpTable();

  const [selectedLevel, setSelectedLevel] = useState<string>("LEVEL 1");
  const handleLevelChange = (event: SelectChangeEvent) => {
    setSelectedLevel(event.target.value as string);
  };

  const [changeNickname, setChangeNickname] = useState<boolean>(false);
  const [inputNickname, setInputNickname] = useState<string>("");

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNickname(e.target.value);
  };

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUserInfoQuery({
    uid,
    category,
  });

  const {
    data: graphData,
    isLoading: isGraphLoading,
    isError: isGraphError,
  } = useGraphQuery({
    uid,
    category,
  });

  const {
    data: historyData,
    isLoading: isHistoryLoading,
    isError: isHistoryError,
  } = useHistoryQuery({
    uid,
    category,
  });

  if (
    !userData ||
    !graphData ||
    !historyData ||
    isUserLoading ||
    isUserError ||
    isGraphLoading ||
    isGraphError ||
    isHistoryLoading ||
    isHistoryError
  )
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
                  ? `https://cdn.discordapp.com/avatars/${_uid}/${avatar}`
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
                  avatar
                    ? `https://cdn.discordapp.com/avatars/${_uid}/${avatar}`
                    : undefined
                }
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              <Typography fontSize="24px" fontWeight={700}>
                {nickname}
              </Typography>
            </Box>
          </Box>
        </Box>
        <BarChartSkeleton />
      </>
    );

  if (userData && (graphData || historyData))
    return (
      <>
        <NextSeo
          title={`${userData.nickname} | Asuma Toki`}
          description={`${userData.nickname} Profile`}
          openGraph={{
            type: "website",
            locale: "ko_KR",
            url: `https://asumatoki.kr/user/${userData.uid}`,
            title: `${userData.nickname} | Asuma Toki`,
            description: `${userData.nickname} Profile`,
            images: [
              {
                url: userData.avatar
                  ? `https://cdn.discordapp.com/avatars/${userData.uid}/${userData.avatar}`
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
                  userData.avatar
                    ? `https://cdn.discordapp.com/avatars/${userData.uid}/${userData.avatar}`
                    : undefined
                }
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              {!changeNickname ? (
                <>
                  <Link
                    href={`http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=mypage&playerid=${userData.lr2Id}`}
                    style={{ textDecoration: "none" }}
                    target="_blank"
                  >
                    <UserNickname clearDan={userData.clearDan}>
                      {userData.nickname}
                    </UserNickname>
                  </Link>

                  {isLogined && loginUid === userData.uid ? (
                    <IconButton
                      onClick={() => {
                        setInputNickname(userData.nickname);
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
                        queryClient.invalidateQueries({
                          queryKey: ["get-user-info"],
                        });
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

            <Box sx={{ mb: 1 }}>
              <Box>
                <Typography fontSize="18px" fontWeight={700}>
                  Level: {getLevel(userData.exp)}
                </Typography>
              </Box>
              <Box>
                <Typography fontSize="14px" fontWeight={500}>
                  Exp: {userData.exp.toFixed(0)} /{" "}
                  {getLevel(userData.exp) < 99
                    ? expTable[getLevel(userData.exp)].toFixed(0)
                    : "-"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            value={category}
            onChange={handleCategoryChange}
          >
            <Tab sx={{ fontWeight: 700 }} label="5KEYS AERY" value="aery" />
            <Tab sx={{ fontWeight: 700 }} label="発狂BMS" value="insane" />
            <Tab
              sx={{ fontWeight: 700 }}
              label="Satellite"
              value="satellite"
              disabled
            />
            <Tab
              sx={{ fontWeight: 700 }}
              label="Stella"
              value="stella"
              disabled
            />
          </Tabs>
        </Box>

        <TabContext value={tab}>
          <TabList onChange={handleTabChange} variant="fullWidth" centered>
            <Tab
              sx={{ fontWeight: 700, fontSize: 20 }}
              label="Graph"
              value="Graph"
            />
            <Tab
              sx={{ fontWeight: 700, fontSize: 20 }}
              label="TOP 50"
              value="TOP 50"
            />
            <Tab
              sx={{ fontWeight: 700, fontSize: 20 }}
              label="History"
              value="History"
            />
          </TabList>
          <TabPanel value="Graph">
            <Graph graphData={graphData} category={category} />
          </TabPanel>
          <TabPanel value="TOP 50">
            <Top historyData={historyData} />
          </TabPanel>
          <TabPanel value="History">
            <History
              selectedLevel={selectedLevel}
              handleLevelChange={handleLevelChange}
              historyData={historyData}
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

  const result = await axios.get(`${requestURI}/toki-api/user/aery/${uid}`);

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
