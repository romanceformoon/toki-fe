import { Tooltip, Typography } from "@mui/material";
import { ReactNode } from "react";
import { aerySkillSimulators } from "~/const/skillSimulator";
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
  if (clearDan === "1 DAN")
    return (
      <ClickableText onClick={onClick}>
        <Tooltip title={clearDan}>
          <Typography
            fontSize="24px"
            fontWeight={700}
            sx={{
              color: aerySkillSimulators[clearDan].color,
              whiteSpace: "nowrap",
            }}
          >
            {children}
          </Typography>
        </Tooltip>
      </ClickableText>
    );

  if (clearDan === "2 DAN")
    return (
      <ClickableText onClick={onClick}>
        <Tooltip title={clearDan}>
          <Typography
            fontSize="24px"
            fontWeight={700}
            sx={{
              color: aerySkillSimulators[clearDan].color,
              whiteSpace: "nowrap",
            }}
          >
            {children}
          </Typography>
        </Tooltip>
      </ClickableText>
    );

  if (clearDan === "3 DAN")
    return (
      <ClickableText onClick={onClick}>
        <Tooltip title={clearDan}>
          <Typography
            fontSize="24px"
            fontWeight={700}
            sx={{
              color: aerySkillSimulators[clearDan].color,
              whiteSpace: "nowrap",
            }}
          >
            {children}
          </Typography>
        </Tooltip>
      </ClickableText>
    );

  if (clearDan === "4 DAN")
    return (
      <ClickableText onClick={onClick}>
        <Tooltip title={clearDan}>
          <Typography
            fontSize="24px"
            fontWeight={700}
            sx={{
              color: aerySkillSimulators[clearDan].color,
              whiteSpace: "nowrap",
            }}
          >
            {children}
          </Typography>
        </Tooltip>
      </ClickableText>
    );

  if (clearDan === "5 DAN")
    return (
      <ClickableText onClick={onClick}>
        <Tooltip title={clearDan}>
          <Typography
            fontSize="24px"
            fontWeight={700}
            sx={{
              color: aerySkillSimulators[clearDan].color,
              whiteSpace: "nowrap",
            }}
          >
            {children}
          </Typography>
        </Tooltip>
      </ClickableText>
    );

  if (clearDan === "6 DAN")
    return (
      <ClickableText onClick={onClick}>
        <Tooltip title={clearDan}>
          <Typography
            sx={{
              color: "#fff",
              textShadow: `${aerySkillSimulators[clearDan].color} 0px 0px 5px, ${aerySkillSimulators[clearDan].color} 0px 0px 10px, ${aerySkillSimulators[clearDan].color} 0px 0px 15px, ${aerySkillSimulators[clearDan].color} 0px 0px 20px, ${aerySkillSimulators[clearDan].color} 0px 0px 30px, 2px 2px 2px rgba(206,89,55,0)`,
              whiteSpace: "nowrap",
            }}
            fontSize="24px"
            fontWeight={700}
          >
            {children}
          </Typography>
        </Tooltip>
      </ClickableText>
    );

  if (clearDan === "7 DAN")
    return (
      <ClickableText onClick={onClick}>
        <Tooltip title={clearDan}>
          <Typography
            sx={{
              color: "#fff",
              textShadow: `${aerySkillSimulators[clearDan].color} 0px 0px 5px, ${aerySkillSimulators[clearDan].color} 0px 0px 10px, ${aerySkillSimulators[clearDan].color} 0px 0px 15px, ${aerySkillSimulators[clearDan].color} 0px 0px 20px, ${aerySkillSimulators[clearDan].color} 0px 0px 30px, 2px 2px 2px rgba(206,89,55,0)`,
              whiteSpace: "nowrap",
            }}
            fontSize="24px"
            fontWeight={700}
          >
            {children}
          </Typography>
        </Tooltip>
      </ClickableText>
    );

  if (clearDan === "8 DAN")
    return (
      <ClickableText onClick={onClick}>
        <Tooltip title={clearDan}>
          <Typography
            sx={{
              color: "#fff",
              textShadow: `${aerySkillSimulators[clearDan].color} 0px 0px 5px, ${aerySkillSimulators[clearDan].color} 0px 0px 10px, ${aerySkillSimulators[clearDan].color} 0px 0px 15px, ${aerySkillSimulators[clearDan].color} 0px 0px 20px, ${aerySkillSimulators[clearDan].color} 0px 0px 30px, 2px 2px 2px rgba(206,89,55,0)`,
              whiteSpace: "nowrap",
            }}
            fontSize="24px"
            fontWeight={700}
          >
            {children}
          </Typography>
        </Tooltip>
      </ClickableText>
    );

  if (clearDan === "9 DAN")
    return (
      <ClickableText onClick={onClick}>
        <Tooltip title={clearDan}>
          <Typography
            sx={{
              color: "#fff",
              textShadow: `${aerySkillSimulators[clearDan].color} 0px 0px 5px, ${aerySkillSimulators[clearDan].color} 0px 0px 10px, ${aerySkillSimulators[clearDan].color} 0px 0px 15px, ${aerySkillSimulators[clearDan].color} 0px 0px 20px, ${aerySkillSimulators[clearDan].color} 0px 0px 30px, 2px 2px 2px rgba(206,89,55,0)`,
              whiteSpace: "nowrap",
            }}
            fontSize="24px"
            fontWeight={700}
          >
            {children}
          </Typography>
        </Tooltip>
      </ClickableText>
    );

  if (clearDan === "10 DAN")
    return (
      <ClickableText onClick={onClick}>
        <Tooltip title={clearDan}>
          <Typography
            sx={{
              color: "#fff",
              textShadow: `${aerySkillSimulators[clearDan].color} 0px 0px 5px, ${aerySkillSimulators[clearDan].color} 0px 0px 10px, ${aerySkillSimulators[clearDan].color} 0px 0px 15px, ${aerySkillSimulators[clearDan].color} 0px 0px 20px, ${aerySkillSimulators[clearDan].color} 0px 0px 30px, 2px 2px 2px rgba(206,89,55,0)`,
              whiteSpace: "nowrap",
            }}
            fontSize="24px"
            fontWeight={700}
          >
            {children}
          </Typography>
        </Tooltip>
      </ClickableText>
    );

  if (clearDan === "KAIDEN DAN") {
    return (
      <ClickableText onClick={onClick}>
        <Tooltip title={clearDan}>
          <Typography
            sx={{
              "@keyframes kaiden": {
                from: {
                  textShadow: `0 0 2px #fff, 0 0 4px #fff, 0 0 6px ${aerySkillSimulators[clearDan].color}, 0 0 8px ${aerySkillSimulators[clearDan].color}, 0 0 9px ${aerySkillSimulators[clearDan].color}, 0 0 10px ${aerySkillSimulators[clearDan].color}, 0 0 20px ${aerySkillSimulators[clearDan].color}`,
                },
                to: {
                  textShadow: `0 0 10px #fff, 0 0 15px ${aerySkillSimulators[clearDan].color}, 0 0 20px ${aerySkillSimulators[clearDan].color}, 0 0 25px ${aerySkillSimulators[clearDan].color}, 0 0 30px ${aerySkillSimulators[clearDan].color}, 0 0 35px ${aerySkillSimulators[clearDan].color}, 0 0 40px ${aerySkillSimulators[clearDan].color}`,
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
        </Tooltip>
      </ClickableText>
    );
  }

  if (clearDan === "GORILLA DAN") {
    return (
      <ClickableText onClick={onClick}>
        <Tooltip title={clearDan}>
          <Typography
            sx={{
              "@keyframes gorilla": {
                from: {
                  textShadow: `0 0 2px #fff, 0 0 4px #fff, 0 0 6px ${aerySkillSimulators[clearDan].color}, 0 0 8px ${aerySkillSimulators[clearDan].color}, 0 0 9px ${aerySkillSimulators[clearDan].color}, 0 0 10px ${aerySkillSimulators[clearDan].color}, 0 0 20px ${aerySkillSimulators[clearDan].color}`,
                },
                to: {
                  textShadow: `0 0 10px #fff, 0 0 15px ${aerySkillSimulators[clearDan].color}, 0 0 20px ${aerySkillSimulators[clearDan].color}, 0 0 25px ${aerySkillSimulators[clearDan].color}, 0 0 30px ${aerySkillSimulators[clearDan].color}, 0 0 35px ${aerySkillSimulators[clearDan].color}, 0 0 40px ${aerySkillSimulators[clearDan].color}`,
                },
              },
              animation: "gorilla 1s ease-in-out infinite alternate",
              webkitAnimation: "gorilla 1s ease-in-out infinite alternate",
              MozAnimation: "gorilla 1s ease-in-out infinite alternate",

              color: "#fff",
              whiteSpace: "nowrap",
            }}
            fontSize="24px"
            fontWeight={700}
          >
            {children}
          </Typography>
        </Tooltip>
      </ClickableText>
    );
  }

  if (clearDan === "OVERJOY DAN") {
    return (
      <ClickableText onClick={onClick}>
        <Tooltip title={clearDan}>
          <Typography
            sx={{
              "@keyframes overjoy": {
                from: {
                  textShadow: `0 0 5px #fff, 0 0 8px #fff, 0 0 11px ${aerySkillSimulators[clearDan].color}, 0 0 14px ${aerySkillSimulators[clearDan].color}, 0 0 17px ${aerySkillSimulators[clearDan].color}, 0 0 20px ${aerySkillSimulators[clearDan].color}, 0 0 23px ${aerySkillSimulators[clearDan].color}`,
                },
                to: {
                  textShadow: `0 0 10px #fff, 0 0 15px ${aerySkillSimulators[clearDan].color}, 0 0 20px ${aerySkillSimulators[clearDan].color}, 0 0 25px ${aerySkillSimulators[clearDan].color}, 0 0 30px ${aerySkillSimulators[clearDan].color}, 0 0 35px ${aerySkillSimulators[clearDan].color}, 0 0 40px ${aerySkillSimulators[clearDan].color}`,
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
        </Tooltip>
      </ClickableText>
    );
  }

  return (
    <ClickableText onClick={onClick}>
      <Tooltip title={clearDan}>
        <Typography
          fontSize="24px"
          fontWeight={700}
          sx={{
            whiteSpace: "nowrap",
          }}
        >
          {children}
        </Typography>
      </Tooltip>
    </ClickableText>
  );
};
