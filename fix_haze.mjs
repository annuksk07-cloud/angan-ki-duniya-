import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Fix Top Valance
code = code.replace(
  "style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 12%, transparent 22%)', maskImage: 'linear-gradient(to bottom, black 12%, transparent 22%)' }}",
  "style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 16%, transparent 18%)', maskImage: 'linear-gradient(to bottom, black 16%, transparent 18%)' }}"
);

// Fix Left Curtain Mask
code = code.replace(
  "WebkitMaskImage: 'linear-gradient(to bottom, transparent 12%, black 22%)', \n            maskImage: 'linear-gradient(to bottom, transparent 12%, black 22%)'",
  ""
);

// Fix Right Curtain Mask
code = code.replace(
  "WebkitMaskImage: 'linear-gradient(to bottom, transparent 12%, black 22%)', \n            maskImage: 'linear-gradient(to bottom, transparent 12%, black 22%)'",
  ""
);

// Clean up empty lines or trailing commas if any (optional, JS objects usually forgive it, but TS might complain if we leave a trailing comma, wait, the replace removes the property but leaves a comma maybe?)
// Let's just use regex to replace the whole style object for Left/Right curtains.

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed haze attempt 1');
