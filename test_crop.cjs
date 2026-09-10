const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

// We want to simulate what the user sees.
// The user complained about "leaving the upper arched opening empty".
// This was because I used object-contain.
console.log("If we use object-cover object-top inside the exact inner opening:");
console.log("Container is 509x1017.");
console.log("Image aspect is 0.746. If scaled to height 1017, width is 759.");
console.log("Container width is 509. 250 pixels are cropped from width (125 left, 125 right).");
console.log("This is 16% crop on each side.");
