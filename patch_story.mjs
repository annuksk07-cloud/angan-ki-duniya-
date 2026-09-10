import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Fix Section 8 main tag
content = content.replace(
  /<section className="relative z-10 w-full flex flex-col items-center justify-center bg-\[\#F8F0DF\] py-10 sm:py-20 md:py-28 lg:py-32 min-h-\[100svh\] md:min-h-0 overflow-hidden">/g,
  '<section className="relative z-10 w-full flex flex-col items-center justify-center bg-[#F8F0DF] py-10 pb-24 sm:py-20 md:py-28 lg:py-32 min-h-0 overflow-hidden">'
);

// Fix background
content = content.replace(
  /\{\/\* Master background - decorative layer covering the entire section \*\/\}\s*<motion\.div\s*initial=\{\{ opacity: 0 \}\}\s*whileInView=\{\{ opacity: 1, transition: \{ duration: 3, ease: "easeOut" \} \}\}\s*viewport=\{\{ once: true, amount: 0\.1 \}\}\s*className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-\[length:100%_auto\] sm:bg-cover bg-top md:bg-center bg-no-repeat"\s*style=\{\{ backgroundImage: `url\(\$\{ASSETS\.familyBg\}\)` \}\}\s*\/>/,
  `{/* Master background */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-[#F8F0DF]">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 3, ease: "easeOut" } }}
            viewport={{ once: true, amount: 0.1 }}
            className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-[length:100%_auto] sm:bg-cover bg-top md:bg-center bg-no-repeat" 
            style={{ backgroundImage: \`url(\${ASSETS.familyBg})\` }}
          />
        </div>`
);

fs.writeFileSync('src/App.tsx', content);
