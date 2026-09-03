const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /<main\s+className="relative w-full min-h-\[100dvh\] overflow-x-hidden bg-\[#F8F0DF\] selection:bg-\[#D89A32\] selection:text-white"\s*>/;
const replacement = `<main 
      className={\`relative w-full min-h-[100dvh] overflow-x-hidden bg-[#F8F0DF] selection:bg-[#D89A32] selection:text-white \${!isOpen ? 'h-[100dvh] overflow-hidden' : ''}\`}
    >`;

if (regex.test(code)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Success");
} else {
  console.log("Target not found");
}
