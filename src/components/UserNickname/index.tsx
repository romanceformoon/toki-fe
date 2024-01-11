import { Tooltip, Typography } from "@mui/material";
import { ReactNode } from "react";
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
              color: "#D3CCE3",
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
              color: "#E32636",
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
              color: "#A9A9A9",
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
              color: "#3D9140",
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
              color: "#FFE135",
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
              textShadow: `#FF8C00 0px 0px 5px, #FF8C00 0px 0px 10px, #FF8C00 0px 0px 15px, #FF8C00 0px 0px 20px, #FF8C00 0px 0px 30px, 2px 2px 2px rgba(206,89,55,0)`,
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
              textShadow: `#FF0800 0px 0px 5px, #FF0800 0px 0px 10px, #FF0800 0px 0px 15px, #FF0800 0px 0px 20px, #FF0800 0px 0px 30px, 2px 2px 2px rgba(206,89,55,0)`,
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
              textShadow: `#7e748a6e 0px 0px 5px, #7e748a6e 0px 0px 10px, #7e748a6e 0px 0px 15px, #7e748a6e 0px 0px 20px, #7e748a6e 0px 0px 30px, 2px 2px 2px rgba(206,89,55,0)`,
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
              textShadow: `#5DADEC 0px 0px 5px, #5DADEC 0px 0px 10px, #5DADEC 0px 0px 15px, #5DADEC 0px 0px 20px, #5DADEC 0px 0px 30px, 2px 2px 2px rgba(206,89,55,0)`,
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
              textShadow: `#A020F0 0px 0px 5px, #A020F0 0px 0px 10px, #A020F0 0px 0px 15px, #A020F0 0px 0px 20px, #A020F0 0px 0px 30px, 2px 2px 2px rgba(206,89,55,0)`,
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
                  textShadow: `0 0 2px #fff, 0 0 4px #fff, 0 0 6px #FFD700, 0 0 8px #FFD700, 0 0 9px #FFD700, 0 0 10px #FFD700, 0 0 20px #FFD700`,
                },
                to: {
                  textShadow: `0 0 10px #fff, 0 0 15px #FFD700, 0 0 20px #FFD700, 0 0 25px #FFD700, 0 0 30px #FFD700, 0 0 35px #FFD700, 0 0 40px #FFD700`,
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
                   textShadow: `0 0 2px #fff, 0 0 4px #fff, 0 0 6px #9B2335, 0 0 8px #9B2335, 0 0 9px #9B2335, 0 0 10px #9B2335, 0 0 20px #9B2335`,
                 },
                 to: {
                   textShadow: `0 0 10px #fff, 0 0 15px #9B2335, 0 0 20px #9B2335, 0 0 25px #9B2335, 0 0 30px #9B2335, 0 0 35px #9B2335, 0 0 40px #9B2335`,
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
                  textShadow: `0 0 5px #fff, 0 0 8px #fff, 0 0 11px #833278, 0 0 14px #833278, 0 0 17px #833278, 0 0 20px #833278, 0 0 23px #833278`,
                },
                to: {
                  textShadow: `0 0 10px #fff, 0 0 15px #833278, 0 0 20px #833278, 0 0 25px #833278, 0 0 30px #833278, 0 0 35px #833278, 0 0 40px #833278`,
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
