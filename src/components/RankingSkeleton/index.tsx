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

export const RankingSkeleton = () => {
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((data, idx) => {
              return (
                <>
                  <TableRow key={idx}>
                    <TableCell>
                      <Typography
                        fontSize="24px"
                        fontWeight="500"
                        align="center"
                      >
                        {idx + 1}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          width: "10%",
                          display: "flex",
                        }}
                      >
                        <Box>
                          <Avatar
                            alt="Profile Image"
                            sx={{
                              height: "50px",
                              width: "50px",
                              mr: 2,
                            }}
                            src={undefined}
                          />
                        </Box>
                        <Box
                          sx={{
                            padding: "4px 0",
                          }}
                        ></Box>
                      </Box>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
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
