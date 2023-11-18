import { Tooltip, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { ClickableText } from "../ClickableText";

interface IUserNicknameProps {
  clearDan: IDan;
  children: ReactNode;
  onClick?: () => void;
}

export const UserNickname = ({
  clearDan,
  children,
  onClick,
}: IUserNicknameProps) => {
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    if (clearDan === "1 DAN") setColor("#D3CCE3");
    else if (clearDan === "2 DAN") setColor("#E32636");
    else if (clearDan === "3 DAN") setColor("#A9A9A9");
    else if (clearDan === "4 DAN") setColor("#3D9140");
    else if (clearDan === "5 DAN") setColor("#FFE135");
    else if (clearDan === "6 DAN") setColor("#FF8C00");
    else if (clearDan === "7 DAN") setColor("#FF0800");
    else if (clearDan === "8 DAN") setColor("#7e748a6e");
    else if (clearDan === "9 DAN") setColor("#5DADEC");
    else if (clearDan === "10 DAN") setColor("#A020F0");
    else if (clearDan === "KAIDEN DAN") setColor("#FFD700");
    else if (clearDan === "OVERJOY DAN") setColor("#833278");
  }, [clearDan]);

  if (
    clearDan === "1 DAN" ||
    clearDan === "2 DAN" ||
    clearDan === "3 DAN" ||
    clearDan === "4 DAN" ||
    clearDan === "5 DAN"
  ) {
    return (
      <ClickableText onClick={onClick}>
        <Typography
          fontSize="24px"
          fontWeight={700}
          sx={{
            color: color,
            whiteSpace: "nowrap",
          }}
        >
          {children}
        </Typography>
      </ClickableText>
    );
  } else if (
    clearDan === "6 DAN" ||
    clearDan === "7 DAN" ||
    clearDan === "8 DAN" ||
    clearDan === "9 DAN" ||
    clearDan === "10 DAN"
  ) {
    return (
      <Tooltip title={clearDan}>
        <ClickableText onClick={onClick}>
          <Typography
            sx={{
              color: "#fff",
              textShadow: `${color} 0px 0px 5px, ${color} 0px 0px 10px, ${color} 0px 0px 15px, ${color} 0px 0px 20px, ${color} 0px 0px 30px, 2px 2px 2px rgba(206,89,55,0)`,
              whiteSpace: "nowrap",
            }}
            fontSize="24px"
            fontWeight={700}
          >
            {children}
          </Typography>
        </ClickableText>
      </Tooltip>
    );
  } else if (clearDan === "KAIDEN DAN") {
    return (
      <Tooltip title={clearDan}>
        <ClickableText onClick={onClick}>
          <Typography
            sx={{
              "@keyframes kaiden": {
                from: {
                  textShadow: `0 0 2px #fff, 0 0 4px #fff, 0 0 6px ${color}, 0 0 8px ${color}, 0 0 9px ${color}, 0 0 10px ${color}, 0 0 20px ${color}`,
                },
                to: {
                  textShadow: `0 0 10px #fff, 0 0 15px ${color}, 0 0 20px ${color}, 0 0 25px ${color}, 0 0 30px ${color}, 0 0 35px ${color}, 0 0 40px ${color}`,
                },
              },
              animation: "kaiden 1s ease-in-out infinite alternate",
              webkitAnimation: "kaiden 1s ease-in-out infinite alternate",
              MozAnimation: "kaiden 1s ease-in-out infinite alternate",

              color: "#fff",
              whiteSpace: "nowrap",
            }}
            fontSize="24px"
            fontWeight={700}
          >
            {children}
          </Typography>
        </ClickableText>
      </Tooltip>
    );
  } else if (clearDan === "OVERJOY DAN") {
    return (
      <Tooltip title={clearDan}>
        <ClickableText onClick={onClick}>
          <Typography
            sx={{
              "@keyframes overjoy": {
                from: {
                  textShadow: `0 0 5px #fff, 0 0 8px #fff, 0 0 11px ${color}, 0 0 14px ${color}, 0 0 17px ${color}, 0 0 20px ${color}, 0 0 23px ${color}`,
                },
                to: {
                  textShadow: `0 0 10px #fff, 0 0 15px ${color}, 0 0 20px ${color}, 0 0 25px ${color}, 0 0 30px ${color}, 0 0 35px ${color}, 0 0 40px ${color}`,
                },
              },
              animation: "overjoy 1s ease-in-out infinite alternate",
              webkitAnimation: "overjoy 1s ease-in-out infinite alternate",
              MozAnimation: "overjoy 1s ease-in-out infinite alternate",

              color: "#fff",
              whiteSpace: "nowrap",
            }}
            fontSize="24px"
            fontWeight={700}
          >
            {children}
          </Typography>
        </ClickableText>
      </Tooltip>
    );
  }
  return (
    <ClickableText onClick={onClick}>
      <Typography
        fontSize="24px"
        fontWeight={700}
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </Typography>
    </ClickableText>
  );
};
