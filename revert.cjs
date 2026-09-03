const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Imports
code = code.replace(
  "import React, { useState, useEffect, useRef } from 'react';",
  "import React, { useState, useEffect } from 'react';"
);
code = code.replace(
  "import { motion, AnimatePresence, useMotionValue, useTransform, animate, useScroll } from 'motion/react';",
  "import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'motion/react';"
);

// 2. Hooks
const hooksRegex = /const transitionRef = useRef<HTMLDivElement>\(null\);[\s\S]*?const heroPointerEvents = useTransform\(scrollYProgress, v => v > 0\.5 \? "none" : "auto"\);/;
code = code.replace(hooksRegex, "");

// 3. Hero Wrapper Start
const heroStartRegex = /\{\/\* 1\. HERO SECTION WRAPPED IN TRANSITION \*\/\}\s*<div ref=\{transitionRef\} className="relative w-full h-\[150dvh\] z-20">\s*<motion\.div\s*className="sticky top-0 w-full h-\[100dvh\] overflow-hidden"\s*style=\{\{ opacity: heroOpacity, pointerEvents: heroPointerEvents \}\}\s*>\s*\{\/\* HERO SECTION \*\/\}/;
code = code.replace(heroStartRegex, "{/* HERO SECTION */}");

// 4. Hero Bg
const heroBgRegex = /\{\/\* 1\. Hero Background \(Base Room\) \*\/\}\s*<motion\.div\s*className="absolute inset-0 z-0 origin-center"\s*style=\{\{ scale: heroScale \}\}\s*>/;
const heroBgNew = `{/* 1. Hero Background (Base Room) */}
            <motion.div
              className="absolute inset-0 z-0 origin-center"
            >`;
code = code.replace(heroBgRegex, heroBgNew);

// 5. Middle Wrappers
const middleRegex = /\{\/\* Cinematic Light Veil \*\/\}\s*<motion\.div\s*className="absolute inset-0 z-\[100\] pointer-events-none bg-\[radial-gradient\(ellipse_at_center,rgba\(253,245,230,0\.9\)_0%,rgba\(253,245,230,0\)_80%\)\]"\s*style=\{\{ opacity: veilOpacity \}\}\s*\/>\s*<\/section>\s*<\/motion\.div>\s*<\/div>\s*\{\/\* 2\. INVITATION SECTION \(Separate normal section, overlapping\) \*\/\}\s*<div className="relative z-10 w-full h-\[150dvh\] -mt-\[150dvh\] pointer-events-auto">\s*<div className="sticky top-0 w-full h-\[100dvh\] overflow-hidden bg-\[#F8F0DF\]">\s*<section className="relative z-10 w-full min-h-\[100dvh\] flex flex-col items-center justify-center text-center bg-\[#F8F0DF\] overflow-hidden shadow-\[0_-10px_30px_rgba\(0,0,0,0\.15\)\]">/;
const middleNew = `      </section>

      {/* NEW SECTION: INVITATION MESSAGE */}
      <section className="relative z-10 w-full min-h-[100dvh] flex flex-col items-center justify-center text-center bg-[#F8F0DF] overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.15)]">`;
code = code.replace(middleRegex, middleNew);

// 6. End Wrappers
const endRegex = /<\/section>\s*<\/div>\s*<\/div>\s*<\/main>/;
const endNew = `      </section>
    </main>`;
code = code.replace(endRegex, endNew);

fs.writeFileSync('src/App.tsx', code);
console.log("Revert complete.");
