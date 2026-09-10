const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

loadImage('frame.png').then((image) => {
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  
  let solidMinX = canvas.width, solidMaxX = 0, solidMinY = canvas.height, solidMaxY = 0;
  
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const alpha = imgData[(y * canvas.width + x) * 4 + 3];
      if (alpha > 128) {
        if (x < solidMinX) solidMinX = x;
        if (x > solidMaxX) solidMaxX = x;
        if (y < solidMinY) solidMinY = y;
        if (y > solidMaxY) solidMaxY = y;
      }
    }
  }
  console.log(`Solid bounds: x=${solidMinX}, y=${solidMinY}, w=${solidMaxX - solidMinX}, h=${solidMaxY - solidMinY}`);
});
