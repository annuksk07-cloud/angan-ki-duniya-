import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Make the Top Valance cut even sharper so there's NO haze
code = code.replace(
  "linear-gradient(to bottom, black 16%, transparent 18%)', maskImage: 'linear-gradient(to bottom, black 16%, transparent 18%)",
  "linear-gradient(to bottom, black 17%, transparent 17.5%)', maskImage: 'linear-gradient(to bottom, black 17%, transparent 17.5%)"
);

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed haze sharpness');
