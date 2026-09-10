import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace Section 8's top container class
content = content.replace(
  '<section className="relative z-10 w-full flex flex-col items-center justify-center bg-[#F8F0DF] py-10 pb-24 sm:py-20 md:py-28 lg:py-32 min-h-0 overflow-hidden">',
  '<section className="relative z-10 w-full flex flex-col items-center justify-center bg-[#F8F0DF] py-12 sm:py-20 md:py-28 lg:py-32 overflow-hidden">'
);

// Replace the custom background treatment with the exact matching standard block
const targetBg = `        {/* Master background */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-[#F8F0DF]">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 3, ease: "easeOut" } }}
            viewport={{ once: true, amount: 0.1 }}
            className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-[length:100%_auto] sm:bg-cover bg-top md:bg-center bg-no-repeat" 
            style={{ backgroundImage: \`url(\${ASSETS.familyBg})\` }}
          />
        </div>`;

const replaceBg = `        {/* Master background - matching approved sections exactly */}
        <motion.img 
          initial={{ scale: 1.05, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1, transition: { duration: 3, ease: "easeOut" } }}
          viewport={{ once: true, amount: 0.1 }}
          src={ASSETS.familyBg}
          alt=""
          className="absolute inset-0 w-full h-full object-fill z-0 pointer-events-none origin-center" 
        />`;

content = content.replace(targetBg, replaceBg);

fs.writeFileSync('src/App.tsx', content);
