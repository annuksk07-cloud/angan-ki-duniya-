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
  
  console.log('Top-Left Corner (312, 270):', alphaAt(312, 270));
  console.log('Top-Right Corner (820, 270):', alphaAt(820, 270));
  console.log('Mid-Left (312, 500):', alphaAt(312, 500));
  
  let firstSolidYAt312 = -1;
  for(let y=0; y<1387; y++) {
    if (alphaAt(312, y) > 50) {
      firstSolidYAt312 = y;
      break;
    }
  }
  console.log('At x=312, first solid pixel is at y=', firstSolidYAt312);
  
});
