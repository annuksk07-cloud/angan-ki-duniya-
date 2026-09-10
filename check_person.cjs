const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

loadImage('kavya.jpg').then((image) => {
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  console.log("Kavya image loaded.");
});
