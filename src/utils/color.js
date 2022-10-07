export function colorHexToRGB(hex) {
  if (typeof hex !== 'string') return colorHexToRGB('000000');
  if (hex.startsWith('#')) {
    return colorHexToRGB(hex.substring(1));
  }
  if (hex.length === 3) {
    return colorHexToRGB(
      `${hex.substring(0, 1).repeat(2)}${hex.substring(1, 2).repeat(2)}${hex.substring(2, 3).repeat(2)}`
    );
  }
  if (hex.length === 6) {
    return {
      r: Math.min(255, parseInt(hex.substring(0, 2), 16)) / 255,
      g: Math.min(255, parseInt(hex.substring(2, 4), 16)) / 255,
      b: Math.min(255, parseInt(hex.substring(4, 6), 16)) / 255,
    };
  }
  return colorHexToRGB('000000');
}

export function colorRGBToRGBA(rgb, a) {
  return `rgba(${Math.round(rgb.r * 255)},${Math.round(rgb.g * 255)},${Math.round(rgb.b * 255)},${Number(a).toFixed(
    2
  )})`;
}

export function colorHexToRGBA(hex, a) {
  const rgb = colorHexToRGB(hex);
  return colorRGBToRGBA(rgb, a);
}
