import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replaceAll(
  '{ type: "spring", stiffness: 150, damping: 20 }',
  '{ type: "tween", ease: "easeOut", duration: 0.4 }'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed bounce!');
