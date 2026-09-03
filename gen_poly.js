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
const topP0 = {x: 100, y: 0};
const topP1 = {x: 100, y: 25};
const topP2 = {x: 12, y: 20};
const topP3 = {x: 12, y: 50};

for (let i = 0; i <= 20; i++) {
  const t = i / 20;
  leftPoints.push(cubicBezier(t, topP0, topP1, topP2, topP3));
}

const botP0 = {x: 12, y: 50};
const botP1 = {x: 12, y: 70};
const botP2 = {x: 20, y: 80};
const botP3 = {x: 28, y: 100};

for (let i = 1; i <= 20; i++) {
  const t = i / 20;
  leftPoints.push(cubicBezier(t, botP0, botP1, botP2, botP3));
}

let leftPolygon = "polygon(0% 0%, 100% 0%";
leftPoints.forEach(p => {
  leftPolygon += `, ${p.x.toFixed(2)}% ${p.y.toFixed(2)}%`;
});
leftPolygon += ", 0% 100%)";

let rightPoints = leftPoints.map(p => ({ x: 100 - p.x, y: p.y }));
rightPoints.reverse(); 

// Right Open: Top Right (100% 0%), Bottom Right (100% 100%), then the curve from Bottom to Top, ending at Top Center (0% 0%).
let rightPolygon = "polygon(100% 0%, 100% 100%";
rightPoints.forEach(p => {
  rightPolygon += `, ${p.x.toFixed(2)}% ${p.y.toFixed(2)}%`;
});
rightPolygon += ")";

console.log("const leftOpenPolygon = \"" + leftPolygon + "\";");
console.log("const rightOpenPolygon = \"" + rightPolygon + "\";");

let leftClosed = "polygon(0% 0%, 100% 0%";
// Left closed goes down the right edge (x=100)
for(let i=0; i<=40; i++) {
  // We want to match the number of points in leftPoints (which is 21 + 20 = 41).
  leftClosed += `, 100% ${((i / 40) * 100).toFixed(2)}%`;
}
leftClosed += ", 0% 100%)";

let rightClosed = "polygon(100% 0%, 100% 100%";
// Right closed goes UP the left edge (x=0) from bottom (100%) to top (0%)
for(let i=40; i>=0; i--) {
  rightClosed += `, 0% ${((i / 40) * 100).toFixed(2)}%`;
}
rightClosed += ")";

console.log("const leftClosedPolygon = \"" + leftClosed + "\";");
console.log("const rightClosedPolygon = \"" + rightClosed + "\";");

