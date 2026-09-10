const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

loadImage('frame.png').then((image) => {
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  
  function alphaAt(x, y) {
    return data[(y * canvas.width + x) * 4 + 3];
  }
  
  console.log('Top-Left (204, 138):', alphaAt(204, 138));
  console.log('Top-Right (930, 138):', alphaAt(930, 138));
  console.log('Top-Left (204, 200):', alphaAt(204, 200));
  console.log('Top-Left (312, 138):', alphaAt(312, 138));
});
