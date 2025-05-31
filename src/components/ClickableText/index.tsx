import { Paper } from '@mui/material';
import { ReactNode } from 'react';

interface IClickableTextProps {
  onClick?: () => void;
  children: ReactNode;
}

export const ClickableText = ({ onClick, children }: IClickableTextProps) => {
  return (
    <Paper
      elevation={0}
      component='label'
      sx={{
        '&:hover': {
          cursor: 'pointer'
        }
      }}
      onClick={onClick}
    >
      {children}
    </Paper>
  );
};
