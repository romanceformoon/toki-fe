import { Tooltip, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

interface IUserNicknameProps {
  clearDan: IDan;
  children: ReactNode;
}

export const UserNickname = ({ clearDan, children }: IUserNicknameProps) => {
  const [color, setColor] = useState({
    start: "#000000",
    end: "#000000 ",
  });

  useEffect(() => {
    if (clearDan === "1 DAN")
      setColor({
        start: "#D3CCE3",
        end: "#E9E4F0 ",
      });
    else if (clearDan === "2 DAN")
      setColor({
        start: "#3C3B3F",
        end: "#605C3C ",
      });
    else if (clearDan === "3 DAN")
      setColor({
        start: "#CAC531",
        end: "#F3F9A7 ",
      });
    else if (clearDan === "4 DAN")
      setColor({
        start: "#800080",
        end: "#ffc0cb ",
      });
    else if (clearDan === "5 DAN")
      setColor({
        start: "#00F260",
        end: "#0575E6 ",
      });
    else if (clearDan === "6 DAN")
      setColor({
        start: "#fc4a1a",
        end: "#f7b733 ",
      });
    else if (clearDan === "7 DAN")
      setColor({
        start: "#6D6027",
        end: "#D3CBB8 ",
      });
    else if (clearDan === "8 DAN")
      setColor({
        start: "#00b09b",
        end: "#96c93d ",
      });
    else if (clearDan === "9 DAN")
      setColor({
        start: "#22c1c3",
        end: "#fdbb2d ",
      });
    else if (clearDan === "10 DAN")
      setColor({
        start: "#ff9966",
        end: "#ff5e62 ",
      });
    else if (clearDan === "KAIDEN DAN")
      setColor({
        start: "#642B73",
        end: "#C6426E ",
      });
    else if (clearDan === "OVERJOY DAN")
      setColor({
        start: "#23074d",
        end: "#cc5333 ",
      });
  }, [clearDan]);

  return (
    <Tooltip title={clearDan}>
      <Typography
        sx={{
          textShadow: `${color.start} 1px 0 4px`,
          background: `-webkit-linear-gradient(45deg, ${color.start} 100%, ${color.end} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        fontSize="24px"
        fontWeight={700}
      >
        {children}
      </Typography>
    </Tooltip>
  );
};
