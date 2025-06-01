import { Tooltip, Typography } from '@mui/material';
import { ReactNode, memo, useMemo } from 'react';
import { aerySkillSimulators } from '~/const/skillSimulator';
import { ClickableText } from '../ClickableText';

interface IUserNicknameProps {
  clearDan: IDan;
  children: ReactNode;
  onClick?: () => void;
}

// 애니메이션이 필요한 단 목록
const ANIMATED_DANS = ['KAIDEN DAN', 'GORILLA DAN', 'OVERJOY DAN'];

// 네온 효과가 필요한 단 목록
const NEON_DANS = ['6 DAN', '7 DAN', '8 DAN', '9 DAN', '10 DAN'];

const UserNickname = memo(({ clearDan, children, onClick }: IUserNicknameProps) => {
  // 스타일을 메모이제이션하여 불필요한 재계산 방지
  const textStyle = useMemo(() => {
    const baseStyle = {
      whiteSpace: 'nowrap' as const
    };

    // 'None' 또는 undefined/null인 경우 기본 스타일 반환
    if (clearDan === 'None' || !clearDan || !aerySkillSimulators[clearDan]) {
      return baseStyle;
    }

    const danColor = aerySkillSimulators[clearDan].color;

    // 일반 색상 스타일 (1-5단)
    if (!NEON_DANS.includes(clearDan) && !ANIMATED_DANS.includes(clearDan)) {
      return {
        ...baseStyle,
        color: danColor
      };
    }

    // 네온 효과 스타일 (6-10단)
    if (NEON_DANS.includes(clearDan)) {
      return {
        ...baseStyle,
        color: '#fff',
        textShadow: `${danColor} 0px 0px 5px, ${danColor} 0px 0px 10px, ${danColor} 0px 0px 15px, ${danColor} 0px 0px 20px, ${danColor} 0px 0px 30px, 2px 2px 2px rgba(206,89,55,0)`
      };
    }

    // 애니메이션 효과 스타일 (KAIDEN, GORILLA, OVERJOY)
    if (ANIMATED_DANS.includes(clearDan)) {
      const keyframeName = clearDan.split(' ')[0].toLowerCase();

      return {
        ...baseStyle,
        color: '#fff',
        textShadow: `0 0 5px #fff, 0 0 8px #fff, 0 0 11px ${danColor}, 0 0 14px ${danColor}, 0 0 17px ${danColor}, 0 0 20px ${danColor}, 0 0 23px ${danColor}`

        // [`@keyframes ${keyframeName}`]: {
        //   from: {
        //     textShadow: `0 0 5px #fff, 0 0 8px #fff, 0 0 11px ${danColor}, 0 0 14px ${danColor}, 0 0 17px ${danColor}, 0 0 20px ${danColor}, 0 0 23px ${danColor}`
        //   },
        //   to: {
        //     textShadow: `0 0 10px #fff, 0 0 15px ${danColor}, 0 0 20px ${danColor}, 0 0 25px ${danColor}, 0 0 30px ${danColor}, 0 0 35px ${danColor}, 0 0 40px ${danColor}`
        //   }
        // },
        // animation: `${keyframeName} 1s ease-in-out infinite alternate`,
        // webkitAnimation: `${keyframeName} 1s ease-in-out infinite alternate`,
        // MozAnimation: `${keyframeName} 1s ease-in-out infinite alternate`,
      };
    }

    return baseStyle;
  }, [clearDan]);

  return (
    <ClickableText onClick={onClick}>
      <Tooltip title={clearDan}>
        <Typography variant='h3' fontWeight={700} sx={textStyle}>
          {children}
        </Typography>
      </Tooltip>
    </ClickableText>
  );
});

export { UserNickname };
