import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { TabList } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import {
  Avatar,
  Box,
  CircularProgress,
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
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { ClearGraph } from "~/components/ClearGraph";
import { Seo } from "~/components/Seo";
import { TableHistory } from "~/components/TableHistory";
import { TableTop50 } from "~/components/TableTop50";
import { UserNickname } from "~/components/UserNickname";
import useLoginUser from "~/hooks/useLoginUser";
import useGraphQuery from "~/query/useGraphQuery";
import useHistoryQuery from "~/query/useHistoryQuery";
import useUserInfoQuery from "~/query/useUserInfoQuery";
import axiosInstance from "~/utils/axiosInstance";
import { getExpTable, getLevel } from "~/utils/exp";
import { getRating } from "~/utils/rating";

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
    if (newValue === "sl" || newValue === "st") setSelectedLevel("LEVEL 0");
    else setSelectedLevel("LEVEL 1");
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
        <Seo type="user" uid={_uid} avatar={avatar} nickname={nickname} />

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
            <Box sx={{ mb: 1 }}>
              <CircularProgress />
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
            <Tab sx={{ fontWeight: 700 }} label="Satellite" value="sl" />
            <Tab sx={{ fontWeight: 700 }} label="Stella" value="st" />
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
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress />
            </Box>
          </TabPanel>
          <TabPanel value="TOP 50">
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress />
            </Box>
          </TabPanel>
          <TabPanel value="History">
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress />
            </Box>
          </TabPanel>
        </TabContext>
      </>
    );

  if (userData && (graphData || historyData))
    return (
      <>
        <Seo type="user" uid={_uid} avatar={avatar} nickname={nickname} />

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
                  Exp: {userData.exp.toLocaleString()} /{" "}
                  {getLevel(userData.exp) < 99
                    ? expTable[getLevel(userData.exp)].toLocaleString()
                    : "-"}
                </Typography>
              </Box>
              <Typography fontSize="14px" fontWeight={500}>
                Rating: {getRating(userData.rating, category)}
              </Typography>
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
            <Tab sx={{ fontWeight: 700 }} label="Satellite" value="sl" />
            <Tab sx={{ fontWeight: 700 }} label="Stella" value="st" />
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
            <ClearGraph graphData={graphData} category={category} />
          </TabPanel>
          <TabPanel value="TOP 50">
            <TableTop50 historyData={historyData} category={category} />
          </TabPanel>
          <TabPanel value="History">
            <TableHistory
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
      rating: result.data.rating,
    },
  };
}

export default UserPage;
