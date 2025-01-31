export const formatNumber = (num: number): string => {
  let result = '';

  if (num >= 1_000_000_000_000) {
        result = (num / 1_000_000_000_000).toFixed(2) + 'T';
  } else if (num >= 1_000_000_000) {
      result = (num / 1_000_000_000).toFixed(2) + 'B';
  } else if (num >= 1_000_000) {
      result = (num / 1_000_000).toFixed(2) + 'M';
  } else {
      result = num % 1 ? num.toFixed(2) : num.toString();
  }

  return result.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
