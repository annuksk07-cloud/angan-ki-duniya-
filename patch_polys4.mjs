import fs from 'fs';

function cubicBezier(t, p0, p1, p2, p3) {
  const cX = 3 * (p1.x - p0.x);
  const bX = 3 * (p2.x - p1.x) - cX;
  const aX = p3.x - p0.x - cX - bX;

  const cY = 3 * (p1.y - p0.y);
  const bY = 3 * (p2.y - p1.y) - cY;
  const aY = p3.y - p0.y - cY - bY;

  const x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
  const y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y;

  return { x, y };
}

let leftPoints = [];
for (let i = 0; i <= 10; i++) {
   leftPoints.push({ x: 100, y: (i / 10) * 12 });
}

const topP0 = {x: 100, y: 12};
const topP1 = {x: 75, y: 13}; // softened center tip (more horizontal tangent)
const topP2 = {x: 35, y: 22};
const topP3 = {x: 8, y: 44};  // lifted ~6% (from 50 to 44)
for (let i = 1; i <= 20; i++) {
  leftPoints.push(cubicBezier(i/20, topP0, topP1, topP2, topP3));
}

const botP0 = {x: 8, y: 44};
const botP1 = {x: 8, y: 60};  // keeps it slim through the Y=50 tie-back height
const botP2 = {x: 16, y: 88};
const botP3 = {x: 28, y: 100};
for (let i = 1; i <= 20; i++) {
  leftPoints.push(cubicBezier(i/20, botP0, botP1, botP2, botP3));
}

let leftOpen = "polygon(0% 0%, 100% 0%";
leftPoints.forEach(p => {
  leftOpen += `, ${p.x.toFixed(2)}% ${p.y.toFixed(2)}%`;
});
leftOpen += ", 0% 100%)";

let leftClosed = "polygon(0% 0%, 100% 0%";
for (let i = 0; i < 51; i++) {
  leftClosed += `, 100% ${((i / 50) * 100).toFixed(2)}%`;
}
leftClosed += ", 0% 100%)";

let rightPoints = leftPoints.map(p => ({ x: 100 - p.x, y: p.y }));
rightPoints.reverse();

let rightOpen = "polygon(100% 0%, 100% 100%";
rightPoints.forEach(p => {
  rightOpen += `, ${p.x.toFixed(2)}% ${p.y.toFixed(2)}%`;
});
rightOpen += ")";

let rightClosed = "polygon(100% 0%, 100% 100%";
for (let i = 50; i >= 0; i--) {
  rightClosed += `, 0% ${((i / 50) * 100).toFixed(2)}%`;
}
rightClosed += ")";

let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(/const leftClosedPolygon = "[^"]+";/, `const leftClosedPolygon = "${leftClosed}";`);
code = code.replace(/const leftOpenPolygon = "[^"]+";/, `const leftOpenPolygon = "${leftOpen}";`);
code = code.replace(/const rightClosedPolygon = "[^"]+";/, `const rightClosedPolygon = "${rightClosed}";`);
code = code.replace(/const rightOpenPolygon = "[^"]+";/, `const rightOpenPolygon = "${rightOpen}";`);

fs.writeFileSync('src/App.tsx', code);
console.log("Patched!");
