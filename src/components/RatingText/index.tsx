import { Typography } from '@mui/material';

export const RatingText = ({ rating }: { rating: string }) => {
  const main = rating.split('.')[0];
  const sub = rating.split('.')[1];

  return (
    <>
      <Typography fontSize='24px' fontWeight='500'>
        {main}
      </Typography>
      <Typography sx={{ mt: '0.56rem' }} fontSize='15px' fontWeight='500'>
        .{sub}
      </Typography>
    </>
  );
};
