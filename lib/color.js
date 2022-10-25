import quantize from "quantize";

function drawImage(image) {
  const canvas = document.createElement("canvas");
  const canvasCtx = canvas.getContext("2d");

  canvasCtx.width = canvas.width = image.width;
  canvasCtx.height = canvas.height = image.height;

  canvasCtx.clearRect(0, 0, canvasCtx.width, canvasCtx.height);
  canvasCtx.drawImage(image, 0, 0, image.width, image.height);

  return canvasCtx;
}

function createPixelColorArray(ctx) {
  const pixels = ctx.getImageData(0, 0, ctx.width, ctx.height);
  const pixelColorArray = [];

  for (let i = 0, data = pixels.data; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3]; // alpha

    // skip pixels >50% transparent
    if (a < 255 / 2) continue;
    pixelColorArray.push([r, g, b]);
  }

  return pixelColorArray;
}

function rgbToHex([r, g, b]) {
  if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
  const hexColor = ((r << 16) | (g << 8) | b).toString(16);
  return `#${hexColor}`;
}

export function colorPicker(image) {
  const canvasCtx = drawImage(image);
  const pixelColorArray = createPixelColorArray(canvasCtx);

  // Send array to quantize function which clusters values
  // using median cut algorithm
  const colorMap = quantize(pixelColorArray, 4);
  const palette = colorMap ? colorMap.palette() : [];

  const hexPalette = palette.map((rgbColor) => {
    return rgbToHex(rgbColor);
  });
  console.log(hexPalette);
  return hexPalette[0];
}
