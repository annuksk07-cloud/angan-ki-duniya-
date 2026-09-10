const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

loadImage('frame.png').then((image) => {
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const w = canvas.width;
  const h = canvas.height;
  
  let topBound = h;
  let bottomBound = 0;
  
  for (let y = 0; y < h; y += 10) {
    let innerLeft = w;
    let innerRight = 0;
    let inside = false;
    
    // find the solid borders on this row
    let solidLeft = -1;
    let solidRight = -1;
    
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] > 100) {
        if (solidLeft === -1) solidLeft = x;
        solidRight = x;
      }
    }
    
    if (solidLeft !== -1 && solidRight !== -1 && (solidRight - solidLeft) > 100) {
      // Find the biggest transparent gap between solidLeft and solidRight
      let maxGapStart = -1;
      let maxGapEnd = -1;
      let currentGapStart = -1;
      
      for (let x = solidLeft; x <= solidRight; x++) {
        if (data[(y * w + x) * 4 + 3] < 50) {
          if (currentGapStart === -1) currentGapStart = x;
        } else {
          if (currentGapStart !== -1) {
            if (x - currentGapStart > maxGapEnd - maxGapStart) {
              maxGapStart = currentGapStart;
              maxGapEnd = x;
            }
            currentGapStart = -1;
          }
        }
      }
      
      if (maxGapEnd - maxGapStart > 50) {
        if (y < topBound) topBound = y;
        if (y > bottomBound) bottomBound = y;
        if (y % 100 === 0 || y === topBound) {
            console.log(`y=${y}: gap from x=${maxGapStart} to x=${maxGapEnd} (width: ${maxGapEnd - maxGapStart})`);
        }
      }
    }
  }
  console.log(`Overall gap Y bounds: ${topBound} to ${bottomBound}`);
});
