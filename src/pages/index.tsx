import BarChartIcon from "@mui/icons-material/BarChart";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PersonIcon from "@mui/icons-material/Person";
import TableChartIcon from "@mui/icons-material/TableChart";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useState } from "react";
import useLoginUser from "~/auth/hooks/useLoginUser";

const Main = () => {
  const router = useRouter();

  const { uid, isLogined } = useLoginUser();

  const [logo, setLogo] = useState("logo.png");

  return (
    <>
      <NextSeo
        title="Asuma Toki"
        description="Asuma Toki - BMS Table, Score Analyze"
        openGraph={{
          type: "website",
          locale: "ko_KR",
          url: "https://asumatoki.kr",
          title: "Asuma Toki",
          description: "Asuma Toki - BMS Table, Score Analyze",
          images: [
            {
              url: "/assets/images/logo.png",
              width: 400,
              height: 400,
            },
          ],
        }}
      />
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              color: "white",
            }}
            onClick={() => {
              if (logo === "logo.png") setLogo("logo2.png");
              else setLogo("logo.png");
            }}
          >
            <Avatar
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
                width: "9rem",
                height: "auto",
              }}
              alt="logo"
              src={`/assets/images/${logo}`}
            />
          </Button>
        </Box>
        <Stack
          sx={{
            pt: 4,
          }}
          direction="column"
          spacing={2}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                width: "9rem",
                mr: 2,
                color: "#5783db",
                borderColor: "#5783db",
                ":hover": { borderColor: "#5783db" },
              }}
              onClick={async () => {
                if (isLogined) router.push(`/user/${uid}`);
                else {
                  const response = await axios.get(
                    "/toki-api/auth/discord/oauth-url"
                  );
                  router.push(response.data.oauth_url);
                }
              }}
            >
              <PersonIcon />
              <Typography sx={{ ml: 1 }} fontWeight={500}>
                내 프로필
              </Typography>
            </Button>
            <Button
              variant="outlined"
              sx={{
                width: "9rem",
                color: "#80669d",
                borderColor: "#80669d",
                ":hover": { borderColor: "#80669d" },
              }}
              onClick={async () => {
                router.push(`/analyze`);
              }}
            >
              <BarChartIcon />
              <Typography sx={{ ml: 1 }} fontWeight={500}>
                점수 분석
              </Typography>
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              sx={{
                width: "9rem",
                mr: 2,
                color: "#a881af",
                borderColor: "#a881af",
                ":hover": { borderColor: "#a881af" },
              }}
              onClick={async () => {
                router.push(`/table`);
              }}
            >
              <TableChartIcon />
              <Typography sx={{ ml: 1 }} fontWeight={500}>
                난이도표
              </Typography>
            </Button>
            <Button
              variant="outlined"
              sx={{
                width: "9rem",
                color: "#dd7973",
                borderColor: "#dd7973",
                ":hover": { borderColor: "#dd7973" },
              }}
              onClick={async () => {
                router.push(`/ranking`);
              }}
            >
              <EmojiEventsIcon />
              <Typography sx={{ ml: 1 }} fontWeight={500}>
                랭킹
              </Typography>
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default Main;
