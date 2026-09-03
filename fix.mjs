import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = code.indexOf('{/* Draggable Tassel & Bottom Text */}');
const endMarker = '</AnimatePresence>';
const endIdx = code.indexOf(endMarker, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  code = code.substring(0, startIdx) + code.substring(endIdx + endMarker.length);
  
  code = code.replace(
    'animate={isOpen ? { opacity: 0, y: -20, filter: "blur(10px)" } : { opacity: 1, y: 0, filter: "blur(0px)" }}',
    'animate={(leftHooked || rightHooked) ? { opacity: 0, y: -20, filter: "blur(10px)" } : { opacity: 1, y: 0, filter: "blur(0px)" }}'
  );
  
  fs.writeFileSync('src/App.tsx', code);
  console.log('Fixed!');
} else {
  console.log('Could not find markers');
}
