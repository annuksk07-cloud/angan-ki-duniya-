const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const swayStateRegex = /const \[leftHooked, setLeftHooked\] = useState\(false\);/;
const swayStateReplacement = `const [leftHooked, setLeftHooked] = useState(false);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  // Left Curtain Sway
  const swayLeft = {
    closed: {
      scaleX: [1, 1.015, 0.99, 1.008, 0.995, 1],
      skewX: [0, 0.5, -0.3, 0.4, -0.1, 0],
      transition: { duration: 22, repeat: Infinity, ease: "easeInOut" }
    },
    opened: {
      scaleX: [1, 1.005, 0.995, 1.002, 1],
      skewX: [0, 0.15, -0.1, 0.05, 0],
      transition: { duration: 25, repeat: Infinity, ease: "easeInOut" }
    },
    dragging: {
      scaleX: 1,
      skewX: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Right Curtain Sway
  const swayRight = {
    closed: {
      scaleX: [1, 0.985, 1.01, 0.992, 1.005, 1],
      skewX: [0, -0.4, 0.3, -0.5, 0.2, 0],
      transition: { duration: 26, repeat: Infinity, ease: "easeInOut" }
    },
    opened: {
      scaleX: [1, 0.995, 1.005, 0.998, 1],
      skewX: [0, -0.1, 0.15, -0.05, 0],
      transition: { duration: 29, repeat: Infinity, ease: "easeInOut" }
    },
    dragging: {
      scaleX: 1,
      skewX: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };`;

code = code.replace(swayStateRegex, swayStateReplacement);

const leftCurtainRegex = /<div className="absolute inset-y-0 left-0 w-\[100vw\] flex justify-center">\s*<img\s*src=\{ASSETS.curtain\}\s*className="w-\[125vw\] h-\[115dvh\] -translate-y-\[7dvh\] object-cover object-top max-w-none flex-shrink-0"\s*alt=""\s*\/>\s*<\/div>/;
const leftCurtainReplacement = `<motion.div 
              className="absolute inset-y-0 left-0 w-[100vw] flex justify-center origin-top"
              animate={isDraggingLeft ? "dragging" : leftHooked ? "opened" : "closed"}
              variants={swayLeft}
            >
              <img 
                src={ASSETS.curtain} 
                className="w-[125vw] h-[115dvh] -translate-y-[7dvh] object-cover object-top max-w-none flex-shrink-0" 
                alt="" 
              />
            </motion.div>`;

code = code.replace(leftCurtainRegex, leftCurtainReplacement);

const rightCurtainRegex = /<div className="absolute inset-y-0 right-0 w-\[100vw\] flex justify-center">\s*<img\s*src=\{ASSETS.curtain\}\s*className="w-\[125vw\] h-\[115dvh\] -translate-y-\[7dvh\] object-cover object-top max-w-none flex-shrink-0"\s*alt=""\s*\/>\s*<\/div>/;
const rightCurtainReplacement = `<motion.div 
              className="absolute inset-y-0 right-0 w-[100vw] flex justify-center origin-top"
              animate={isDraggingRight ? "dragging" : rightHooked ? "opened" : "closed"}
              variants={swayRight}
            >
              <img 
                src={ASSETS.curtain} 
                className="w-[125vw] h-[115dvh] -translate-y-[7dvh] object-cover object-top max-w-none flex-shrink-0" 
                alt="" 
              />
            </motion.div>`;
code = code.replace(rightCurtainRegex, rightCurtainReplacement);

const leftDragRegex = /onDragEnd=\{handleDragEndLeft\}/;
const leftDragReplacement = `onDragStart={() => setIsDraggingLeft(true)}
            onDragEnd={(e, info) => {
              setIsDraggingLeft(false);
              handleDragEndLeft(e, info);
            }}`;
code = code.replace(leftDragRegex, leftDragReplacement);

const rightDragRegex = /onDragEnd=\{handleDragEndRight\}/;
const rightDragReplacement = `onDragStart={() => setIsDraggingRight(true)}
            onDragEnd={(e, info) => {
              setIsDraggingRight(false);
              handleDragEndRight(e, info);
            }}`;
code = code.replace(rightDragRegex, rightDragReplacement);

fs.writeFileSync('src/App.tsx', code);
console.log("Success");
