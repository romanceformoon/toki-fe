import { Box, Typography } from '@mui/material';

export const RatingText = ({ rating }: { rating: string }) => {
  const main = rating.split('.')[0];
  const sub = rating.split('.')[1];

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <Typography variant='h3'>{main}</Typography>
      {sub && (
        <Typography
          variant='h5'
          sx={{
            mb: '0.20rem'
          }}
        >
          .{sub}
        </Typography>
      )}
    </Box>
  );
};
