import tableData from "public/table/aery/data.json";

const getLevelLength = (level: number): number => {
  const l = tableData.filter((_) => _["folder"] === `LEVEL ${level}`).length;

  if (l > 50) return 50;
  else return tableData.filter((_) => _["folder"] === `LEVEL ${level}`).length;
};

const averageEXPbyLevel = [
  0, 195.49794980203805, 196.81391758270502, 198.64428670521278,
  201.18091082175346, 204.78130205041225, 209.90009609577885,
  217.22089672651663, 227.77859783504584, 243.0823067374867, 265.3990243902439,
  298.0582785081856, 346.05795631485506, 416.8116475399327, 521.4278887053398,
  676.4618009919277, 906.6797414455938, 1249.1077477529711, 1759.1447588382634,
  2519.761847862672, 3655.1390243902442, 5065.09377964278, 7485.84,
];

const ratingTable = [
  0,

  // LEVEL 1
  390,
  // LEVEL 2
  580,
  // LEVEL 3
  1380,
  // LEVEL 4
  2380,
  // LEVEL 5
  3410,
  // LEVEL 6
  5510,
  // LEVEL 7
  7900,
  // LEVEL 8
  10600,
  // LEVEL 9
  11000,
  // LEVEL 10
  12600,
  // LEVEL 11
  15000,

  346.05795631485506 * getLevelLength(12),

  416.8116475399327 * getLevelLength(13),

  521.4278887053398 * getLevelLength(14),

  676.4618009919277 * getLevelLength(15),

  906.6797414455938 * getLevelLength(16),

  1249.1077477529711 * getLevelLength(17),

  1759.1447588382634 * getLevelLength(18),

  2519.761847862672 * getLevelLength(19),

  2519.761847862672 * (50 - getLevelLength(20)) +
    3655.1390243902442 * getLevelLength(20),

  // ALL FULL COMBO
  5065.09377964278 * (50 - getLevelLength(20)) + 7485.84 * getLevelLength(20),
];

// console.log(ratingTable);

export const getRating = (input: number, category: string) => {
  if (category !== "aery") return (input / 10000).toFixed(3);

  let nearIndex = 0;

  for (let i = 0; i < ratingTable.length; i++) {
    if (ratingTable[i] > input) {
      nearIndex = i - 1;
      break;
    }
  }

  if (input >= ratingTable[ratingTable.length]) return "21.000";

  const sub =
    1 -
    (ratingTable[nearIndex + 1] - input) /
      (ratingTable[nearIndex + 1] - ratingTable[nearIndex]);

  return (nearIndex + sub).toFixed(3);
};
