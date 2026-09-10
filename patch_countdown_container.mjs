import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace the section wrapper for CountdownSection to match Events exactly
content = content.replace(
  '<section className="relative z-10 w-full flex flex-col items-center justify-center bg-[#F8F0DF] py-12 sm:py-20 md:py-28 lg:py-32 overflow-hidden">',
  '<section className="relative w-full flex flex-col items-center text-center bg-[#F8F0DF] py-12 sm:py-20 md:py-28 lg:py-32 min-h-[100svh] md:min-h-[82svh] lg:min-h-0 overflow-hidden">'
);

fs.writeFileSync('src/App.tsx', content);
