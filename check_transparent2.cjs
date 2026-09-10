const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

loadImage('frame.png').then((image) => {
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  
  // To find the inner window, we can scan row by row, and find where alpha is low.
  // We expect a border, then transparency, then a border.
  // Let's find the first row that has a transparent gap in the middle.
  
  let innerMinX = canvas.width, innerMaxX = 0, innerMinY = canvas.height, innerMaxY = 0;
  
  // We'll consider a pixel "inside" if it's mostly transparent.
  for (let y = 0; y < canvas.height; y++) {
    let inGap = false;
    let gapStart = -1;
    let gapEnd = -1;
    let maxGapWidth = 0;
    
    for (let x = 0; x < canvas.width; x++) {
      const alpha = imgData[(y * canvas.width + x) * 4 + 3];
      if (alpha < 128) {
        if (!inGap) { gapStart = x; inGap = true; }
        gapEnd = x;
      } else {
        if (inGap) {
          const width = gapEnd - gapStart;
          if (width > maxGapWidth && gapStart > canvas.width * 0.1 && gapEnd < canvas.width * 0.9) {
            maxGapWidth = width;
            if (gapStart < innerMinX) innerMinX = gapStart;
            if (gapEnd > innerMaxX) innerMaxX = gapEnd;
            if (y < innerMinY) innerMinY = y;
            if (y > innerMaxY) innerMaxY = y;
          }
          inGap = false;
        }
      }
    }
  }
  
  console.log(`Inner transparent window roughly: x=${innerMinX}, y=${innerMinY}, w=${innerMaxX - innerMinX}, h=${innerMaxY - innerMinY}`);
  console.log(`As percentages: left=${(innerMinX/canvas.width*100).toFixed(2)}%, top=${(innerMinY/canvas.height*100).toFixed(2)}%, right=${(100 - innerMaxX/canvas.width*100).toFixed(2)}%, bottom=${(100 - innerMaxY/canvas.height*100).toFixed(2)}%`);
});
