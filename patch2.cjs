const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /<\/section>\s*\{\/\*\s*NEW SECTION:\s*INVITATION MESSAGE\s*\*\/\}\s*<section className="relative z-10 w-full min-h-\[100dvh\] flex flex-col items-center justify-center text-center bg-\[#F8F0DF\] overflow-hidden shadow-\[0_-10px_30px_rgba\(0,0,0,0\.15\)\]">/;

const replacement = `</section>

      {/* TRANSITION MASK LAYER */}
      <motion.div 
        className="absolute inset-0 z-50 pointer-events-none"
        style={{
          WebkitMaskImage: \`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 120'%3E%3Cpath d='M0,120 L100,120 L100,60 C100,45 90,45 85,35 C80,20 65,25 50,5 C35,25 20,20 15,35 C10,45 0,45 0,60 Z' fill='black' /%3E%3C/svg%3E")\`,
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: '50% 85%',
          WebkitMaskSize: maskStyle,
          maskImage: \`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 120'%3E%3Cpath d='M0,120 L100,120 L100,60 C100,45 90,45 85,35 C80,20 65,25 50,5 C35,25 20,20 15,35 C10,45 0,45 0,60 Z' fill='black' /%3E%3C/svg%3E")\`,
          maskRepeat: 'no-repeat',
          maskPosition: '50% 85%',
          maskSize: maskStyle,
        }}
      >
        <img src={ASSETS.invitation} className="w-full h-full object-cover object-top sm:object-center" alt="" />
      </motion.div>

        </motion.div>
      </div>

      {/* NEW SECTION: INVITATION MESSAGE */}
      <motion.div 
        className="-mt-[100dvh] relative z-10 w-full"
        style={{ visibility: invitationVisibility }}
      >
      <section className="relative z-10 w-full min-h-[100dvh] flex flex-col items-center justify-center text-center bg-[#F8F0DF] overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.15)]">`;

if (regex.test(code)) {
  fs.writeFileSync('src/App.tsx', code.replace(regex, replacement));
  console.log("Success");
} else {
  console.log("Target not found!");
}
