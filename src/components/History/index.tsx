import LinkIcon from "@mui/icons-material/Link";
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

const colorPick = (clear: string) => {
  switch (clear) {
    case "FULL COMBO":
      return "#fde1f5";
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
  selectedLevel: string;
  handleLevelChange: (event: SelectChangeEvent) => void;
  historyData: IHistory;
}

export const History = ({
  selectedLevel,
  handleLevelChange,
  historyData,
}: IHistoryProps) => {
  const router = useRouter();

  if (!historyData) return <></>;

  return (
    <>
      <Box sx={{ maxWidth: "100%", mb: "1.5rem" }}>
        <FormControl fullWidth>
          <Select
            sx={{
              borderRadius: "13px",
            }}
            value={selectedLevel}
            onChange={handleLevelChange}
          >
            {Object.keys(historyData).map((level, index) => {
              return (
                <MenuItem key={index} value={level}>
                  {level}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
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
              <TableCell sx={{ width: "30%" }}>
                <Typography
                  fontSize="24px"
                  fontWeight="900"
                  fontStyle={{ color: "primary.main" }}
                >
                  Title
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "20%" }}>
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
            {historyData[selectedLevel]
              ?.sort((a, b) => {
                return a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1;
              })
              .map((data, idx) => {
                return (
                  <>
                    <TableRow sx={{ backgroundColor: colorPick(data.clear) }}>
                      <TableCell>
                        <Typography
                          fontSize="16px"
                          fontWeight="500"
                          align="center"
                        >
                          {selectedLevel}
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
                        <IconButton
                          onClick={() =>
                            router.push(
                              `http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=${data.md5}`
                            )
                          }
                        >
                          <LinkIcon />
                        </IconButton>
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
