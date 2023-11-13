import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useState } from "react";
import useLoginUser from "~/auth/hooks/useLoginUser";
import { CommonButton } from "~/components/CommonButton";
import axiosInstance from "~/utils/axiosInstance";

const LampGraph = () => {
  const router = useRouter();

  const { isLogined, uid } = useLoginUser();

  const [uploadFile, setUploadFile] = useState<File>();

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
      setUploadFile(uploadFile);
      router.push(`/user/${uid}`);
    }
  };

  return (
    <>
      <NextSeo
        title="Analyze | Asuma Toki"
        description="BMS Score Analyze"
        openGraph={{
          type: "website",
          locale: "ko_KR",
          url: "https://asumatoki.kr/analyze",
          title: "Analyze | Asuma Toki",
          description: "BMS Score Analyze",
          images: [
            {
              url: "/assets/images/logo.png",
              width: 400,
              height: 400,
            },
          ],
        }}
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
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default LampGraph;
