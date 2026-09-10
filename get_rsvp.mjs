import fs from 'fs';

const content = fs.readFileSync('src/App.tsx', 'utf-8');
const startIndex = content.indexOf('const RsvpSection = () => {');
const endIndex = content.indexOf('export default function App() {');

if (startIndex !== -1 && endIndex !== -1) {
  console.log(content.substring(startIndex, endIndex));
}
