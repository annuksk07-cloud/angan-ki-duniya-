const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /<\/section>\s*\{\/\* Cinematic Light Veil \*\/\}\s*<motion\.div\s*className="absolute inset-0 z-\[100\] pointer-events-none bg-\[radial-gradient\(ellipse_at_center,rgba\(253,245,230,0\.9\)_0%,rgba\(253,245,230,0\)_80%\)\]"\s*style=\{\{ opacity: veilOpacity \}\}\s*\/>\s*<\/section>\s*<\/motion\.div>\s*<\/div>/;

const replacement = `
      {/* Cinematic Light Veil */}
      <motion.div 
        className="absolute inset-0 z-[100] pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(253,245,230,0.9)_0%,rgba(253,245,230,0)_80%)]"
        style={{ opacity: veilOpacity }}
      />
    </section>
  </motion.div>
</div>`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/App.tsx', code);
console.log("Success");
