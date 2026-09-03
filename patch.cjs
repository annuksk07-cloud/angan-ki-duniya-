const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Replace the imports
code = code.replace(
  "import { motion, AnimatePresence, useMotionValue, useTransform, animate, useScroll, useMotionTemplate } from 'motion/react';",
  "import { motion, AnimatePresence, useMotionValue, useTransform, animate, useScroll } from 'motion/react';"
);

// 2. Replace the hooks at the top of App()
const hooksRegex = /const transitionRef = useRef<HTMLDivElement>\(null\);[\s\S]*?const invitationVisibility = useTransform\(scrollYProgress, v => v >= 1 \? "visible" : "hidden"\);/;
const newHooks = `const transitionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: transitionRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const heroOpacity = useTransform(scrollYProgress, [0.1, 0.9], [1, 0]);
  const veilOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.9], [0, 0.85, 0]);
  const heroPointerEvents = useTransform(scrollYProgress, v => v > 0.5 ? "none" : "auto");`;
code = code.replace(hooksRegex, newHooks);

// 3. Replace the Hero wrapper start
const heroStartRegex = /\{\/\* HERO SECTION WRAPPED IN TRANSITION \*\/\}\s*<div ref=\{transitionRef\} className="relative w-full h-\[200dvh\] z-20">\s*<motion\.div\s*className="sticky top-0 w-full h-\[100dvh\] overflow-hidden"\s*style=\{\{ visibility: stickyVisibility \}\}\s*>/;
const newHeroStart = `{/* 1. HERO SECTION WRAPPED IN TRANSITION */}
      <div ref={transitionRef} className="relative w-full h-[150dvh] z-20">
        <motion.div 
          className="sticky top-0 w-full h-[100dvh] overflow-hidden"
          style={{ opacity: heroOpacity, pointerEvents: heroPointerEvents }}
        >`;
code = code.replace(heroStartRegex, newHeroStart);

// 4. Add heroScale to the hero background
const heroBgRegex = /\{\/\* 1\. Hero Background \(Base Room\) \*\/\}\s*<motion\.div\s*className="absolute inset-0 z-0 origin-center"\s*>/;
const newHeroBg = `{/* 1. Hero Background (Base Room) */}
            <motion.div
              className="absolute inset-0 z-0 origin-center"
              style={{ scale: heroScale }}
            >`;
code = code.replace(heroBgRegex, newHeroBg);

// 5. Replace the mask layer and the Invitation start
const transitionMaskRegex = /\{\/\* TRANSITION MASK LAYER \*\/\}\s*<motion\.div[\s\S]*?alt="" \/>\s*<\/motion\.div>\s*<\/motion\.div>\s*<\/div>\s*\{\/\* NEW SECTION: INVITATION MESSAGE \*\/\}\s*<motion\.div\s*className="-mt-\[100dvh\] relative z-10 w-full"\s*style=\{\{ visibility: invitationVisibility \}\}\s*>\s*<section className="relative z-10 w-full min-h-\[100dvh\] flex flex-col items-center justify-center text-center bg-\[#F8F0DF\] overflow-hidden shadow-\[0_-10px_30px_rgba\(0,0,0,0\.15\)\]">/;
const newTransitionAndInvStart = `{/* Cinematic Light Veil */}
        <motion.div 
          className="absolute inset-0 z-[100] pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(253,245,230,0.9)_0%,rgba(253,245,230,0)_80%)]"
          style={{ opacity: veilOpacity }}
        />
      </section>
      </motion.div>
      </div>

      {/* 2. INVITATION SECTION (Separate normal section, overlapping) */}
      <div className="relative z-10 w-full h-[150dvh] -mt-[150dvh] pointer-events-auto">
        <div className="sticky top-0 w-full h-[100dvh] overflow-hidden bg-[#F8F0DF]">
          <section className="relative z-10 w-full min-h-[100dvh] flex flex-col items-center justify-center text-center bg-[#F8F0DF] overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.15)]">`;
code = code.replace(transitionMaskRegex, newTransitionAndInvStart);

// 6. Replace the Invitation end closing tags
const endRegex = /<\/section>\s*<\/motion\.div>\s*<\/main>/;
const newEnd = `</section>
        </div>
      </div>
    </main>`;
code = code.replace(endRegex, newEnd);

fs.writeFileSync('src/App.tsx', code);
console.log("Success");
