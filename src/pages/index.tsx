import BarChartIcon from "@mui/icons-material/BarChart";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PersonIcon from "@mui/icons-material/Person";
import TableChartIcon from "@mui/icons-material/TableChart";
import {
  Avatar,
  Box,
  Button,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useState } from "react";
import useLoginUser from "~/auth/hooks/useLoginUser";

const Main = () => {
  const router = useRouter();

  const { uid, isLogined } = useLoginUser();

  const [logo, setLogo] = useState("logo.png");

  const [open, setOpen] = useState(false);

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setOpen(true);
    } catch (e) {
      alert("복사에 실패하였습니다");
    }
  };

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

        <Box>
          <Box
            sx={{
              mt: 4,
              mb: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography fontWeight={700}>[5KEYS AERY] 난이도표 URL</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              value="https://asumatoki.kr/table/aery/header.json"
              label=""
              id="aery-table-beatoraja"
              variant="outlined"
              size="small"
              focused={false}
              sx={{
                input: {
                  textAlign: "center",
                  "&:hover": {
                    cursor: "pointer",
                  },
                },
                width: "23.5rem",
              }}
              onClick={() => {
                handleCopyClipBoard(
                  "https://asumatoki.kr/table/aery/header.json"
                );
              }}
            />
          </Box>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            message="복사 완료"
            sx={{
              width: "1rem",
            }}
          />
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              width: "9rem",
              mr: 2,
              color: "#a881af",
              borderColor: "#a881af",
              ":hover": { borderColor: "#a881af" },
              borderRadius: 10,
            }}
            onClick={async () => {
              router.push(`https://discord.gg/VhQahFaXHd`);
            }}
          >
            <Avatar
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
                width: "1.5rem",
                height: "auto",
                mr: 1,
              }}
              variant="square"
              alt="discord"
              src={"/assets/images/discord-mark-blue.png"}
            />
            <Typography fontWeight={500}>디스코드</Typography>
          </Button>
        </Box>
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
