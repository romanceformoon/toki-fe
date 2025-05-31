import tableData from "public/table/aery/data.json";

/**
 * 특정 레벨에 해당하는 곡의 개수를 계산합니다. 최대 50개로 제한됩니다.
 * @param level 계산할 레벨
 * @returns 해당 레벨의 곡 개수 (최대 50)
 */
const getLevelLength = (level: number): number => {
  const folderName = `LEVEL ${level}`;
  const songsInLevel = tableData.filter(
    (song) => song.folder === folderName
  ).length;
  return Math.min(songsInLevel, 50);
};

/**
 * 각 레벨별 평균 경험치 값
 * LEVEL 1 ~ 20 + LEVEL 19 FULL COMBO + LEVEL 20 FULL COMBO
 */
const AVERAGE_EXP_BY_LEVEL = [
  0, 195.49794980203805, 196.81391758270502, 198.64428670521278,
  201.18091082175346, 204.78130205041225, 209.90009609577885,
  217.22089672651663, 227.77859783504584, 243.0823067374867, 265.3990243902439,
  298.0582785081856, 346.05795631485506, 416.8116475399327, 521.4278887053398,
  676.4618009919277, 906.6797414455938, 1249.1077477529711, 1759.1447588382634,
  2519.761847862672, 3655.1390243902442, 5065.09377964278, 7485.84,
];

/**
 * 레이팅별 기준 점수 테이블을 계산합니다.
 */
const calculateRatingTable = (): number[] => {
  // 레벨 1-11까지는 고정값 사용
  const fixedRatings = [
    0,
    390, // LEVEL 1
    580, // LEVEL 2
    1380, // LEVEL 3
    2380, // LEVEL 4
    3410, // LEVEL 5
    5510, // LEVEL 6
    7900, // LEVEL 7
    10600, // LEVEL 8
    11000, // LEVEL 9
    12600, // LEVEL 10
    15000, // LEVEL 11
  ];

  // 레벨 12-19까지는 평균 경험치 × 50
  const calculatedRatings = Array.from(
    { length: 8 },
    (_, i) => AVERAGE_EXP_BY_LEVEL[i + 12] * 50
  );

  // 레벨 20
  const level20Rating =
    2519.761847862672 * (50 - getLevelLength(20)) +
    3655.1390243902442 * getLevelLength(20);

  // 레벨 21 (ALL FULL COMBO)
  // 20 FULL COMBO + 19 FULL COMBO (20레벨이 50개 이하일 경우)
  const level21Rating =
    5065.09377964278 * (50 - getLevelLength(20)) + 7485.84 * getLevelLength(20);

  return [...fixedRatings, ...calculatedRatings, level20Rating, level21Rating];
};

// 미리 계산된 레이팅 테이블
const RATING_TABLE = calculateRatingTable();

/**
 * 입력된 점수에 해당하는 레이팅을 계산합니다.
 * @param input 사용자 점수
 * @param category 카테고리 (aery 또는 기타)
 * @returns 계산된 레이팅 (문자열 형식)
 */
export const getRating = (input: number, category: string): string => {
  // aery 카테고리가 아닌 경우 출력 X
  if (category !== "aery") return "-";

  // 입력값이 최대 레이팅보다 큰 경우
  if (input >= RATING_TABLE[RATING_TABLE.length - 1]) {
    return "21.000";
  }

  // 레이팅 범위 찾기
  let nearIndex = 0;
  for (let i = 0; i < RATING_TABLE.length; i++) {
    if (RATING_TABLE[i] > input) {
      nearIndex = i - 1;
      break;
    }
  }

  // 보간법을 사용하여 정확한 레이팅 계산
  const lowerValue = RATING_TABLE[nearIndex];
  const upperValue = RATING_TABLE[nearIndex + 1];
  const ratio = 1 - (upperValue - input) / (upperValue - lowerValue);

  // 최종 레이팅 계산 및 반환
  return (nearIndex + ratio).toFixed(3);
};
