import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The line is: initial={{ scale: 1.15 }}
// Let's remove it and the animate scale so it's just static.
code = code.replace(/initial={{ scale: 1.15 }}/g, '');
code = code.replace(/animate={isOpen \? { scale: 1 } : {}}/g, '');
code = code.replace(/transition={{ duration: 2.2, ease: \[0.3, 0, 0.2, 1\] }}/g, '');

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed Aangan zoom!');
