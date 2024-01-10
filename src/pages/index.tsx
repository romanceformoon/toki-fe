import { Download, Pageview } from "@mui/icons-material";
import BarChartIcon from "@mui/icons-material/BarChart";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PersonIcon from "@mui/icons-material/Person";
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
import Aery from "public/update/aery.json";
import { useState } from "react";
import useLoginUser from "~/auth/hooks/useLoginUser";
import { openInNewTab } from "~/utils/openInNewTab";

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
        description="BMS 난이도표, 발광BMS, 새틀라이트, 스텔라, 에리팩, 5key BMS, 5key Aery, Satelite, Stella, Insane BMS"
        openGraph={{
          type: "website",
          locale: "ko_KR",
          url: "https://asumatoki.kr",
          title: "Asuma Toki",
          description:
            "BMS 난이도표, 발광BMS, 새틀라이트, 스텔라, 에리팩, 5key BMS, 5key Aery, Satelite, Stella, Insane BMS",
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
                width: "12rem",
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
                width: "14.5rem",
                height: "3rem",
                mr: "1rem",
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
              <Typography sx={{ ml: 1 }} fontWeight={500} fontSize="18px">
                {isLogined ? "내 프로필" : "로그인"}
              </Typography>
            </Button>
            <Button
              variant="outlined"
              sx={{
                width: "14.5rem",
                height: "3rem",
                color: "#a881af",
                borderColor: "#a881af",
                ":hover": { borderColor: "#a881af" },
              }}
              onClick={async () => {
                router.push(`/tools/viewer`);
              }}
            >
              <Pageview />
              <Typography sx={{ ml: 1 }} fontWeight={500} fontSize="18px">
                BMS 채보 뷰어
              </Typography>
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              sx={{
                width: "14.5rem",
                height: "3rem",
                mr: "1rem",
                color: "#80669d",
                borderColor: "#80669d",
                ":hover": { borderColor: "#80669d" },
              }}
              onClick={async () => {
                router.push(`/analyze`);
              }}
            >
              <BarChartIcon />
              <Typography sx={{ ml: 1 }} fontWeight={500} fontSize="18px">
                점수 분석
              </Typography>
            </Button>

            <Button
              variant="outlined"
              sx={{
                width: "14.5rem",
                height: "3rem",
                color: "#dd7973",
                borderColor: "#dd7973",
                ":hover": { borderColor: "#dd7973" },
              }}
              onClick={async () => {
                router.push(`/ranking`);
              }}
            >
              <EmojiEventsIcon />
              <Typography sx={{ ml: 1 }} fontWeight={500} fontSize="18px">
                랭킹
              </Typography>
            </Button>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              sx={{
                width: "30rem",
                height: "3rem",
                color: "#6d1570",
                borderColor: "#6d1570",
                ":hover": { borderColor: "#6d1570" },
              }}
              onClick={() => {
                openInNewTab(Aery[0].full_download_url);
              }}
            >
              <Download />
              <Typography sx={{ ml: 1 }} fontWeight={500}>
                [5KEYS AERY] FULL PACKAGE 다운로드 ({Aery[0].update_date})
              </Typography>
            </Button>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              sx={{
                width: "30rem",
                height: "3rem",
                color: "#6d1570",
                borderColor: "#6d1570",
                ":hover": { borderColor: "#6d1570" },
              }}
              onClick={() => {
                openInNewTab(Aery[0].patch_download_url);
              }}
            >
              <Download />
              <Typography sx={{ ml: 1 }} fontWeight={500}>
                [5KEYS AERY] 최신패치 다운로드 ({Aery[0].update_date})
              </Typography>
            </Button>
          </Box>

          {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              sx={{
                width: "30rem",
                height: "3rem",
                color: "#a881af",
                borderColor: "#a881af",
                ":hover": { borderColor: "#a881af" },
              }}
              onClick={async () => {
                router.push(`/table`);
              }}
            >
              <Info />
              <Typography sx={{ ml: 1 }} fontWeight={500}>
                에리팩 패치노트
              </Typography>
            </Button>
          </Box> */}
        </Stack>

        <Box>
          <Box
            sx={{
              mt: "1.3rem",
              mb: "0.7rem",
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
            mt: "1rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              width: "9rem",
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
