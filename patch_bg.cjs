const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Update asset
code = code.replace(
  /invitation: "https:\/\/lh3\.googleusercontent\.com\/d\/1DwFZLihmAm0THV9VZ3EAtvhcUaCZjqVr"/,
  'invitation: "https://lh3.googleusercontent.com/d/1RsonDmsv55Iz00WvGFoqcEjdKwVKsJpR"'
);

// Import useScroll, useTransform if needed
if (!code.includes('useScroll')) {
  code = code.replace(
    /import \{ motion, AnimatePresence, useMotionValue, useTransform, animate \} from 'motion\/react';/,
    "import { motion, AnimatePresence, useMotionValue, useTransform, animate, useScroll } from 'motion/react';"
  );
}

// Add ref for the invitation section
const sectionRegex = /<section className="relative z-10 w-full min-h-\[100dvh\] flex flex-col items-center justify-center text-center bg-\[#F8F0DF\] overflow-hidden shadow-\[0_-10px_30px_rgba\(0,0,0,0\.15\)\]">/;
const sectionReplacement = `
  const invRef = useRef<HTMLElement>(null);
  const { scrollYProgress: invScroll } = useScroll({ target: invRef, offset: ["start end", "end start"] });
  const invScale = useTransform(invScroll, [0, 0.5], [1.15, 1]);
  const invY = useTransform(invScroll, [0, 1], ["-10%", "10%"]);

  return (
...`; // wait, injecting hooks in the middle of JSX is bad. I must inject hooks inside the component.

fs.writeFileSync('src/App.tsx', code);
console.log("Updated asset");
