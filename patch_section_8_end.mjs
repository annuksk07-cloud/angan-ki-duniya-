import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// The mobile story book layout currently uses grid
// Replace the mobile storybook text container
// Also make sure the overall section 8 padding allows the chunni to be visible

const targetText = `                    <div key={i} className="flex flex-col items-center text-center w-full px-4 pointer-events-none drop-shadow-sm pb-2">
                      <img 
                        src={s.img} 
                        alt={s.title} 
                        className="w-[min(58vw,230px)] h-auto max-h-[330px] object-cover drop-shadow-xl rounded-sm mb-4" 
                      />
                      <div className="text-[#B78B4A] font-tiro text-3xl opacity-50 mb-1">{s.num}</div>
                      <h3 className="text-[#5A1520] text-xl font-amita mb-2 drop-shadow-sm">{s.title}</h3>
                      <p className="text-[#4A2014] font-noto text-[14px] leading-relaxed opacity-85 w-[75%] mx-auto">
                        {s.text}
                      </p>
                    </div>`;

const replaceText = `                    <div key={i} className="flex flex-col items-center text-center w-[72%] max-w-[270px] mx-auto pointer-events-none drop-shadow-sm pb-2">
                      <img 
                        src={s.img} 
                        alt={s.title} 
                        className="w-full h-auto max-h-[330px] object-cover drop-shadow-xl rounded-sm mb-4" 
                      />
                      <div className="text-[#B78B4A] font-tiro text-3xl opacity-50 mb-1">{s.num}</div>
                      <h3 className="text-[#5A1520] text-xl font-amita mb-2 drop-shadow-sm">{s.title}</h3>
                      <p className="text-[#4A2014] font-noto text-[14px] leading-relaxed opacity-85 w-full mx-auto">
                        {s.text}
                      </p>
                    </div>`;
content = content.replace(targetText, replaceText);

fs.writeFileSync('src/App.tsx', content);
