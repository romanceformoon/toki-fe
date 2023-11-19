import { Box, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { ClickableText } from "~/components/ClickableText";
import aerySSInfo from "~/pages/skill/skillSimulatorInfos/aery.json";

const Skill = () => {
  const router = useRouter();

  const danData: IAeryDan = aerySSInfo;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
        <Typography fontSize={24} fontWeight={700}>
          [5KEYS AERY] 段位認定
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Link href="http://naver.me/G2xp0TfL ">
          <Typography fontWeight={700}>다운로드 링크</Typography>
        </Link>
      </Box>
      <Box>
        {Object.keys(danData).map((dan, idx) => (
          <>
            <Card sx={{ minWidth: 275, mb: 3 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  [5KEYS AERY] 段位認定
                </Typography>
                <Typography variant="h5" component="div"></Typography>
                <ClickableText
                  onClick={() =>
                    router.push(
                      `http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=${danData[dan]["hash"]}`
                    )
                  }
                >
                  <Typography
                    sx={{
                      mb: 1.5,
                      color: danData[dan]["color"],
                      whiteSpace: "nowrap",
                    }}
                  >
                    {dan}
                  </Typography>
                </ClickableText>
                <Typography>{danData[dan]["list"][0]}</Typography>
                <Typography>{danData[dan]["list"][1]}</Typography>
                <Typography>{danData[dan]["list"][2]}</Typography>
                <Typography>{danData[dan]["list"][3]}</Typography>
              </CardContent>
            </Card>
          </>
        ))}
      </Box>
    </>
  );
};

export default Skill;
