/* @flow */
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

const getDifferentLuminance = (hexColor: string, luminance: number): string => {
  // Validate hex string
  let hex = String(hexColor).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  const lum = luminance || 0;

  // Convert to decimal and change luminosity
  let rgb = '#';
  let c;
  let i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += `00${c}`.substr(c.length);
  }

  return rgb;
};

const listToMatrix = (list: any[], elementsPerSubArray: number): any[][] => {
  const matrix = [];
  let i = 0;
  let k = 0;
  for (i = 0, k = -1; i < list.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++;
      matrix[k] = [];
    }
    matrix[k].push(list[i]);
  }
  return matrix;
};

export default {
  delay,
  getDifferentLuminance,
  listToMatrix,
};
