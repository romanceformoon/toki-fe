/* eslint-disable @next/next/no-sync-scripts */
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
    const load = async () => {
      const _ = await loadTableData();
      setTableData(_);
    };
    load();
  }, []);

  if (!tableData) return <></>;

  return (
    <>
      <script
        type="text/javascript"
        src="https://code.jquery.com/jquery-2.1.3.min.js"
      ></script>
      <script type="text/javascript" src="/static/bmstable.js"></script>

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
              <TableCell sx={{ width: "20%" }}>
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
                  textAlign="center"
                >
                  Title
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "40%" }}>
                <Typography
                  fontSize="24px"
                  fontWeight="900"
                  fontStyle={{ color: "primary.main" }}
                  textAlign="center"
                >
                  Artist
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
