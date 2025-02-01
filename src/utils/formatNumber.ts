export const formatNumber = (num: number, precision: number | void): string => {
  let result = '';

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
    result = precision ? num.toFixed(precision) : num.toString();
  }

  const [integerPart, decimalPart] = result.split('.');

  result = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (decimalPart) {
    result += '.' + decimalPart;
  }

  return result;
};
