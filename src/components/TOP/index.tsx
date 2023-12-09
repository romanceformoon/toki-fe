import LinkIcon from "@mui/icons-material/Link";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { TableSkeleton } from "../TableSkeleton";

const colorPick = (clear: string) => {
  switch (clear) {
    case "FULL COMBO":
      return "#fde1f5d8";
    case "HARD CLEAR":
      return "#dd395ada";
    case "GROOVE CLEAR":
      return "#5e99ff";
    case "EASY CLEAR":
      return "#79e158";
    case "FAILED":
      return "#3333337a";
    case "NO PLAY":
      return "#00000000";
  }
};

interface IHistoryProps {
  historyData: IHistory;
  category: string;
}

export const Top = ({ historyData, category }: IHistoryProps) => {
  const [songList, setSongList] = useState<IHistorySelectedLevel[]>([]);

  const descExp = useCallback(() => {
    setSongList((prevState: IHistorySelectedLevel[]) => {
      const newArray = prevState.sort(
        (a: IHistorySelectedLevel, b: IHistorySelectedLevel) => {
          return a.exp > b.exp ? -1 : 1;
        }
      );
      return [...newArray];
    });
  }, []);

  useEffect(() => {
    if (category === "aery")
      setSongList([
        ...historyData["LEVEL 1"],
        ...historyData["LEVEL 2"],
        ...historyData["LEVEL 3"],
        ...historyData["LEVEL 4"],
        ...historyData["LEVEL 5"],
        ...historyData["LEVEL 6"],
        ...historyData["LEVEL 7"],
        ...historyData["LEVEL 8"],
        ...historyData["LEVEL 9"],
        ...historyData["LEVEL 10"],
        ...historyData["LEVEL 11"],
        ...historyData["LEVEL 12"],
        ...historyData["LEVEL 13"],
        ...historyData["LEVEL 14"],
        ...historyData["LEVEL 15"],
        ...historyData["LEVEL 16"],
        ...historyData["LEVEL 17"],
        ...historyData["LEVEL 18"],
        ...historyData["LEVEL 19"],
        ...historyData["LEVEL 20"],
      ]);
    else if (category === "insane")
      setSongList([
        ...historyData["LEVEL 1"],
        ...historyData["LEVEL 2"],
        ...historyData["LEVEL 3"],
        ...historyData["LEVEL 4"],
        ...historyData["LEVEL 5"],
        ...historyData["LEVEL 6"],
        ...historyData["LEVEL 7"],
        ...historyData["LEVEL 8"],
        ...historyData["LEVEL 9"],
        ...historyData["LEVEL 10"],
        ...historyData["LEVEL 11"],
        ...historyData["LEVEL 12"],
        ...historyData["LEVEL 13"],
        ...historyData["LEVEL 14"],
        ...historyData["LEVEL 15"],
        ...historyData["LEVEL 16"],
        ...historyData["LEVEL 17"],
        ...historyData["LEVEL 18"],
        ...historyData["LEVEL 19"],
        ...historyData["LEVEL 20"],
        ...historyData["LEVEL 21"],
        ...historyData["LEVEL 22"],
        ...historyData["LEVEL 23"],
        ...historyData["LEVEL 24"],
        ...historyData["LEVEL 25"],
      ]);
    descExp();
  }, [descExp, historyData, category]);

  if (!historyData) return <TableSkeleton></TableSkeleton>;
  if (!songList) return <TableSkeleton></TableSkeleton>;

  return (
    <>
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
              <TableCell sx={{ width: "5%" }}>
                <Typography
                  fontSize="24px"
                  fontWeight="900"
                  fontStyle={{ color: "primary.main" }}
                  textAlign="center"
                >
                  Rank
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "10%" }}>
                <Typography
                  fontSize="24px"
                  fontWeight="900"
                  fontStyle={{ color: "primary.main" }}
                >
                  Level
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "30%" }}>
                <Typography
                  fontSize="24px"
                  fontWeight="900"
                  fontStyle={{ color: "primary.main" }}
                >
                  Title
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "15%" }}>
                <Typography
                  fontSize="24px"
                  fontWeight="900"
                  fontStyle={{ color: "primary.main" }}
                >
                  Clear
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "10%" }}>
                <Typography
                  fontSize="24px"
                  fontWeight="900"
                  fontStyle={{ color: "primary.main" }}
                >
                  BP
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "10%" }}>
                <Typography
                  fontSize="24px"
                  fontWeight="900"
                  fontStyle={{ color: "primary.main" }}
                >
                  Rate
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "10%" }}>
                <Typography
                  fontSize="24px"
                  fontWeight="900"
                  fontStyle={{ color: "primary.main" }}
                >
                  EXP
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
            {songList.slice(0, 50).map((data, idx) => {
              return (
                <>
                  <TableRow sx={{ backgroundColor: colorPick(data.clear) }}>
                    <TableCell>
                      <Typography
                        fontSize="24px"
                        fontWeight="500"
                        align="center"
                      >
                        #{idx + 1}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontSize="16px" fontWeight="500">
                        {data.level}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontSize="16px" fontWeight="500">
                        {data.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontSize="16px" fontWeight="500">
                        {data.clear}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontSize="16px" fontWeight="500">
                        {data.bp}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontSize="16px" fontWeight="500">
                        {data.rate}%
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontSize="16px" fontWeight="500">
                        {data.exp.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell key={data.md5} align="center">
                      <Link
                        href={`http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=${data.md5}`}
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
