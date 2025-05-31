export const convertClearToNumber = (clear: string) => {
  switch (clear) {
    case 'FULL COMBO':
      return 5;
    case 'HARD CLEAR':
      return 4;
    case 'GROOVE CLEAR':
      return 3;
    case 'EASY CLEAR':
      return 2;
    case 'FAILED':
      return 1;
    case 'NO PLAY':
      return 0;
    default:
      return 0;
  }
};
