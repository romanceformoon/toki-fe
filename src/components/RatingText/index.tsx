import { Typography } from "@mui/material";

export const RatingText = ({ rating }: { rating: number }) => {
  const convertedRating = (rating / 10000).toFixed(3);
  const main = convertedRating.split(".")[0];
  const sub = convertedRating.split(".")[1];

  return (
    <>
      <Typography fontSize="24px" fontWeight="500">
        {main}
      </Typography>
      <Typography sx={{ mt: "0.56rem" }} fontSize="15px" fontWeight="500">
        .{sub}
      </Typography>
    </>
  );
};
