export const generateColors = (length: number): string[] => {
  const colors = [];
  const hueStep = 360 / length;
  const startHue = 110;

  for (let i = 0; i < length; i++) {
    const hue = startHue + i * hueStep;
    const adjustedHue = hue % 360;
    colors.push(`hsl(${adjustedHue}, 70%, 50%)`);
  }

  return colors;
};
