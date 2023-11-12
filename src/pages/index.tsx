import { Box } from "@mui/material";
import { HeadMeta } from "~/components/HeadMeta";

const Main = () => {
  return (
    <>
      <HeadMeta
        title="Asuma Toki"
        description="Asuma Toki - BMS Table, Score Analyze"
        url="https://asumatoki.kr"
        image="/assets/images/logo.png"
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
