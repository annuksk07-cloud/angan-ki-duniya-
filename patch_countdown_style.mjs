import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  'className="text-[#B78B4A] font-noto text-[12px] sm:text-[14px] md:text-[16px] tracking-wider font-medium"',
  'className="text-[#B78B4A] font-noto text-[12px] sm:text-[14px] md:text-[16px] tracking-widest font-medium uppercase"'
);

// Add z-10 for the section class if it's missing just to match the overall stacking
content = content.replace(
  '<section className="relative w-full flex flex-col items-center text-center bg-[#F8F0DF] py-12 sm:py-20 md:py-28 lg:py-32 overflow-hidden">',
  '<section className="relative z-10 w-full flex flex-col items-center justify-center bg-[#F8F0DF] py-12 sm:py-20 md:py-28 lg:py-32 overflow-hidden">'
);

fs.writeFileSync('src/App.tsx', content);
