import { Box, Card, CardContent, Typography } from "@mui/material";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { ClickableText } from "~/components/ClickableText";
import { aerySkillSimulators } from "~/const/skillSimulator";

const Skill = () => {
  const danData: IAeryDan = aerySkillSimulators;

  return (
    <>
      <NextSeo
        title="段位認定 | Asuma Toki"
        description="BMS 난이도표, 발광BMS, 새틀라이트, 스텔라, 에리팩, 5key BMS, 5key Aery, Satelite, Stella, Insane BMS"
        openGraph={{
          type: "website",
          locale: "ko_KR",
          url: "https://asumatoki.kr/skill",
          title: "段位認定 | Asuma Toki",
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

      <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
        <Typography fontSize={24} fontWeight={700}>
          [5KEYS AERY] 段位認定
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Link href="https://naver.me/I5yHVLTA" target="_blank">
          <Typography fontWeight={700}>다운로드</Typography>
        </Link>
      </Box>
      <Box>
        {Object.keys(danData).map((dan, idx) => (
          <>
            <Card
              sx={{
                maxWidth: "900px",
                margin: "0 auto",
                mb: 3,
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  [5KEYS AERY] 段位認定
                </Typography>
                <Typography variant="h5" component="div"></Typography>
                <Box sx={{ width: "1rem" }}>
                  <Link
                    href={`http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=${danData[dan]["hash"]}`}
                    style={{ textDecoration: "none" }}
                    target="_blank"
                  >
                    <ClickableText>
                      <Typography
                        sx={{
                          mb: 1.5,
                          color: danData[dan]["color"],
                          whiteSpace: "nowrap",
                        }}
                        fontSize={20}
                      >
                        {dan}
                      </Typography>
                    </ClickableText>
                  </Link>
                </Box>
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

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default Skill;
