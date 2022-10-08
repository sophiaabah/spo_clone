export function timeToString(time) {
  let diffInMin = time / 60000;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);
  let formattedSS = ss.toString().padStart(2, "0");
  return `${mm}:${formattedSS}`;
}

export function draw(img) {
  img.crossOrigin = "Anonymous";

  var canvas = document.createElement("canvas");
  var c = canvas.getContext("2d");
  console.log("context", c);

  c.width = canvas.width = img.width;
  c.height = canvas.height = img.height;
  c.clearRect(0, 0, c.width, c.height);
  c.drawImage(img, 0, 0, img.width, img.height);

  const color = getColors(c);

  console.log("first result", color);
  let colorFrequencyPairs = Object.entries(color);
  console.log("pairs", colorFrequencyPairs);

  let dominantColorFreq = Math.max(...Object.values(color));
  console.log("dominant", dominantColorFreq);
  let [dominantColor] = colorFrequencyPairs?.find(([color, freq]) => {
    return freq === dominantColorFreq;
  });
  console.log("result", `#${dominantColor.toString().padEnd(6, "0")}`);
  return `#${dominantColor.toString().padEnd(6, "0")}`;

  // this works... just add a hash
}

export function getColors(c) {
  var col,
    colors = {};
  var pixels, r, g, b, a;
  r = g = b = a = 0;
  pixels = c.getImageData(0, 0, c.width, c.height);
  for (var i = 0, data = pixels.data; i < data.length; i += 4) {
    r = data[i];
    g = data[i + 1];
    b = data[i + 2];
    a = data[i + 3]; // alpha
    // skip pixels >50% transparent
    if (a < 255 / 2) continue;
    col = rgbToHex(r, g, b);
    if (!colors[col]) colors[col] = 0;
    colors[col]++;
  }
  return colors;
}

function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
}
