import { Button } from "@mui/material";
import { ReactNode } from "react";

interface ICommonButtonProps {
  children?: ReactNode;
  onClick?: () => void;
}

export const CommonButton = ({ children, onClick }: ICommonButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      component="label"
      sx={{ borderRadius: 10 }}
    >
      {children}
    </Button>
  );
};
