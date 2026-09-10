import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const targetStr = `      </section>
    </main>
  );
}`;

const replacementStr = `      </section>

      {/* SECTION 10: VENUE */}
      <section className="relative w-full flex flex-col items-center text-center bg-[#F8F0DF] py-12 sm:py-20 md:py-28 lg:py-32 min-h-[100svh] md:min-h-[82svh] lg:min-h-0 overflow-hidden">
        {/* Master background */}
        <motion.img 
          initial={{ scale: 1.05, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1, transition: { duration: 3, ease: "easeOut" } }}
          viewport={{ once: true, amount: 0.1 }}
          src={ASSETS.familyBg}
          alt=""
          className="absolute inset-0 w-full h-full object-fill z-0 pointer-events-none origin-center" 
        />
        
        {/* Venue Content */}
        <div className="relative z-10 w-full max-w-[90%] sm:max-w-4xl lg:max-w-6xl mx-auto flex flex-col items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut", staggerChildren: 0.2 } }
            }}
            className="flex flex-col items-center text-center w-full relative"
          >
            {/* Subtle warm glow around content */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,248,235,0.7)_0%,transparent_70%)] pointer-events-none blur-2xl -z-10" />

            <motion.h2 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-[#5A1520] text-[28px] sm:text-4xl md:text-5xl font-tiro mb-6 sm:mb-8 drop-shadow-sm">आपका आगमन</motion.h2>
            
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} className="mb-6 sm:mb-8">
              <img src={ASSETS.goldDivider} alt="" className="w-24 sm:w-32 h-auto opacity-80 drop-shadow-sm" />
            </motion.div>

            <motion.p variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} className="text-[#4A2014] font-noto text-[16px] sm:text-[19px] md:text-[21px] leading-[2] font-medium mb-10 sm:mb-12 drop-shadow-sm">
              हमारे शुभ विवाह में आपका सादर स्वागत है।
            </motion.p>
            
            {/* Venue Details */}
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col items-center mb-8 sm:mb-10">
              <span className="text-[#5A1520] text-[22px] sm:text-[28px] md:text-[32px] font-tiro mb-2 drop-shadow-sm">Jai Mahal Palace</span>
              <span className="text-[#B78B4A] font-noto text-[16px] sm:text-[20px] font-medium tracking-wide drop-shadow-sm">Jaipur, Rajasthan</span>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col items-center mb-8 sm:mb-10">
              <span className="text-[#B78B4A] font-noto text-[18px] sm:text-[22px] md:text-[24px] font-medium tracking-widest drop-shadow-sm mb-2">12 December 2026</span>
              <span className="text-[#5A1520] font-amita text-[18px] sm:text-[22px] md:text-[24px] drop-shadow-sm">रात्रि 9:00 बजे</span>
            </motion.div>

            <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-[#4A2014] font-noto text-[14px] sm:text-[16px] md:text-[18px] leading-[1.8] opacity-85 mb-12 sm:mb-16 max-w-[280px] sm:max-w-md mx-auto drop-shadow-sm">
              Jacob Road, Civil Lines,<br />
              Jaipur, Rajasthan 302006
            </motion.p>

            {/* Buttons */}
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col sm:flex-row items-center justify-center w-full gap-5 sm:gap-8">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Jai+Mahal+Palace,+Jacob+Road,+Civil+Lines,+Jaipur,+Rajasthan+302006" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative group flex items-center justify-center px-10 py-3.5 bg-gradient-to-br from-[#F4E6C8] to-[#E8D1A7] border border-[#B78B4A]/60 rounded-sm shadow-[0_4px_14px_rgba(90,21,32,0.12)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(90,21,32,0.18)] hover:-translate-y-0.5 overflow-hidden w-[80%] sm:w-auto max-w-[280px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFF8EB]/60 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                <span className="relative z-10 text-[#5A1520] font-noto text-[15px] sm:text-[17px] font-medium tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
                  स्थान देखें →
                </span>
              </a>

              <a 
                href="tel:7827357021"
                className="relative group flex items-center justify-center px-10 py-3.5 bg-[#F8F0DF]/50 border border-[#5A1520]/30 rounded-sm shadow-sm transition-all duration-300 hover:bg-[#F4E6C8]/80 hover:border-[#5A1520]/50 hover:-translate-y-0.5 w-[80%] sm:w-auto max-w-[280px]"
              >
                <span className="relative z-10 text-[#5A1520] font-noto text-[15px] sm:text-[17px] font-medium tracking-wide">
                  संपर्क करें
                </span>
              </a>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </main>
  );
}`;

content = content.replace(targetStr, replacementStr);
fs.writeFileSync('src/App.tsx', content);
