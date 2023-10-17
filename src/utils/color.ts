const rgbToHex = (red: number, green: number, blue: number) =>
  [red, green, blue]
    .map((value) => value.toString(16).toUpperCase())
    .map((value) => (value.length === 1 ? "0" + value : value))
    .reduce((acc, value) => acc + value, "#");

function rgbToHsl(red: number, green: number, blue: number) {
  if (red === 0 && green === 0 && blue === 0) {
    return [0, 0, 0];
  }

  const normalizedRed = red / 255;
  const normalizedGreen = green / 255;
  const normalizedBlue = blue / 255;

  const max = Math.max(normalizedRed, normalizedGreen, normalizedBlue);
  const min = Math.min(normalizedRed, normalizedGreen, normalizedBlue);

  const lightness = (max + min) / 2;

  const d = max - min;
  const saturation = lightness > 0.5 ? d / (2 - max - min) : d / (max + min);

  let hue;
  if (max === normalizedRed) {
    hue =
      ((normalizedGreen - normalizedBlue) / d +
        (normalizedGreen < normalizedBlue ? 6 : 0)) *
      60;
  } else if (max === normalizedGreen) {
    hue = ((normalizedBlue - normalizedRed) / d + 2) * 60;
  } else {
    hue = ((normalizedRed - normalizedGreen) / d + 4) * 60;
  }

  return [hue, saturation, lightness];
}

export { rgbToHex, rgbToHsl };
