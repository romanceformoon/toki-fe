import {
  Avatar,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserNickname } from "~/components/UserNickname";
import { getLevel } from "~/utils/exp";

const Ranking = () => {
  const router = useRouter();

  const [ranking, setRanking] = useState<
    {
      uid: number;
      exp: number;
      avatar: string;
      nickname: string;
      clearDan: IDan;
    }[]
  >([]);

  useEffect(() => {
    const load = async () => {
      const response = await axios.get("/toki-api/analyze/ranking");
      setRanking(response.data);
    };
    load();
  }, []);

  return (
    <>
      <NextSeo
        title="Ranking | Asuma Toki"
        description="Ranking"
        openGraph={{
          type: "website",
          locale: "ko_KR",
          url: "https://asumatoki.kr/ranking",
          title: "Ranking | Asuma Toki",
          description: "Ranking",
          images: [
            {
              url: "/assets/images/logo.png",
              width: 400,
              height: 400,
            },
          ],
        }}
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
              <TableCell sx={{ width: "15%" }}>
                <Typography
                  fontSize="24px"
                  fontWeight="900"
                  fontStyle={{ color: "primary.main" }}
                  textAlign="center"
                >
                  순위
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "35%" }}>
                <Typography
                  fontSize="24px"
                  fontWeight="900"
                  fontStyle={{ color: "primary.main" }}
                >
                  닉네임
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "25%" }}>
                <Typography
                  fontSize="24px"
                  fontWeight="900"
                  fontStyle={{ color: "primary.main" }}
                >
                  레벨
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "25%" }}>
                <Typography
                  fontSize="24px"
                  fontWeight="900"
                  fontStyle={{ color: "primary.main" }}
                >
                  경험치
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ranking?.map((data, idx) => {
              return (
                <>
                  <TableRow>
                    <TableCell key={data.uid}>
                      <Typography
                        fontSize="24px"
                        fontWeight="500"
                        align="center"
                      >
                        {idx + 1}
                      </Typography>
                    </TableCell>
                    <TableCell key={data.uid}>
                      <Box
                        sx={{
                          width: "10%",
                          display: "flex",
                        }}
                      >
                        <Box>
                          <Avatar
                            alt="Profile Image"
                            sx={{ height: "50px", width: "50px", mr: 2 }}
                            src={
                              data.avatar
                                ? `https://cdn.discordapp.com/avatars/${data.uid}/${data.avatar}`
                                : undefined
                            }
                          />
                        </Box>
                        <Box
                          sx={{
                            padding: "4px 0",
                          }}
                        >
                          <UserNickname
                            clearDan={data.clearDan}
                            onClick={() => router.push(`/user/${data.uid}`)}
                          >
                            {data.nickname}
                          </UserNickname>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell key={data.uid}>
                      <Typography fontSize="24px" fontWeight="500">
                        {getLevel(data.exp).toFixed(0)}
                      </Typography>
                    </TableCell>
                    <TableCell key={data.uid}>
                      <Typography fontSize="24px" fontWeight="500">
                        {data.exp}
                      </Typography>
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

export default Ranking;
