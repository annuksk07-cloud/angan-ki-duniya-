import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Find the section for entrance background
const startIdx = code.indexOf('{/* 3. Entrance Screen */}');
const curtainsIdx = code.indexOf('{/* 4. Curtains */}');

if (startIdx !== -1 && curtainsIdx !== -1) {
  code = code.substring(0, startIdx) + code.substring(curtainsIdx);
  fs.writeFileSync('src/App.tsx', code);
  console.log('Removed entrance background!');
} else {
  console.log('Could not find entrance background');
}
