import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const targetStr = `    const waNumber = '[WHATSAPP NUMBER — ADD HERE]';
    const url = \`https://wa.me/\${waNumber}?text=\${encodeURIComponent(text)}\`;`;

const replacementStr = `    // Use the existing configured number directly in international format (digits only)
    const waNumber = '917827357021'; // [WHATSAPP NUMBER — ADD HERE]
    const url = \`https://wa.me/\${waNumber}?text=\${encodeURIComponent(text)}\`;`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Successfully patched WhatsApp number.");
} else {
  console.log("Could not find target string.");
}
