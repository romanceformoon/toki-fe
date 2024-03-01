export const getRating = (input: number) => {
  const ratingTable = [
    195.49794980203805, 392.3118673847431, 590.9561540899558,
    1395.6797973769696, 2829.148911729855, 4088.5494883045285,
    6043.537558843178, 7410.209145853453, 10327.196826703293, 12065.33025790205,
    14347.70660540427, 17302.897815742752, 20840.582376996637,
    26071.39443526699, 33823.09004959639, 45333.98707227969, 62455.38738764856,
    87957.23794191318, 125988.09239313359, 182756.9512195122,
  ];

  let min = Number.MAX_SAFE_INTEGER;
  let nearIndex = 0;

  for (let i = 0; i < ratingTable.length; i++) {
    let abs = Math.abs(ratingTable[i] - input);
    if (abs < min) {
      min = abs;
      nearIndex = i;
    }
  }

  return (
    nearIndex +
    ratingTable[nearIndex] / ratingTable[nearIndex + 1]
  ).toFixed(3);
};
