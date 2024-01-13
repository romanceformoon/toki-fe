const coefficient = 20;

// https://sanctacrux.tistory.com/1107

export const getExpTable = () => {
  const result = [];
  for (let i = 1; i < 100; i++) {
    result.push(
      parseInt(((((i - 1) * 50) / 49) ** 2.5 * coefficient).toFixed(0))
    );
  }
  return result;
};

export const getLevel = (exp: number) => {
  const target = exp;
  if (target >= 2000000) return 99;

  const numbers = getExpTable();

  let min = Number.MAX_SAFE_INTEGER;
  let nearIndex = 0;

  for (let i = 0; i < numbers.length; i++) {
    let abs = Math.abs(numbers[i] - target);
    if (abs < min) {
      min = abs;
      nearIndex = i;
    }
  }

  const diff = numbers[nearIndex] - target;
  if (diff < 0) return nearIndex + 1;
  else return nearIndex;
};
