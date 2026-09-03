import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = code.indexOf('{/* 3. Entrance Layer');
const endMarker = '</AnimatePresence>';
const endIdx = code.indexOf(endMarker, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  code = code.substring(0, startIdx) + code.substring(endIdx + endMarker.length);
  fs.writeFileSync('src/App.tsx', code);
  console.log('Removed entrance background!');
} else {
  console.log('Could not find entrance background');
}
