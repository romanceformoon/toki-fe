const ratingTable = [
  0,

  195.49794980203805,

  195.49794980203805 + 196.81391758270502,

  195.49794980203805 + 196.81391758270502 + 198.64428670521278,

  195.49794980203805 +
    196.81391758270502 +
    198.64428670521278 +
    201.18091082175346 * 4,

  195.49794980203805 +
    196.81391758270502 +
    198.64428670521278 +
    201.18091082175346 * 4 +
    204.78130205041225 * 7,

  195.49794980203805 +
    196.81391758270502 +
    198.64428670521278 +
    201.18091082175346 * 4 +
    204.78130205041225 * 7 +
    209.90009609577885 * 6,

  195.49794980203805 +
    196.81391758270502 +
    198.64428670521278 +
    201.18091082175346 * 4 +
    204.78130205041225 * 7 +
    209.90009609577885 * 6 +
    217.22089672651663 * 9,

  195.49794980203805 +
    196.81391758270502 +
    198.64428670521278 +
    201.18091082175346 * 4 +
    204.78130205041225 * 7 +
    209.90009609577885 * 6 +
    217.22089672651663 * 9 +
    227.77859783504584 * 6,

  195.49794980203805 +
    196.81391758270502 +
    198.64428670521278 +
    201.18091082175346 * 4 +
    204.78130205041225 * 7 +
    209.90009609577885 * 6 +
    217.22089672651663 * 9 +
    227.77859783504584 * 6 +
    243.0823067374867 * 12,

  209.90009609577885 * 5 +
    217.22089672651663 * 9 +
    227.77859783504584 * 6 +
    243.0823067374867 * 12 +
    265.3990243902439 * 18,

  265.3990243902439 * 17 + 298.0582785081856 * 33,

  346.05795631485506 * 50,

  416.8116475399327 * 50,

  521.4278887053398 * 50,

  676.4618009919277 * 50,

  906.6797414455938 * 50,

  1249.1077477529711 * 50,

  1759.1447588382634 * 50,

  2519.761847862672 * 50,

  2519.761847862672 * 23 + 3655.1390243902442 * 27,

  // ALL FULL COMBO
  5065.09377964278 * 23 + 7485.84 * 27,
];

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