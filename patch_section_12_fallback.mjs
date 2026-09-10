import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const lastMainIdx = content.lastIndexOf('</main>');
if (lastMainIdx !== -1) {
  const before = content.substring(0, lastMainIdx);
  const after = content.substring(lastMainIdx);

  const newSection = `
      {/* FINAL SECTION: आपका आशीर्वाद */}
      <section className="relative w-full flex flex-col items-center justify-center text-center bg-[#F8F0DF] py-16 sm:py-24 md:py-32 lg:py-40 min-h-[100svh] md:min-h-[82svh] lg:min-h-[100svh] overflow-hidden">
        {/* Master background - Slow ambient breathing */}
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1.02, opacity: 1, transition: { duration: 4, ease: "easeOut" } }}
          animate={{ scale: [1.02, 1.05, 1.02] }}
          transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
          viewport={{ once: true, amount: 0.1 }}
          src={ASSETS.familyBg}
          alt=""
          className="absolute inset-0 w-full h-full object-fill z-0 pointer-events-none origin-center opacity-90" 
        />
        
        {/* Warm Overlay to make it feel settled */}
        <div className="absolute inset-0 bg-[#F8F0DF]/30 z-0 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(255,248,235,0.85)_0%,rgba(248,240,223,0.2)_60%,transparent_100%)] pointer-events-none blur-3xl z-0" />

        <div className="relative z-10 w-full max-w-[90%] sm:max-w-4xl lg:max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 1.8, ease: "easeOut", staggerChildren: 0.3 } }
            }}
            className="flex flex-col items-center text-center w-full"
          >
            <motion.h2 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 1.5 } } }} className="text-[#5A1520] text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-tiro mb-8 sm:mb-12 drop-shadow-sm tracking-wide">
              आपका आशीर्वाद
            </motion.h2>
            
            <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 2 } } }} className="text-[#4A2014] font-noto text-[16px] sm:text-[19px] md:text-[22px] leading-[2.2] font-medium opacity-90 mb-10 sm:mb-14 max-w-[300px] sm:max-w-md mx-auto">
              आपका साथ, आपका स्नेह और आपका आशीर्वाद<br />
              हमारे लिए इस नए सफ़र की सबसे सुंदर शुरुआत है।
            </motion.p>

            <motion.div variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 1.5 } } }} className="flex flex-col items-center mb-10 sm:mb-16">
              <span className="text-[#5A1520] font-amita text-[26px] sm:text-[34px] md:text-[42px] mb-3 drop-shadow-md">काव्या & आदित्य</span>
              <span className="text-[#B78B4A] font-tiro italic text-[15px] sm:text-[18px] opacity-80">With love and gratitude</span>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 1.5 } } }} className="flex flex-col items-center gap-1.5 sm:gap-2 mb-14 sm:mb-20">
              <span className="text-[#B78B4A] font-noto text-[15px] sm:text-[17px] font-medium tracking-[0.2em] uppercase">12 December 2026</span>
              <span className="text-[#B78B4A] font-noto text-[14px] sm:text-[15px] tracking-[0.1em] uppercase opacity-80">Jaipur, Rajasthan</span>
            </motion.div>

            <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 2, delay: 0.5 } } }} className="text-[#5A1520] font-noto text-[14px] sm:text-[16px] font-medium tracking-wide opacity-70 italic border-t border-[#B78B4A]/30 pt-6 px-4 w-[80%] sm:w-[60%]">
              “आँगन से मंडप तक — एक निमंत्रण, एक उत्सव, एक याद।”
            </motion.p>

          </motion.div>
        </div>
      </section>
`;
  content = before + newSection + after;
  fs.writeFileSync('src/App.tsx', content);
  console.log("Successfully appended Final Section");
} else {
  console.log("Could not find insertion point.");
}
