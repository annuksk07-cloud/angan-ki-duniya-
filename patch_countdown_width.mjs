import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  'className="text-[#5A1520] text-3xl sm:text-4xl md:text-5xl font-tiro drop-shadow-sm mb-2 w-[48px] sm:w-[64px] md:w-[80px]"',
  'className="text-[#5A1520] text-3xl sm:text-4xl md:text-5xl font-tiro drop-shadow-sm mb-2 min-w-[56px] sm:min-w-[72px] md:min-w-[90px]"'
);

fs.writeFileSync('src/App.tsx', content);
