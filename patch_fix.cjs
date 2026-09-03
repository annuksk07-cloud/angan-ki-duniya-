const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/handleDragEndLeft\(e, info\);/g, 'handleDragEndLeft();');
code = code.replace(/handleDragEndRight\(e, info\);/g, 'handleDragEndRight();');

fs.writeFileSync('src/App.tsx', code);
console.log("Success");
