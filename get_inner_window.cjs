const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

loadImage('frame.png').then((image) => {
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  const w = canvas.width;
  const h = canvas.height;

  // 1. Find the outer bounding box of the solid frame (alpha > 50)
  let minX = w, maxX = 0, minY = h, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] > 50) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  
  console.log(`Solid Frame Bounds: x=${minX}, y=${minY}, w=${maxX - minX}, h=${maxY - minY}`);
  
  // 2. Find the inner transparent window.
  // We scan a horizontal line through the middle of the bounding box.
  const midY = Math.floor(minY + (maxY - minY) / 2);
  let innerLeft = minX;
  let innerRight = maxX;
  
  // moving from middle to left to find inner edge of frame
  for (let x = Math.floor(w / 2); x > minX; x--) {
    if (data[(midY * w + x) * 4 + 3] > 50) {
      innerLeft = x;
      break;
    }
  }
  
  // moving from middle to right
  for (let x = Math.floor(w / 2); x < maxX; x++) {
    if (data[(midY * w + x) * 4 + 3] > 50) {
      innerRight = x;
      break;
    }
  }

  // Same for vertical scanning through the middle X
  const midX = Math.floor(minX + (maxX - minX) / 2);
  let innerTop = minY;
  let innerBottom = maxY;
  
  for (let y = Math.floor(h / 2); y > minY; y--) {
    if (data[(y * w + midX) * 4 + 3] > 50) {
      innerTop = y;
      break;
    }
  }
  
  for (let y = Math.floor(h / 2); y < maxY; y++) {
    if (data[(y * w + midX) * 4 + 3] > 50) {
      innerBottom = y;
      break;
    }
  }

  console.log(`Inner Window Bounds: x=${innerLeft}, y=${innerTop}, rightX=${innerRight}, bottomY=${innerBottom}`);
  console.log(`Inner Window Width: ${innerRight - innerLeft}, Height: ${innerBottom - innerTop}`);
  
  const pctTop = ((innerTop / h) * 100).toFixed(2);
  const pctBottom = (100 - (innerBottom / h) * 100).toFixed(2);
  const pctLeft = ((innerLeft / w) * 100).toFixed(2);
  const pctRight = (100 - (innerRight / w) * 100).toFixed(2);
  
  console.log(`CSS Insets: top: ${pctTop}%, bottom: ${pctBottom}%, left: ${pctLeft}%, right: ${pctRight}%`);
});
