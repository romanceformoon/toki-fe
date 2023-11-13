import { Box } from "@mui/material";
import { NextSeo } from "next-seo";

const Main = () => {
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

      <Box>메인 화면 공사 중</Box>
      <Box>
        각종 문의사항, 버그 제보, 아이디어 제보는 디스코드 romanceformoon
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
