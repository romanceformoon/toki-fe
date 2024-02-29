import {
  Box,
  Paper,
  SelectChangeEvent,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import { NextSeo } from "next-seo";
import { useState } from "react";
import { SelectLevel } from "~/components/SelectLevel";
import aeryDataJSON from "./aery/gradeData.json";

const Grade = () => {
  const [level, setLevel] = useState<string>("LEVEL 16");

  const aeryData: IGrade = aeryDataJSON;

  if (!aeryData[level]) return <></>;

  return (
    <>
      <NextSeo
        title="Grade | Asuma Toki"
        description="BMS 난이도표, 발광BMS, 새틀라이트, 스텔라, 에리팩, 5key BMS, 5key Aery, Satelite, Stella, Insane BMS"
        openGraph={{
          type: "website",
          locale: "ko_KR",
          url: "https://asumatoki.kr/grade",
          title: "Grade | Asuma Toki",
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

      <Box sx={{ mb: "1rem", textAlign: "center" }}>
        <Typography fontSize="24px" fontWeight={700}>
          [5KEYS AERY] 서열표 (beta)
        </Typography>
        <Typography
          fontSize="14px"
          fontWeight={500}
          sx={{
            color: "grey",
          }}
        >
          LR2IR 클리어 통계 기반으로 측정되어 실제 체감과는 많이 다를 수
          있습니다.
        </Typography>
        <Typography
          fontSize="14px"
          fontWeight={500}
          sx={{
            color: "grey",
          }}
        >
          재미로만 봐주세요.
        </Typography>
      </Box>

      <SelectLevel
        selectedLevel={level}
        handleChange={(event: SelectChangeEvent) => {
          setLevel(event.target.value as string);
        }}
        tableData={aeryData}
        showAll={false}
      />

      <TableContainer
        sx={{
          border: 1,
          borderRadius: "13px",
          borderColor: "primary.main",
        }}
        component={Paper}
      >
        <Table sx={{ minWidth: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "40%" }}>
                <Typography
                  fontSize="24px"
                  fontWeight="900"
                  fontStyle={{ color: "primary.main" }}
                  textAlign="center"
                >
                  Tier
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "60%" }}>
                <Typography
                  fontSize="24px"
                  fontWeight="900"
                  fontStyle={{ color: "primary.main" }}
                  textAlign="center"
                >
                  Title
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(aeryData[level]).map((tier) => {
              return (
                <>
                  <TableRow>
                    <TableCell align="center">
                      <Typography fontSize="64px" fontWeight="700">
                        {tier}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {aeryData[level][tier]?.map((song: { title: string }) => {
                        return (
                          <>
                            <Typography
                              fontSize="16px"
                              fontWeight="500"
                              key={song.title}
                              sx={{ padding: "0.2rem" }}
                            >
                              {song.title}
                            </Typography>
                          </>
                        );
                      })}
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default Grade;
