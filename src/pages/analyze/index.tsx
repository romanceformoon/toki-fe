import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useState } from "react";
import useLoginUser from "~/auth/hooks/useLoginUser";
import axiosInstance from "~/utils/axiosInstance";

const LampGraph = () => {
  const router = useRouter();

  const { isLogined, uid } = useLoginUser();

  const [uploadFile, setUploadFile] = useState<File>();

  const [isUploading, setIsUploading] = useState<boolean>(false);

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

      try {
        setIsUploading(true);
        const response = await axiosInstance.post(
          `/toki-api/data/analyze`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setUploadFile(uploadFile);

        router.push(`/user/${uid}`);
      } catch (err) {
        alert("서버 에러 발생");
        setIsUploading(false);
      }
    }
  };

  return (
    <>
      <NextSeo
        title="Analyze | Asuma Toki"
        description="BMS 난이도표, 발광BMS, 새틀라이트, 스텔라, 에리팩, 5key BMS, 5key Aery, Satelite, Stella, Insane BMS"
        openGraph={{
          type: "website",
          locale: "ko_KR",
          url: "https://asumatoki.kr/analyze",
          title: "Analyze | Asuma Toki",
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

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isUploading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box
        sx={{ bgcolor: "background.paper", pt: 8, pb: 6, textAlign: "center" }}
      >
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
          <Button
            variant="contained"
            component="label"
            sx={{ borderRadius: 10 }}
          >
            <input type="file" accept=".db" onChange={onChangeFile} hidden />
            <AddIcon sx={{ mr: 1 }} />
            업로드
          </Button>
        ) : (
          <Button
            variant="contained"
            component="label"
            sx={{ borderRadius: 10 }}
            onClick={async () => {
              const response = await axios.get(
                "/toki-api/auth/discord/oauth-url"
              );
              router.push(response.data.oauth_url);
            }}
          >
            <PersonIcon sx={{ mr: 1 }} />
            로그인이 필요합니다.
          </Button>
        )}
      </Box>
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default LampGraph;
