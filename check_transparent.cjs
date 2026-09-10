const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

loadImage('frame.png').then((image) => {
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  
  let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
  
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const alpha = imgData[(y * canvas.width + x) * 4 + 3];
      if (alpha === 0) { // fully transparent
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  console.log(`Transparent bounding box: x=${minX}, y=${minY}, w=${maxX - minX}, h=${maxY - minY}`);
  
  // Actually, there could be fully transparent pixels OUTSIDE the frame too.
  // The frame is probably surrounded by transparent pixels. 
  // We need to find the INNER transparent window.
  // Let's sample a point in the center and grow to find the window bounds.
  
  const cx = Math.floor(canvas.width / 2);
  const cy = Math.floor(canvas.height / 2);
  
  let innerMinX = cx, innerMaxX = cx, innerMinY = cy, innerMaxY = cy;
  
  while (innerMinX > 0 && imgData[(cy * canvas.width + innerMinX) * 4 + 3] === 0) innerMinX--;
  while (innerMaxX < canvas.width && imgData[(cy * canvas.width + innerMaxX) * 4 + 3] === 0) innerMaxX++;
  while (innerMinY > 0 && imgData[(innerMinY * canvas.width + cx) * 4 + 3] === 0) innerMinY--;
  while (innerMaxY < canvas.height && imgData[(innerMaxY * canvas.width + cx) * 4 + 3] === 0) innerMaxY++;

  console.log(`Inner transparent window roughly: x=${innerMinX}, y=${innerMinY}, w=${innerMaxX - innerMinX}, h=${innerMaxY - innerMinY}`);
  console.log(`As percentages: left=${(innerMinX/canvas.width*100).toFixed(2)}%, top=${(innerMinY/canvas.height*100).toFixed(2)}%, right=${(100 - innerMaxX/canvas.width*100).toFixed(2)}%, bottom=${(100 - innerMaxY/canvas.height*100).toFixed(2)}%`);
});
