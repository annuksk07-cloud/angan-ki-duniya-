import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Patch the mobile nav so it is also safely inside the center
const targetNav = `            {/* Mobile Nav */}
            <div className="relative w-full flex flex-col items-center z-20 mt-4 mb-2">
              <div className="flex items-center gap-3 text-[#B78B4A] text-xs opacity-70 mb-4 tracking-widest font-noto">
                <span className={storyPage === 0 ? "opacity-100 font-bold scale-110 transition-transform" : ""}>01</span> • 
                <span className={storyPage === 1 ? "opacity-100 font-bold scale-110 transition-transform" : ""}>02</span> • 
                <span className={storyPage === 2 ? "opacity-100 font-bold scale-110 transition-transform" : ""}>03</span>
              </div>
              <div className="flex items-center justify-between w-full px-8 sm:px-16">
                 <button 
                   onClick={() => paginateStory(-1)} 
                   className={\`text-[#5A1520] font-noto text-[13px] font-medium tracking-wide opacity-90 transition-opacity \${storyPage === 0 ? 'invisible' : 'visible'}\`}
                 >
                   ← पिछली कहानी
                 </button>
                 <button 
                   onClick={() => paginateStory(1)} 
                   className={\`text-[#5A1520] font-noto text-[13px] font-medium tracking-wide opacity-90 transition-opacity \${storyPage === 2 ? 'invisible' : 'visible'}\`}
                 >
                   अगली कहानी →
                 </button>
              </div>
            </div>`;

const replaceNav = `            {/* Mobile Nav */}
            <div className="relative w-[72%] max-w-[270px] mx-auto flex flex-col items-center z-20 mt-4 mb-2">
              <div className="flex items-center gap-3 text-[#B78B4A] text-xs opacity-70 mb-4 tracking-widest font-noto">
                <span className={storyPage === 0 ? "opacity-100 font-bold scale-110 transition-transform" : ""}>01</span> • 
                <span className={storyPage === 1 ? "opacity-100 font-bold scale-110 transition-transform" : ""}>02</span> • 
                <span className={storyPage === 2 ? "opacity-100 font-bold scale-110 transition-transform" : ""}>03</span>
              </div>
              <div className="flex items-center justify-between w-full">
                 <button 
                   onClick={() => paginateStory(-1)} 
                   className={\`text-[#5A1520] font-noto text-[13px] font-medium tracking-wide opacity-90 transition-opacity \${storyPage === 0 ? 'invisible' : 'visible'}\`}
                 >
                   ← पिछली
                 </button>
                 <button 
                   onClick={() => paginateStory(1)} 
                   className={\`text-[#5A1520] font-noto text-[13px] font-medium tracking-wide opacity-90 transition-opacity \${storyPage === 2 ? 'invisible' : 'visible'}\`}
                 >
                   अगली →
                 </button>
              </div>
            </div>`;

content = content.replace(targetNav, replaceNav);

// Patch the ending text
const targetEndingText = `          {/* Ending Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut" } } }}
            className={\`w-full text-center mt-2 sm:mt-12 md:mt-16 mb-2 md:mb-8 \${storyPage === 2 ? "block" : "hidden md:block"}\`}
          >
            <p className="text-[#5A1520] text-[16px] sm:text-[20px] md:text-[26px] font-amita leading-relaxed drop-shadow-sm max-w-[95%] mx-auto opacity-95">
              “और अब, इस कहानी का सबसे सुंदर अध्याय<br className="block sm:hidden" /> शुरू होने वाला है…”
            </p>
          </motion.div>`;

const replaceEndingText = `          {/* Ending Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut" } } }}
            className={\`w-[72%] max-w-[270px] md:w-full md:max-w-none mx-auto text-center mt-4 sm:mt-12 md:mt-16 mb-6 md:mb-8 \${storyPage === 2 ? "block" : "hidden md:block"}\`}
          >
            <p className="text-[#5A1520] text-[16px] sm:text-[20px] md:text-[26px] font-amita leading-relaxed drop-shadow-sm w-full mx-auto opacity-95">
              “और अब, इस कहानी का सबसे सुंदर अध्याय<br className="block md:hidden" /> शुरू होने वाला है…”
            </p>
          </motion.div>`;
          
content = content.replace(targetEndingText, replaceEndingText);

fs.writeFileSync('src/App.tsx', content);
