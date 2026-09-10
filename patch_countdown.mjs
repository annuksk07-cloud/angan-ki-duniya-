import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const componentCode = `
const CountdownSection = () => {
  const targetDate = new Date("2026-12-11T18:30:00.000Z").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        isOver: false
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full flex flex-col items-center text-center bg-[#F8F0DF] py-12 sm:py-20 md:py-28 lg:py-32 overflow-hidden">
      <motion.img 
        initial={{ scale: 1.05, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1, transition: { duration: 3, ease: "easeOut" } }}
        viewport={{ once: true, amount: 0.1 }}
        src={ASSETS.familyBg}
        alt=""
        className="absolute inset-0 w-full h-full object-fill z-0 pointer-events-none origin-center" 
      />
      <div className="relative z-10 w-full max-w-[90%] sm:max-w-4xl lg:max-w-6xl mx-auto flex flex-col items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
          }}
          className="flex flex-col items-center text-center w-full"
        >
          <h2 className="text-[#5A1520] text-[28px] sm:text-4xl md:text-5xl font-tiro mb-6 sm:mb-8 drop-shadow-sm">शुभ विवाह</h2>
          <div className="w-12 sm:w-16 h-[1px] bg-[#B78B4A] mb-8 sm:mb-12 origin-center" />
          <div className="text-[#5A1520] text-[26px] sm:text-3xl md:text-4xl font-normal font-amita drop-shadow-md mb-8 sm:mb-10">काव्या & आदित्य</div>
          <p className="text-[#B78B4A] font-noto text-[18px] sm:text-[22px] md:text-[24px] font-medium tracking-widest drop-shadow-sm mb-12 sm:mb-16">12 • 12 • 2026</p>
          <p className="text-[#4A2014] font-noto text-[16px] sm:text-[19px] md:text-[21px] leading-[2] font-medium mb-10 sm:mb-12">
            {timeLeft.isOver ? 'शुभ विवाह का मंगल दिवस आ गया है।' : 'हमारे शुभ मिलन में अब…'}
          </p>

          {!timeLeft.isOver && (
            <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12 w-full">
              {[
                { label: 'दिन', value: timeLeft.days },
                { label: 'घंटे', value: timeLeft.hours },
                { label: 'मिनट', value: timeLeft.minutes },
                { label: 'सेकंड', value: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="text-[#5A1520] text-3xl sm:text-4xl md:text-5xl font-tiro drop-shadow-sm mb-2 w-[48px] sm:w-[64px] md:w-[80px]">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-[#B78B4A] font-noto text-[12px] sm:text-[14px] md:text-[16px] tracking-wider font-medium">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
`;

content = content.replace('export default function App() {', componentCode + '\nexport default function App() {');

fs.writeFileSync('src/App.tsx', content);
