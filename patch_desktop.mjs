import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Fix object-fill -> object-cover object-center
content = content.replace(/object-fill/g, 'object-cover object-center');

// 2. Fix lg:min-h-0 -> lg:min-h-[100vh]
content = content.replace(/lg:min-h-0/g, 'lg:min-h-[100vh]');

// 3. Fix Section 7 (which has min-h-0 md:min-h-[82vh])
content = content.replace(
  'min-h-0 md:min-h-[82vh] overflow-hidden',
  'min-h-0 md:min-h-[82vh] lg:min-h-[100vh] overflow-hidden'
);

fs.writeFileSync('src/App.tsx', content);
console.log("Desktop fixes applied.");
