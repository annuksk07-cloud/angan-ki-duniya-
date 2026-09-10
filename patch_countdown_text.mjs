import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace("{ label: 'दिन', value: timeLeft.days }", "{ label: 'Days', value: timeLeft.days }");
content = content.replace("{ label: 'घंटे', value: timeLeft.hours }", "{ label: 'Hours', value: timeLeft.hours }");
content = content.replace("{ label: 'मिनट', value: timeLeft.minutes }", "{ label: 'Minutes', value: timeLeft.minutes }");
content = content.replace("{ label: 'सेकंड', value: timeLeft.seconds }", "{ label: 'Seconds', value: timeLeft.seconds }");

fs.writeFileSync('src/App.tsx', content);
