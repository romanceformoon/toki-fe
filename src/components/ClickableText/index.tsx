import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface IClickableTextProps {
  onClick?: () => void;
  children: ReactNode;
}

export const ClickableText = ({ onClick, children }: IClickableTextProps) => {
  return (
    <Box
      component='label'
      sx={{
        '&:hover': {
          cursor: 'pointer'
        }
      }}
      onClick={onClick}
    >
      {children}
    </Box>
  );
};
