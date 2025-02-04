export const formatNumber = (num: number, precision: number | void): string => {
  const MAX_PRECISION = 8;
  let result = '';

  const checkMaxPrecision = (n: number): string => {
    const decimalPart = n.toString().split('.')[1];

    return decimalPart?.length > MAX_PRECISION ? n.toFixed(MAX_PRECISION) : n.toString();
  };

  if (num >= 1_000_000_000_000) {
    const n = num / 1_000_000_000_000;
    result = (precision ? n.toFixed(precision) : n) + 'T';
  } else if (num >= 1_000_000_000) {
    const n = num / 1_000_000_000;
    result = (precision ? n.toFixed(precision) : n) + 'B';
  } else if (num >= 1_000_000) {
    const n = num / 1_000_000;
    result = (precision ? n.toFixed(precision) : n) + 'M';
  } else {
    result = precision && num > 1 && num % 1 ? num.toFixed(precision) : checkMaxPrecision(num);
  }

  const [integerPart, decimalPart] = result.split('.');

  result = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (decimalPart) {
    result += '.' + decimalPart;
  }

  return result;
};
