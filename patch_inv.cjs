const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('useScroll')) {
  code = code.replace(
    /import \{ motion, AnimatePresence, useMotionValue, useTransform, animate \} from 'motion\/react';/,
    "import { motion, AnimatePresence, useMotionValue, useTransform, animate, useScroll } from 'motion/react';"
  );
}
if (!code.includes('useRef')) {
  code = code.replace(
    /import React, \{ useState, useEffect \} from 'react';/,
    "import React, { useState, useEffect, useRef } from 'react';"
  );
}

// Add hooks
if (!code.includes('invRef')) {
  code = code.replace(
    /export default function App\(\) \{/,
    `export default function App() {
  const invRef = useRef<HTMLElement>(null);
  const { scrollYProgress: invScroll } = useScroll({ target: invRef, offset: ["start end", "end start"] });
  const invScale = useTransform(invScroll, [0, 0.5], [1.15, 1]);
  const invY = useTransform(invScroll, [0, 1], ["-10%", "10%"]);`
  );
}

// Attach ref and adjust layout to Invitation section
// The current code is:
// <section className="relative z-10 w-full min-h-[100dvh] flex flex-col items-center justify-center text-center bg-[#F8F0DF] overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.15)]">
// <div className="absolute inset-0 z-0 overflow-hidden bg-[#F8F0DF]">
// <motion.div className="w-full h-full origin-center" animate={{ scale: [1, 1.05] }} transition={{ duration: 25, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}>
// <img src={ASSETS.invitation} alt="Invitation Background" className="w-full h-full object-cover object-top sm:object-center" />

code = code.replace(
  /<section className="relative z-10 w-full min-h-\[100dvh\] flex flex-col items-center justify-center text-center bg-\[#F8F0DF\] overflow-hidden shadow-\[0_-10px_30px_rgba\(0,0,0,0\.15\)\]">/,
  `<section ref={invRef} className="relative z-10 w-full min-h-[100dvh] flex flex-col items-center justify-center text-center bg-[#F8F0DF] overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.15)]">`
);

// We want to combine the 1.15 -> 1 scroll scale with the infinite slow scale
// We can apply the scroll scale and parallax Y to the container, and the breathing scale to the image
const bgLayerRegex = /<motion\.div\s*className="w-full h-full origin-center"\s*animate=\{\{ scale: \[1, 1\.05\] \}\}\s*transition=\{\{ duration: 25, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" \}\}\s*>\s*<img\s*src=\{ASSETS\.invitation\}\s*alt="Invitation Background"\s*className="w-full h-full object-cover object-top sm:object-center"\s*\/>\s*<\/motion\.div>/;

const bgLayerReplacement = `<motion.div 
            className="w-full h-full origin-center"
            style={{ scale: invScale, y: invY }}
          >
            <motion.div
              className="w-full h-full origin-center"
              animate={{ scale: [1, 1.05] }}
              transition={{ duration: 25, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
            >
              <img 
                src={ASSETS.invitation} 
                alt="Invitation Background" 
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </motion.div>`;
code = code.replace(bgLayerRegex, bgLayerReplacement);

// Let's refine the text container padding so it perfectly fits within the arch.
// "Place the invitation text exactly in the clean central area of the background. Keep all text readable, centred and well spaced."
// "Show the background image fully and beautifully on mobile. Do not crop the main arch awkwardly. Keep the composition centred."
// Old padding: py-[18dvh] sm:py-12. Let's make it py-[12dvh] sm:py-16.
code = code.replace(
  /<div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center justify-center px-6 py-\[18dvh\] sm:py-12">/,
  `<div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center justify-center px-6 py-[12dvh] sm:py-16">`
);

fs.writeFileSync('src/App.tsx', code);
console.log("Success");
