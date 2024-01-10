import LinkIcon from "@mui/icons-material/Link";
import {
  IconButton,
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
import Link from "next/link";
import { useEffect, useState } from "react";
import { SelectLevel } from "~/components/SelectLevel";
import { loadTableData } from "~/utils/loadTableData";

const DifficultyTable = () => {
  const [tableData, setTableData] = useState<ILevelList>({});
  const [selectedLevel, setSelectedLevel] = useState<string>("모두 보기");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedLevel(event.target.value as string);
  };

  useEffect(() => {
    const load = async () => {
      const _ = await loadTableData();
      setTableData(_);
    };
    load();
  }, []);

  if (!tableData) return <></>;

  return (
    <>
      <NextSeo
        title="Table | Asuma Toki"
        description="BMS 난이도표, 발광BMS, 새틀라이트, 스텔라, 에리팩, 5key BMS, 5key Aery, Satelite, Stella, Insane BMS"
        openGraph={{
          type: "website",
          locale: "ko_KR",
          url: "https://asumatoki.kr/table",
          title: "Table | Asuma Toki",
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

      <SelectLevel
        selectedLevel={selectedLevel}
        handleChange={handleChange}
        tableData={tableData}
        showAll
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
              <TableCell sx={{ width: "10%" }}>
                <Typography
                  fontSize="24px"
                  fontWeight="900"
                  fontStyle={{ color: "primary.main" }}
                  textAlign="center"
                >
                  Level
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "40%" }}>
                <Typography
                  fontSize="24px"
                  fontWeight="900"
                  fontStyle={{ color: "primary.main" }}
                >
                  Title
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "40%" }}>
                <Typography
                  fontSize="24px"
                  fontWeight="900"
                  fontStyle={{ color: "primary.main" }}
                >
                  Artist
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "10%" }}>
                <Typography
                  fontSize="24px"
                  fontWeight="900"
                  fontStyle={{ color: "primary.main" }}
                  textAlign="center"
                >
                  LR2IR
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedLevel === "모두 보기"
              ? Object.values(tableData)
                  .flat()
                  ?.map((song) => {
                    return (
                      <>
                        <TableRow>
                          <TableCell key={song.level} align="center">
                            <Typography fontSize="16px" fontWeight="500">
                              {song.level}
                            </Typography>
                          </TableCell>
                          <TableCell key={song.title}>
                            <Typography fontSize="16px" fontWeight="500">
                              {song.title}
                            </Typography>
                          </TableCell>
                          <TableCell key={song.artist}>
                            <Typography fontSize="16px" fontWeight="500">
                              {song.artist}
                            </Typography>
                          </TableCell>
                          <TableCell key={song.md5} align="center">
                            <Link
                              href={`http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=${song.md5}`}
                              target="_blank"
                            >
                              <IconButton>
                                <LinkIcon />
                              </IconButton>
                            </Link>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })
              : tableData[selectedLevel]?.map((song) => {
                  return (
                    <>
                      <TableRow>
                        <TableCell key={song.level} align="center">
                          <Typography fontSize="16px" fontWeight="500">
                            {song.level}
                          </Typography>
                        </TableCell>
                        <TableCell key={song.title}>
                          <Typography fontSize="16px" fontWeight="500">
                            {song.title}
                          </Typography>
                        </TableCell>
                        <TableCell key={song.artist}>
                          <Typography fontSize="16px" fontWeight="500">
                            {song.artist}
                          </Typography>
                        </TableCell>
                        <TableCell key={song.md5} align="center">
                          <Link
                            href={`http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=${song.md5}`}
                            target="_blank"
                          >
                            <IconButton>
                              <LinkIcon />
                            </IconButton>
                          </Link>
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

export default DifficultyTable;
