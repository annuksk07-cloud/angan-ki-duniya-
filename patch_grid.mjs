import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace the mobile storybook structure
const targetStr = `<div className="relative flex md:hidden w-full flex-col items-center mt-2 overflow-visible min-h-[520px]" style={{ perspective: "1200px" }}>
            <AnimatePresence initial={false} custom={storyDirection} mode="wait">
              <motion.div
                key={storyPage}
                custom={storyDirection}
                variants={{
                  enter: (dir) => ({ rotateY: dir > 0 ? 90 : -90, opacity: 0 }),
                  center: { rotateY: 0, opacity: 1, transition: { duration: 0.7, ease: "easeInOut" } },
                  exit: (dir) => ({ rotateY: dir < 0 ? 90 : -90, opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } })
                }}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ transformOrigin: "center", backfaceVisibility: "hidden" }}
                className="w-full flex flex-col items-center absolute top-0 left-0 pt-2"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -10000 || offset.x < -40) {
                    paginateStory(1);
                  } else if (swipe > 10000 || offset.x > 40) {
                    paginateStory(-1);
                  }
                }}
              >
                {[
                  {
                    num: "01", title: "पहली मुलाक़ात", img: ASSETS.story1,
                    text: "एक अनजानी सी शुरुआत, जिसने दिल के तारों को कुछ इस तरह छुआ कि हर अजनबी पल भी अपना सा लगने लगा।"
                  },
                  {
                    num: "02", title: "साथ का सफ़र", img: ASSETS.story2,
                    text: "हँसी, बातों और छोटे-छोटे अनमोल लम्हों से बुना गया वह सफर, जहाँ दो अलग दुनिया एक हो गईं।"
                  },
                  {
                    num: "03", title: "हमेशा के लिए", img: ASSETS.story3,
                    text: "अब यह रिश्ता सिर्फ यादें नहीं, बल्कि एक दूसरे का हाथ थाम कर उम्र भर साथ चलने का खूबसूरत वचन बन चुका है।"
                  }
                ].map((s, i) => i === storyPage && (
                  <div key={i} className="flex flex-col items-center text-center w-full px-4 pointer-events-none drop-shadow-sm pb-4">
                    <img 
                      src={s.img} 
                      alt={s.title} 
                      className="w-[70vw] max-w-[270px] h-auto object-contain drop-shadow-xl rounded-sm mb-5" 
                    />
                    <div className="text-[#B78B4A] font-tiro text-3xl opacity-50 mb-1">{s.num}</div>
                    <h3 className="text-[#5A1520] text-xl font-amita mb-2 drop-shadow-sm">{s.title}</h3>
                    <p className="text-[#4A2014] font-noto text-[14px] leading-relaxed opacity-85 max-w-[95%]">
                      {s.text}
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
            
            {/* Mobile Nav */}
            <div className="absolute bottom-4 left-0 w-full flex flex-col items-center z-20">`;

const replacementStr = `<div className="relative flex md:hidden w-full flex-col items-center mt-2 overflow-visible">
            <div className="relative grid w-full place-items-center" style={{ perspective: "1200px" }}>
              <AnimatePresence initial={false} custom={storyDirection} mode="wait">
                <motion.div
                  key={storyPage}
                  custom={storyDirection}
                  variants={{
                    enter: (dir) => ({ rotateY: dir > 0 ? 90 : -90, opacity: 0 }),
                    center: { rotateY: 0, opacity: 1, transition: { duration: 0.7, ease: "easeInOut" } },
                    exit: (dir) => ({ rotateY: dir < 0 ? 90 : -90, opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } })
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{ transformOrigin: "center", backfaceVisibility: "hidden" }}
                  className="w-full flex flex-col items-center col-start-1 row-start-1 pt-2"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x;
                    if (swipe < -10000 || offset.x < -40) {
                      paginateStory(1);
                    } else if (swipe > 10000 || offset.x > 40) {
                      paginateStory(-1);
                    }
                  }}
                >
                  {[
                    {
                      num: "01", title: "पहली मुलाक़ात", img: ASSETS.story1,
                      text: "एक अनजानी सी शुरुआत, जिसने दिल के तारों को कुछ इस तरह छुआ कि हर अजनबी पल भी अपना सा लगने लगा।"
                    },
                    {
                      num: "02", title: "साथ का सफ़र", img: ASSETS.story2,
                      text: "हँसी, बातों और छोटे-छोटे अनमोल लम्हों से बुना गया वह सफर, जहाँ दो अलग दुनिया एक हो गईं।"
                    },
                    {
                      num: "03", title: "हमेशा के लिए", img: ASSETS.story3,
                      text: "अब यह रिश्ता सिर्फ यादें नहीं, बल्कि एक दूसरे का हाथ थाम कर उम्र भर साथ चलने का खूबसूरत वचन बन चुका है।"
                    }
                  ].map((s, i) => i === storyPage && (
                    <div key={i} className="flex flex-col items-center text-center w-full px-4 pointer-events-none drop-shadow-sm pb-2">
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
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Mobile Nav */}
            <div className="relative w-full flex flex-col items-center z-20 mt-4 mb-2">`;

content = content.replace(targetStr, replacementStr);
fs.writeFileSync('src/App.tsx', content);
