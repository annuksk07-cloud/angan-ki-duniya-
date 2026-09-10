import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const targetStr = `      {/* NEW SECTION: INVITATION MESSAGE */}`;
const replacementStr = `      {/* SECTION 2: LIVE WEDDING COUNTDOWN */}
      <CountdownSection />

      {/* NEW SECTION: INVITATION MESSAGE */}`;

content = content.replace(targetStr, replacementStr);
fs.writeFileSync('src/App.tsx', content);
