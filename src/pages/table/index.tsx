import {
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
    const _ = loadTableData();
    setTableData(_);
  }, []);

  if (!tableData) return <></>;

  return (
    <>
      <SelectLevel
        selectedLevel={selectedLevel}
        handleChange={handleChange}
        tableData={tableData}
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
              <TableCell align="center" sx={{ width: "10%" }}>
                <Typography
                  fontSize="24px"
                  fontWeight="900"
                  fontStyle={{ color: "#2570b6" }}
                  textAlign="center"
                >
                  Level
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ width: "35%" }}>
                <Typography
                  fontSize="24px"
                  fontWeight="900"
                  fontStyle={{ color: "#2570b6" }}
                  textAlign="center"
                >
                  Title
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ width: "25%" }}>
                <Typography
                  fontSize="24px"
                  fontWeight="900"
                  fontStyle={{ color: "#2570b6" }}
                  textAlign="center"
                >
                  Artist
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ width: "25%" }}>
                <Typography
                  fontSize="24px"
                  fontWeight="900"
                  fontStyle={{ color: "#2570b6" }}
                  textAlign="center"
                >
                  MD5
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
                            <Typography
                              fontSize="16px"
                              fontWeight="500"
                              textAlign="center"
                            >
                              {song.level}
                            </Typography>
                          </TableCell>
                          <TableCell key={song.title} align="center">
                            <Typography
                              fontSize="16px"
                              fontWeight="500"
                              textAlign="center"
                            >
                              {song.title}
                            </Typography>
                          </TableCell>
                          <TableCell key={song.artist} align="center">
                            <Typography
                              fontSize="16px"
                              fontWeight="500"
                              textAlign="center"
                            >
                              {song.artist}
                            </Typography>
                          </TableCell>
                          <TableCell key={song.md5} align="center">
                            <Typography
                              fontSize="16px"
                              fontWeight="500"
                              textAlign="center"
                            >
                              {song.md5}
                            </Typography>
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
                          <Typography
                            fontSize="16px"
                            fontWeight="500"
                            textAlign="center"
                          >
                            {song.level}
                          </Typography>
                        </TableCell>
                        <TableCell key={song.title} align="center">
                          <Typography
                            fontSize="16px"
                            fontWeight="500"
                            textAlign="center"
                          >
                            {song.title}
                          </Typography>
                        </TableCell>
                        <TableCell key={song.artist} align="center">
                          <Typography
                            fontSize="16px"
                            fontWeight="500"
                            textAlign="center"
                          >
                            {song.artist}
                          </Typography>
                        </TableCell>
                        <TableCell key={song.md5} align="center">
                          <Typography
                            fontSize="16px"
                            fontWeight="500"
                            textAlign="center"
                          >
                            {song.md5}
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

export default DifficultyTable;
