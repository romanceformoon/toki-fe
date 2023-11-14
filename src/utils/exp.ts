const coefficient = 2;

export const getLevel = (exp: number) => {
  const totalExp = exp / 10;

  return ((totalExp / coefficient) ** 0.4 * 49) / 50 + 1;
};

export const getExpBar = (exp: number) => {
  return (
    (exp / (exp + (getLevel(exp) - (1 * 50) / 49) ** 2.5 * coefficient)) * 100
  );
};

export const getNextExp = (exp: number) => {
  return (exp + (((getLevel(exp) - 1) * 50) / 49) ** 2.5 * coefficient).toFixed(
    0
  );
};
