import fs from 'fs';

let code = fs.readFileSync('src/App.tsx', 'utf8');
const polys = fs.readFileSync('polys3.txt', 'utf8').split('\n').filter(l => l.startsWith('const'));

polys.forEach(line => {
  const match = line.match(/(const [a-zA-Z]+) = ("[^"]+");/);
  if (match) {
    const varName = match[1];
    const regex = new RegExp(varName + ' = "[^"]+";');
    code = code.replace(regex, line);
  }
});

fs.writeFileSync('src/App.tsx', code);
console.log('Patched App.tsx with polys3');
