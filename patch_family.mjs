import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace left wrapper
content = content.replace(
  '<motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 0.8, scale: 1, transition: { duration: 2, ease: "easeOut", delay: 1.5 } } }} className="absolute top-0 bottom-0 left-[-6px] sm:left-[-10px] md:left-0 pointer-events-none flex items-center justify-start z-0 botanical-left-wrapper">\n                <img \n                  src={ASSETS.botanicalLineage} \n                  className="h-[85%] sm:h-[90%] w-auto object-contain object-left drop-shadow-[0_2px_4px_rgba(90,21,32,0.15)] botanical-left" \n                  alt="" \n                />\n              </motion.div>',
  '<motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 0.8, scale: 1, transition: { duration: 2, ease: "easeOut", delay: 1.5 } } }} className="absolute top-1/2 -translate-y-1/2 left-[-20px] sm:left-[-40px] md:left-[-50px] pointer-events-none flex items-center justify-start z-0 botanical-left-wrapper">\n                <img \n                  src={ASSETS.botanicalLineage} \n                  className="h-[220px] sm:h-[320px] md:h-[400px] w-auto object-contain object-left drop-shadow-[0_2px_4px_rgba(90,21,32,0.15)] botanical-left" \n                  alt="" \n                />\n              </motion.div>'
);

// Replace right wrapper
content = content.replace(
  '<motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 0.8, scale: 1, transition: { duration: 2, ease: "easeOut", delay: 1.5 } } }} className="absolute top-0 bottom-0 right-[-6px] sm:right-[-10px] md:right-0 pointer-events-none flex items-center justify-end scale-x-[-1] z-0 botanical-right-wrapper">\n                <img \n                  src={ASSETS.botanicalLineage} \n                  className="h-[85%] sm:h-[90%] w-auto object-contain object-left drop-shadow-[0_2px_4px_rgba(90,21,32,0.15)] botanical-right" \n                  alt="" \n                />\n              </motion.div>',
  '<motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 0.8, scale: 1, transition: { duration: 2, ease: "easeOut", delay: 1.5 } } }} className="absolute top-1/2 -translate-y-1/2 right-[-20px] sm:right-[-40px] md:right-[-50px] pointer-events-none flex items-center justify-end scale-x-[-1] z-0 botanical-right-wrapper">\n                <img \n                  src={ASSETS.botanicalLineage} \n                  className="h-[220px] sm:h-[320px] md:h-[400px] w-auto object-contain object-left drop-shadow-[0_2px_4px_rgba(90,21,32,0.15)] botanical-right" \n                  alt="" \n                />\n              </motion.div>'
);

fs.writeFileSync('src/App.tsx', content);
