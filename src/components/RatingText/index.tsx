import { Box, Typography } from '@mui/material';

export const RatingText = ({ rating }: { rating: string }) => {
  const main = rating.split('.')[0];
  const sub = rating.split('.')[1];

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <Typography variant='h2'>{main}</Typography>
      {sub && (
        <Typography
          variant='h5'
          sx={{
            mb: '0.25rem'
          }}
        >
          .{sub}
        </Typography>
      )}
    </Box>
  );
};
