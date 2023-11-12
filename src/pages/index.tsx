import { Box } from "@mui/material";

const Main = () => {
  return (
    <>
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
