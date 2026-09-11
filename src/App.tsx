import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useScroll } from 'motion/react';

const ASSETS = {
  entrance: "https://lh3.googleusercontent.com/d/1WZpZ2vSFvDFVoAmAyMdyiVei4SUcQllQ",
  curtain: "https://lh3.googleusercontent.com/d/1r0AN7KEwdB3Xlx9DoF3RHgEP9E2nXmf8",
  curtainTablet: "https://lh3.googleusercontent.com/d/1Zs7G0wzRUm14bogHgh3ZAOonp7evADKA",
  tassel: "https://lh3.googleusercontent.com/d/156hvtCuQWSzDYzVvmF22birhPm6rsDDO",
  hero: "https://lh3.googleusercontent.com/d/1afmtG7HD9UgrC8FmZO9fLLs6uXWtTyh6",
  invitation: "https://lh3.googleusercontent.com/d/13_p9YCCrmywaQat_zBqVywsKxNivluUu",
  petalBlush: "https://lh3.googleusercontent.com/d/1tYI7_CHxlIALAD_sKjtN0jBV0D5M-mzk",
  petalPeach: "https://lh3.googleusercontent.com/d/184uoDc8nTTdXsGVjUCVMWNRX4D9hX2Or",
  petalMarigold: "https://lh3.googleusercontent.com/d/1BEJ31FsKdPKiyBPkJdYIOQ2cuobyj2Zv",
  familyBg: "https://lh3.googleusercontent.com/d/13_p9YCCrmywaQat_zBqVywsKxNivluUu",
  ganesha: "https://lh3.googleusercontent.com/d/11iYTZeHGy70h_XLfc6lTFvDLG2gO5SRX",
  goldDivider: "https://lh3.googleusercontent.com/d/1z60iG7ioGVo1t471sKwTpDULYao45INL",
  botanicalLineage: "https://lh3.googleusercontent.com/d/1ylMhSmuaFRAKumxZVFZD4jWis7Ccep-z",
  sacredThread: "https://lh3.googleusercontent.com/d/1bTLZxswZluzSgOxh2nfQKaP5HwTEABKq",
  haldi: "https://lh3.googleusercontent.com/d/1OKHOSxAJKQb-qnMpml_LuXDjgu34SCvy",
  mehndi: "https://lh3.googleusercontent.com/d/1ZZCoo3lL-ZZcHajPJVoVYrSzGZVt2xo2",
  sangeet: "https://lh3.googleusercontent.com/d/1FeK2oV0ro8KmDyyuiNBw4kaUD76iXnoz",
  vivah: "https://lh3.googleusercontent.com/d/1SvOsfro3OIA1_bU431zP6Noh2YFxv6_5",
  mandapOverlay: "https://lh3.googleusercontent.com/d/17MRY8pXhbyKR7ul3EsWM7QgVk4rlgobr",
  havanKund: "https://lh3.googleusercontent.com/d/1wIrYbswMAry6tvgs-woGFYI75josZjVb",
  havanFlame: "https://lh3.googleusercontent.com/d/1C6x_6Xi-ydN_w8BMpzbipmPJY1pIRxhg",
  sacredSmoke: "https://lh3.googleusercontent.com/d/12PWDx2sv3xkHnfi3ndkWoPKDJbGTglzB",
  mandapFloral: "https://lh3.googleusercontent.com/d/1WiMfFxLJb-kEs3L2nEHPwnaGL4Uz4Gr1",
  jasmineStrand: "https://lh3.googleusercontent.com/d/10uBJFi5cQvmwoLT63GIUnZt8SaEYXd9S",
  softGlow: "https://lh3.googleusercontent.com/d/1CeAhYB_3w1lTxo7973TPYLFDpqwKBEDT",
  coupleStoryFrame: "https://lh3.googleusercontent.com/d/1Xiijjt2BmuZ5xjjsnqA2TvOb3EEbP1u0",
  botanicalAccent: "https://lh3.googleusercontent.com/d/1qsHD_Y_OrpJihsq4vmurPfWldPNH3ac1",
  coupleKavya: "https://lh3.googleusercontent.com/d/1WDsWUL8M1vpwyibNMPHR5zCqwLN8D2ei",
  coupleAditya: "https://lh3.googleusercontent.com/d/1IXlB99Kikpfpj_opzPu096XUcYbJAuga",
  story1: "https://lh3.googleusercontent.com/d/1vTwBKa8ustS64jHmBRtcnYTAekJwP_UX",
  story2: "https://lh3.googleusercontent.com/d/1fFmwiZrL0SSl-576upVVz53GSUiIZ3sn",
  story3: "https://lh3.googleusercontent.com/d/1bka8-pWhqJo3jegtL6d00_PtQCEG3EGW"
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] } 
  }
};


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
    <section className="relative w-full flex flex-col items-center text-center bg-[#F8F0DF] py-12 sm:py-20 md:py-28 lg:py-32 min-h-[100svh] md:min-h-[82svh] lg:min-h-0 overflow-hidden">
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
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="text-[#5A1520] text-3xl sm:text-4xl md:text-5xl font-tiro drop-shadow-sm mb-2 min-w-[56px] sm:min-w-[72px] md:min-w-[90px]">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-[#B78B4A] font-noto text-[12px] sm:text-[14px] md:text-[16px] tracking-widest font-medium uppercase">
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


const RsvpSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    attending: '',
    guestCount: '1',
    foodPreference: '',
    specialNeeds: 'No',
    specialNeedsText: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name.";
    if (!formData.attending) newErrors.attending = "Please select attendance.";
    if (formData.attending === 'Yes, with family' && !formData.guestCount) {
       newErrors.guestCount = "Please select number of guests.";
    }
    if (formData.attending === 'Yes, with family' && !formData.foodPreference) {
       newErrors.foodPreference = "Please select food preference.";
    }
    if (formData.specialNeeds === 'Yes' && !formData.specialNeedsText.trim()) {
       newErrors.specialNeedsText = "Please enter details.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    let text = `Kavya & Aditya Wedding RSVP\n\n`;
    text += `Name: ${formData.name}\n`;
    text += `Attending: ${formData.attending}\n`;
    if (formData.attending === 'Yes, with family') {
       text += `Total Guests: ${formData.guestCount}\n`;
       text += `Food Preference: ${formData.foodPreference}\n`;
    }
    const specNeed = formData.specialNeeds === 'Yes' ? formData.specialNeedsText : formData.specialNeeds;
    text += `Special Dietary Requirement: ${specNeed}\n`;
    if (formData.message.trim()) {
        text += `Message: ${formData.message}\n`;
    }
    text += `\nLooking forward to celebrating with you!`;

    // Use the existing configured number directly in international format (digits only)
    const waNumber = '917827357021'; // [WHATSAPP NUMBER — ADD HERE]
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const RadioOption = ({ name, value, label, checked, onChange }: { name: string, value: string, label: string, checked: boolean, onChange: (e: any) => void }) => (
    <label className="flex items-start sm:items-center gap-3 cursor-pointer group mb-3 sm:mb-0">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="hidden" />
      <div className="w-5 h-5 rounded-full border border-[#B78B4A]/80 flex-shrink-0 flex items-center justify-center group-hover:border-[#5A1520] transition-colors mt-0.5 sm:mt-0">
        <div className={`w-2.5 h-2.5 rounded-full bg-[#5A1520] transition-opacity ${checked ? 'opacity-100' : 'opacity-0'}`} />
      </div>
      <span className="text-[#4A2014] font-noto text-[15px] sm:text-[17px] opacity-90">{label}</span>
    </label>
  );

  return (
    <section className="relative w-full flex flex-col items-center text-center bg-[#F8F0DF] py-12 sm:py-20 md:py-28 lg:py-32 min-h-[100svh] md:min-h-[82svh] lg:min-h-0 overflow-hidden">
      <motion.img 
        initial={{ scale: 1.05, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1, transition: { duration: 3, ease: "easeOut" } }}
        viewport={{ once: true, amount: 0.1 }}
        src={ASSETS.familyBg}
        alt=""
        className="absolute inset-0 w-full h-full object-fill z-0 pointer-events-none origin-center" 
      />
      
      <div className="relative z-10 w-full max-w-[90%] sm:max-w-xl md:max-w-2xl mx-auto flex flex-col items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut", staggerChildren: 0.15 } }
          }}
          className="w-full flex flex-col items-center relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,248,235,0.7)_0%,transparent_70%)] pointer-events-none blur-3xl -z-10" />

          <motion.h2 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-[#5A1520] text-[28px] sm:text-4xl md:text-5xl font-tiro mb-6 sm:mb-8 drop-shadow-sm text-center w-full">RSVP</motion.h2>
          
          <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} className="mb-10 sm:mb-12">
            <img src={ASSETS.goldDivider} alt="" className="w-24 sm:w-32 h-auto opacity-80 drop-shadow-sm" />
          </motion.div>

          <motion.form 
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} 
            onSubmit={handleWhatsAppSubmit}
            className="w-full flex flex-col gap-6 sm:gap-8 text-left bg-white/40 backdrop-blur-sm px-6 py-8 sm:p-10 rounded-xl border border-[#B78B4A]/20 shadow-[0_8px_30px_rgba(90,21,32,0.05)]"
          >
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[#5A1520] font-amita text-[18px] sm:text-[20px]">Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Please enter your full name"
                className="w-full bg-transparent border-b border-[#B78B4A]/40 py-2.5 text-[#4A2014] font-noto text-[15px] sm:text-[17px] focus:outline-none focus:border-[#5A1520] transition-colors placeholder-[#4A2014]/40"
              />
              {errors.name && <span className="text-red-700 font-noto text-sm mt-1">{errors.name}</span>}
            </div>

            {/* Attendance */}
            <div className="flex flex-col gap-3">
              <label className="text-[#5A1520] font-amita text-[18px] sm:text-[20px]">Will you be attending?</label>
              <div className="flex flex-col sm:flex-row sm:gap-8">
                <RadioOption 
                  name="attending" 
                  value="Yes, with family" 
                  label="Yes, with family" 
                  checked={formData.attending === 'Yes, with family'} 
                  onChange={(e) => setFormData({...formData, attending: e.target.value})} 
                />
                <RadioOption 
                  name="attending" 
                  value="No, unable to attend" 
                  label="No, unable to attend" 
                  checked={formData.attending === 'No, unable to attend'} 
                  onChange={(e) => setFormData({...formData, attending: e.target.value})} 
                />
              </div>
              {errors.attending && <span className="text-red-700 font-noto text-sm mt-1">{errors.attending}</span>}
            </div>

            <AnimatePresence>
              {formData.attending === 'Yes, with family' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col gap-6 sm:gap-8 overflow-hidden"
                >
                  <div className="w-full h-[1px] bg-[#B78B4A]/20" />
                  
                  {/* Guest Count */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[#5A1520] font-amita text-[18px] sm:text-[20px]">Total Guests</label>
                    <select 
                      value={formData.guestCount}
                      onChange={(e) => setFormData({...formData, guestCount: e.target.value})}
                      className="w-full bg-transparent border-b border-[#B78B4A]/40 py-2.5 text-[#4A2014] font-noto text-[15px] sm:text-[17px] focus:outline-none focus:border-[#5A1520] transition-colors appearance-none cursor-pointer"
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>

                  {/* Food Preference */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[#5A1520] font-amita text-[18px] sm:text-[20px]">Food Preference</label>
                    <div className="flex flex-col sm:flex-row sm:gap-8">
                      <RadioOption name="food" value="Veg" label="Veg" checked={formData.foodPreference === 'Veg'} onChange={(e) => setFormData({...formData, foodPreference: e.target.value})} />
                      <RadioOption name="food" value="Non-Veg" label="Non-Veg" checked={formData.foodPreference === 'Non-Veg'} onChange={(e) => setFormData({...formData, foodPreference: e.target.value})} />
                      <RadioOption name="food" value="Jain" label="Jain" checked={formData.foodPreference === 'Jain'} onChange={(e) => setFormData({...formData, foodPreference: e.target.value})} />
                    </div>
                    {errors.foodPreference && <span className="text-red-700 font-noto text-sm mt-1">{errors.foodPreference}</span>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Special Needs */}
            <div className="flex flex-col gap-3">
              <label className="text-[#5A1520] font-amita text-[18px] sm:text-[20px]">Any special dietary requirement / allergy?</label>
              <div className="flex flex-col sm:flex-row sm:gap-8">
                <RadioOption name="specialNeeds" value="No" label="No" checked={formData.specialNeeds === 'No'} onChange={(e) => setFormData({...formData, specialNeeds: e.target.value})} />
                <RadioOption name="specialNeeds" value="Yes" label="Yes" checked={formData.specialNeeds === 'Yes'} onChange={(e) => setFormData({...formData, specialNeeds: e.target.value})} />
              </div>
              <AnimatePresence>
                {formData.specialNeeds === 'Yes' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <input 
                      type="text" 
                      value={formData.specialNeedsText}
                      onChange={(e) => setFormData({...formData, specialNeedsText: e.target.value})}
                      placeholder="Please enter details"
                      className="w-full bg-transparent border-b border-[#B78B4A]/40 py-2.5 text-[#4A2014] font-noto text-[15px] sm:text-[17px] focus:outline-none focus:border-[#5A1520] transition-colors placeholder-[#4A2014]/40 mt-2"
                    />
                    {errors.specialNeedsText && <span className="text-red-700 font-noto text-sm mt-1">{errors.specialNeedsText}</span>}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label className="text-[#5A1520] font-amita text-[18px] sm:text-[20px]">Message / Blessings (Optional)</label>
              <input 
                type="text" 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Your message..."
                className="w-full bg-transparent border-b border-[#B78B4A]/40 py-2.5 text-[#4A2014] font-noto text-[15px] sm:text-[17px] focus:outline-none focus:border-[#5A1520] transition-colors placeholder-[#4A2014]/40"
              />
            </div>

            <div className="w-full flex justify-center mt-6">
              <button 
                type="submit"
                className="relative group flex items-center justify-center px-10 py-3.5 bg-gradient-to-br from-[#F4E6C8] to-[#E8D1A7] border border-[#B78B4A]/60 rounded-sm shadow-[0_4px_14px_rgba(90,21,32,0.12)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(90,21,32,0.18)] hover:-translate-y-0.5 overflow-hidden w-[90%] sm:w-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFF8EB]/60 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                <span className="relative z-10 text-[#5A1520] font-noto text-[15px] sm:text-[17px] font-medium tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
                  Confirm Attendance
                </span>
              </button>
            </div>
          </motion.form>

        </motion.div>
      </div>
    </section>
  );
};
export default function App() {
  const invRef = useRef<HTMLElement>(null);
  const { scrollYProgress: invScroll } = useScroll({ target: invRef, offset: ["start end", "end start"] });
  const invScale = useTransform(invScroll, [0, 0.5], [1.15, 1]);
  const invY = useTransform(invScroll, [0, 1], ["-1%", "1%"]);
  

  const [leftHooked, setLeftHooked] = useState(false);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  // Left Curtain Sway
  const swayLeft = {
    closed: {
      scaleX: [1, 1.015, 0.99, 1.008, 0.995, 1],
      skewX: [0, 0.5, -0.3, 0.4, -0.1, 0],
      transition: { duration: 22, repeat: Infinity, ease: "easeInOut" }
    },
    opened: {
      scaleX: [1, 1.005, 0.995, 1.002, 1],
      skewX: [0, 0.15, -0.1, 0.05, 0],
      transition: { duration: 25, repeat: Infinity, ease: "easeInOut" }
    },
    dragging: {
      scaleX: 1,
      skewX: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Right Curtain Sway
  const swayRight = {
    closed: {
      scaleX: [1, 0.985, 1.01, 0.992, 1.005, 1],
      skewX: [0, -0.4, 0.3, -0.5, 0.2, 0],
      transition: { duration: 26, repeat: Infinity, ease: "easeInOut" }
    },
    opened: {
      scaleX: [1, 0.995, 1.005, 0.998, 1],
      skewX: [0, -0.1, 0.15, -0.05, 0],
      transition: { duration: 29, repeat: Infinity, ease: "easeInOut" }
    },
    dragging: {
      scaleX: 1,
      skewX: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  const [rightHooked, setRightHooked] = useState(false);
  const [showHeroContent, setShowHeroContent] = useState(false);

  // Mobile Storybook State
  const [storyPage, setStoryPage] = useState(0);
  const [storyDirection, setStoryDirection] = useState(0);

  const paginateStory = (newDirection: number) => {
    setStoryPage((prev) => {
      const next = prev + newDirection;
      if (next < 0 || next > 2) return prev;
      setStoryDirection(newDirection);
      return next;
    });
  };

  const isOpen = leftHooked && rightHooked;

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowHeroContent(true);
      }, 1650);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Lock scroll if curtain is closed
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (!isOpen) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    };
  }, [isOpen]);

  const [maxDrag, setMaxDrag] = useState(200);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMaxDrag(window.innerWidth * 0.42);
    }
  }, []);

  const xLeft = useMotionValue(0);
  const xRight = useMotionValue(0);

  const leftClosedPolygon = "polygon(0% 0%, 100% 0%, 100% 0.00%, 100% 2.00%, 100% 4.00%, 100% 6.00%, 100% 8.00%, 100% 10.00%, 100% 12.00%, 100% 14.00%, 100% 16.00%, 100% 18.00%, 100% 20.00%, 100% 22.00%, 100% 24.00%, 100% 26.00%, 100% 28.00%, 100% 30.00%, 100% 32.00%, 100% 34.00%, 100% 36.00%, 100% 38.00%, 100% 40.00%, 100% 42.00%, 100% 44.00%, 100% 46.00%, 100% 48.00%, 100% 50.00%, 100% 52.00%, 100% 54.00%, 100% 56.00%, 100% 58.00%, 100% 60.00%, 100% 62.00%, 100% 64.00%, 100% 66.00%, 100% 68.00%, 100% 70.00%, 100% 72.00%, 100% 74.00%, 100% 76.00%, 100% 78.00%, 100% 80.00%, 100% 82.00%, 100% 84.00%, 100% 86.00%, 100% 88.00%, 100% 90.00%, 100% 92.00%, 100% 94.00%, 100% 96.00%, 100% 98.00%, 100% 100.00%, 0% 100%)";
  const leftOpenPolygon = "polygon(0% 0%, 100% 0%, 100.00% 0.00%, 100.00% 1.20%, 100.00% 2.40%, 100.00% 3.60%, 100.00% 4.80%, 100.00% 6.00%, 100.00% 7.20%, 100.00% 8.40%, 100.00% 9.60%, 100.00% 10.80%, 100.00% 12.00%, 96.14% 12.21%, 92.08% 12.54%, 87.83% 13.01%, 83.42% 13.60%, 78.88% 14.33%, 74.21% 15.20%, 69.44% 16.20%, 64.59% 17.36%, 59.69% 18.67%, 54.75% 20.13%, 49.80% 21.74%, 44.85% 23.52%, 39.93% 25.46%, 35.05% 27.57%, 30.25% 29.86%, 25.54% 32.32%, 20.93% 34.96%, 16.46% 37.78%, 12.14% 40.80%, 8.00% 44.00%, 8.06% 46.49%, 8.24% 49.13%, 8.53% 51.92%, 8.93% 54.82%, 9.44% 57.81%, 10.05% 60.88%, 10.77% 64.01%, 11.58% 67.17%, 12.50% 70.34%, 13.50% 73.50%, 14.59% 76.63%, 15.78% 79.71%, 17.04% 82.72%, 18.39% 85.64%, 19.81% 88.44%, 21.31% 91.10%, 22.88% 93.61%, 24.52% 95.95%, 26.23% 98.08%, 28.00% 100.00%, 0% 100%)";

  const rightClosedPolygon = "polygon(100% 0%, 100% 100%, 0% 100.00%, 0% 98.00%, 0% 96.00%, 0% 94.00%, 0% 92.00%, 0% 90.00%, 0% 88.00%, 0% 86.00%, 0% 84.00%, 0% 82.00%, 0% 80.00%, 0% 78.00%, 0% 76.00%, 0% 74.00%, 0% 72.00%, 0% 70.00%, 0% 68.00%, 0% 66.00%, 0% 64.00%, 0% 62.00%, 0% 60.00%, 0% 58.00%, 0% 56.00%, 0% 54.00%, 0% 52.00%, 0% 50.00%, 0% 48.00%, 0% 46.00%, 0% 44.00%, 0% 42.00%, 0% 40.00%, 0% 38.00%, 0% 36.00%, 0% 34.00%, 0% 32.00%, 0% 30.00%, 0% 28.00%, 0% 26.00%, 0% 24.00%, 0% 22.00%, 0% 20.00%, 0% 18.00%, 0% 16.00%, 0% 14.00%, 0% 12.00%, 0% 10.00%, 0% 8.00%, 0% 6.00%, 0% 4.00%, 0% 2.00%, 0% 0.00%)";
  const rightOpenPolygon = "polygon(100% 0%, 100% 100%, 72.00% 100.00%, 73.77% 98.08%, 75.48% 95.95%, 77.12% 93.61%, 78.69% 91.10%, 80.19% 88.44%, 81.61% 85.64%, 82.96% 82.72%, 84.22% 79.71%, 85.41% 76.63%, 86.50% 73.50%, 87.50% 70.34%, 88.42% 67.17%, 89.23% 64.01%, 89.95% 60.88%, 90.56% 57.81%, 91.07% 54.82%, 91.47% 51.92%, 91.76% 49.13%, 91.94% 46.49%, 92.00% 44.00%, 87.86% 40.80%, 83.54% 37.78%, 79.07% 34.96%, 74.46% 32.32%, 69.75% 29.86%, 64.95% 27.57%, 60.07% 25.46%, 55.15% 23.52%, 50.20% 21.74%, 45.25% 20.13%, 40.31% 18.67%, 35.41% 17.36%, 30.56% 16.20%, 25.79% 15.20%, 21.13% 14.33%, 16.58% 13.60%, 12.17% 13.01%, 7.92% 12.54%, 3.86% 12.21%, 0.00% 12.00%, 0.00% 10.80%, 0.00% 9.60%, 0.00% 8.40%, 0.00% 7.20%, 0.00% 6.00%, 0.00% 4.80%, 0.00% 3.60%, 0.00% 2.40%, 0.00% 1.20%, 0.00% 0.00%)";

  const clipPathLeft = useTransform(xLeft, [0, -maxDrag], [leftClosedPolygon, leftOpenPolygon]);
  const holderHighlightLeft = useTransform(xLeft, [0, -maxDrag * 0.1], [0, 1]);

  const clipPathRight = useTransform(xRight, [0, maxDrag], [rightClosedPolygon, rightOpenPolygon]);
  const holderHighlightRight = useTransform(xRight, [0, maxDrag * 0.1], [0, 1]);

  const handleDragEndLeft = () => {
    if (leftHooked) return;
    if (xLeft.get() <= -maxDrag * 0.6) {
      setLeftHooked(true);
      animate(xLeft, -maxDrag, { type: "tween", ease: "easeOut", duration: 0.4 });
    } else {
      animate(xLeft, 0, { type: "tween", ease: "easeOut", duration: 0.4 });
    }
  };

  const handleDragEndRight = () => {
    if (rightHooked) return;
    if (xRight.get() >= maxDrag * 0.6) {
      setRightHooked(true);
      animate(xRight, maxDrag, { type: "tween", ease: "easeOut", duration: 0.4 });
    } else {
      animate(xRight, 0, { type: "tween", ease: "easeOut", duration: 0.4 });
    }
  };

  return (
    <main 
      className={`relative w-full min-h-[100dvh] overflow-x-hidden bg-[#F8F0DF] selection:bg-[#D89A32] selection:text-white ${!isOpen ? 'h-[100dvh] overflow-hidden' : ''}`}
    >
      {/* HERO SECTION */}
          <section className="relative w-full h-[100dvh] overflow-hidden">
            
            {/* 1. Hero Background (Base Room) */}
            <motion.div
              className="absolute inset-0 z-0 origin-center"
            >
          <motion.div
            className="w-full h-full origin-center"
            animate={isOpen ? { scale: 1.10 } : { scale: 1 }}
            transition={isOpen ? { duration: 1.25, delay: 0.2, ease: "easeInOut" } : {}}
          >
            <img 
              src={ASSETS.hero} 
              className="w-full h-full object-cover object-center" 
              alt="" 
            />
          </motion.div>
        </motion.div>

        {/* 2. Hero Content */}
        <motion.div 
          className="absolute inset-0 z-10 pointer-events-none"
        >
          <AnimatePresence>
            {showHeroContent && (
              <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 text-center w-full max-w-[550px] lg:max-w-[700px] mx-auto h-[100dvh] pb-[10vh] sm:pb-[14vh]"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
                  }
                }}
              >
                <motion.p variants={itemVariants} className="relative z-10 text-[#4A2014] font-serif tracking-wider uppercase text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] mb-3 sm:mb-6 drop-shadow-sm font-medium">
                  Together with our families
                </motion.p>
                
                <motion.div variants={itemVariants} className="relative z-10 flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-4 md:gap-5 mb-2 sm:mb-5">
                  <h2 className="text-[28px] min-[380px]:text-[30px] sm:text-[46px] md:text-[64px] lg:text-[72px] leading-none font-amita text-[#5A1520] font-normal drop-shadow-sm">
                    काव्या
                  </h2>
                  <span className="text-[#B78B4A] text-[16px] min-[380px]:text-[18px] sm:text-[28px] md:text-[36px] font-serif italic drop-shadow-sm mt-0.5 sm:mt-2">
                    &
                  </span>
                  <h2 className="text-[28px] min-[380px]:text-[30px] sm:text-[46px] md:text-[64px] lg:text-[72px] leading-none font-amita text-[#5A1520] font-normal drop-shadow-sm">
                    आदित्य
                  </h2>
                </motion.div>
                
                <motion.p variants={itemVariants} className="relative z-10 font-serif text-[#4A2014] text-[12px] sm:text-[14px] md:text-[16px] lg:text-[17px] mb-4 sm:mb-10 tracking-[0.15em] uppercase drop-shadow-sm font-medium">
                  Kavya & Aditya
                </motion.p>
                
                <motion.p variants={itemVariants} className="relative z-10 text-[14.5px] min-[380px]:text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-noto text-[#5A1520] mb-5 sm:mb-10 md:mb-12 w-[85%] sm:max-w-md mx-auto leading-snug sm:leading-relaxed drop-shadow-sm font-medium">
                  “दो दिल, दो परिवार, एक उत्सव।”
                </motion.p>
                
                <motion.div variants={itemVariants} className="relative z-10 flex flex-col items-center justify-center gap-2 sm:gap-3 font-serif uppercase font-medium max-w-[95%] mt-1 sm:mt-2">
                  <p className="text-[#5A1520] text-[14px] min-[380px]:text-[16px] sm:text-[19px] md:text-[22px] lg:text-[24px] tracking-[0.1em] drop-shadow-sm font-semibold">12 December 2026</p>
                  <p className="text-[#4A2014] text-[11px] min-[380px]:text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] tracking-widest opacity-85">Jaipur, Rajasthan</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scroll instruction */}
          <AnimatePresence>
            {showHeroContent && (
              <motion.div 
                className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-center w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1.2 }}
              >
                <p className="font-serif text-[#5A3024] text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.15em] uppercase drop-shadow-sm font-medium">
                  Scroll to begin
                </p>
                <motion.div className="mt-2 sm:mt-3 md:mt-4">
                  <div className="w-[1px] h-6 sm:h-8 md:h-10 bg-gradient-to-b from-[#B78B4A] to-transparent" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 3. Curtains (Mobile) */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          {/* Left Curtain Panel */}
          <motion.div 
            className="absolute inset-y-0 left-0 origin-left overflow-hidden pointer-events-none"
            style={{ 
              clipPath: clipPathLeft, 
              width: "50%",
            }}
          >
            <motion.div className="absolute inset-y-0 left-0 w-[50vw] origin-left">
              <motion.div 
              className="absolute inset-y-0 left-0 w-[100vw] flex justify-center origin-top"
              animate={isDraggingLeft ? "dragging" : leftHooked ? "opened" : "closed"}
              variants={swayLeft}
            >
              {/* Mobile and Desktop */}
              <img 
                src={ASSETS.curtain} 
                className="block md:hidden lg:block w-[125vw] h-[115dvh] -translate-y-[7dvh] object-cover object-top max-w-none flex-shrink-0" 
                alt="" 
              />
              {/* Tablet Only */}
              <img 
                src={ASSETS.curtainTablet} 
                className="hidden md:block lg:hidden w-[100vw] h-[100dvh] object-cover object-top max-w-none flex-shrink-0" 
                alt="" 
              />
            </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Curtain Panel */}
          <motion.div 
            className="absolute inset-y-0 right-0 origin-right overflow-hidden pointer-events-none"
            style={{ 
              clipPath: clipPathRight, 
              width: "50%",
            }}
          >
            <motion.div className="absolute inset-y-0 right-0 w-[50vw] origin-right">
              <motion.div 
              className="absolute inset-y-0 right-0 w-[100vw] flex justify-center origin-top"
              animate={isDraggingRight ? "dragging" : rightHooked ? "opened" : "closed"}
              variants={swayRight}
            >
              {/* Mobile and Desktop */}
              <img 
                src={ASSETS.curtain} 
                className="block md:hidden lg:block w-[125vw] h-[115dvh] -translate-y-[7dvh] object-cover object-top max-w-none flex-shrink-0" 
                alt="" 
              />
              {/* Tablet Only */}
              <img 
                src={ASSETS.curtainTablet} 
                className="hidden md:block lg:hidden w-[100vw] h-[100dvh] object-cover object-top max-w-none flex-shrink-0" 
                alt="" 
              />
            </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Invisible Drag Handles */}
        {!leftHooked && (
          <motion.div
            className="absolute top-[20%] bottom-0 left-[50%] w-24 sm:w-32 -translate-x-full z-[60] cursor-grab active:cursor-grabbing touch-pan-y"
            drag="x"
            dragConstraints={{ left: -maxDrag, right: 0 }}
            dragElastic={0.05}
            dragMomentum={false}
            style={{ x: xLeft }}
            onDragStart={() => setIsDraggingLeft(true)}
            onDragEnd={(e, info) => {
              setIsDraggingLeft(false);
              handleDragEndLeft();
            }}
          />
        )}
        {!rightHooked && (
          <motion.div
            className="absolute top-[20%] bottom-0 left-[50%] w-24 sm:w-32 z-[60] cursor-grab active:cursor-grabbing touch-pan-y"
            drag="x"
            dragConstraints={{ left: 0, right: maxDrag }}
            dragElastic={0.05}
            dragMomentum={false}
            style={{ x: xRight }}
            onDragStart={() => setIsDraggingRight(true)}
            onDragEnd={(e, info) => {
              setIsDraggingRight(false);
              handleDragEndRight();
            }}
          />
        )}

        {/* Curtain Text Overlay */}
        <motion.div 
          className="absolute inset-0 z-40 pointer-events-none"
          animate={(leftHooked || rightHooked) ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="absolute top-[20%] sm:top-[22%] left-1/2 -translate-x-1/2 w-[90%] max-w-sm text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(60,20,20,0.5)_0%,transparent_70%)] pointer-events-none blur-xl" />
            <h1 className="relative z-10 text-4xl sm:text-5xl font-tiro text-[#F8F0DF] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-3 sm:mb-4">
              शुभारंभ
            </h1>
            <div className="relative z-10 w-10 h-[1px] bg-[#B78B4A] mx-auto mb-6 sm:mb-8 opacity-90 shadow-sm" />
            <p className="relative z-10 text-[15px] sm:text-lg font-noto text-[#F8F0DF] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-[1.8] font-medium">
              अपना निमंत्रण खोलें<br/>
              हमारे परिवार की ओर से सप्रेम आमंत्रण
            </p>
          </div>
        </motion.div>

      
            </section>

      {/* SECTION 2: LIVE WEDDING COUNTDOWN */}
      <CountdownSection />

      {/* NEW SECTION: INVITATION MESSAGE */}
      <section ref={invRef} className="relative z-10 w-full min-h-[100dvh] flex flex-col items-center text-center bg-[#F8F0DF] py-12 sm:py-20 shadow-[0_-10px_30px_rgba(0,0,0,0.15)] tablet-sadar-section">
        {/* Cinematic Background Layer */}
        <div className="absolute inset-0 z-0 bg-[#F8F0DF] overflow-hidden">
          <motion.div 
            className="w-full h-full origin-center"
            style={{ scale: 1.02, y: invY }}
          >
            <img 
              src={ASSETS.invitation} 
              alt="Invitation Background" 
              className="w-full h-full object-cover object-center tablet-sadar-bg"
            />
          </motion.div>
          {/* Subtle Background Life */}
          <motion.div 
            className="absolute -inset-[30%] pointer-events-none opacity-40 mix-blend-overlay"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(255, 250, 240, 0.8) 0%, transparent 60%)"
            }}
            animate={{
              x: ["-5%", "5%", "-2%", "-5%"],
              y: ["-5%", "2%", "5%", "-5%"],
              scale: [1, 1.05, 0.98, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Soft-light overlay layer ready for cinematic animation */}
          <motion.div className="absolute inset-0 bg-[#F8F0DF] mix-blend-overlay opacity-20 pointer-events-none" />
          {/* Subtle warm ivory text-readability layer */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(248,240,223,0.85)_0%,rgba(248,240,223,0)_70%)] pointer-events-none" />
        </div>

        {/* Subtle Decorative Elements (Petals) */}
        <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
          <motion.img 
            src={ASSETS.petalBlush}
            className="absolute w-12 sm:w-16 blur-[0.5px] drop-shadow-[0_4px_8px_rgba(165,145,125,0.3)] contrast-110 saturate-105"
            style={{ left: "8%", bottom: "25%" }}
            animate={{
              y: ["0dvh", "15dvh"],
              x: ["0vw", "4vw"],
              rotate: [0, 80],
              opacity: [0, 0.7, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 0 }}
            alt=""
          />
          <motion.img 
            src={ASSETS.petalPeach}
            className="absolute w-10 sm:w-14 blur-[1px] drop-shadow-[0_3px_6px_rgba(165,145,125,0.3)] contrast-110 saturate-105"
            style={{ right: "10%", bottom: "30%" }}
            animate={{
              y: ["0dvh", "18dvh"],
              x: ["0vw", "-3vw"],
              rotate: [45, -45],
              opacity: [0, 0.65, 0]
            }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear", delay: 4 }}
            alt=""
          />
          <motion.img 
            src={ASSETS.petalMarigold}
            className="absolute w-6 sm:w-8 blur-[1.5px] drop-shadow-[0_2px_4px_rgba(165,145,125,0.25)] contrast-105 saturate-100"
            style={{ left: "15%", bottom: "45%" }}
            animate={{
              y: ["0dvh", "22dvh"],
              x: ["0vw", "6vw"],
              rotate: [-20, 90],
              opacity: [0, 0.5, 0]
            }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear", delay: 10 }}
            alt=""
          />
        </div>

        <motion.div 
          className="relative z-10 max-w-[90%] sm:max-w-xl md:max-w-2xl mx-auto flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 my-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.h2 variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0, transition: { duration: 1.8, ease: "easeOut", delay: 0.8 } } }} className="text-[#5A1520] text-[28px] sm:text-4xl md:text-5xl font-tiro mb-6 sm:mb-8 drop-shadow-sm">सादर आमंत्रण</motion.h2>
          <motion.div variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 0.7, scaleX: 1, transition: { duration: 1.6, ease: "easeInOut", delay: 1.4 } } }} className="w-12 sm:w-16 h-[1px] bg-[#B78B4A] mb-8 sm:mb-12 origin-center" />
          <motion.p variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0, transition: { duration: 1.6, ease: "easeOut", delay: 1.8 } } }} className="text-[#4A2014] font-noto text-[16px] sm:text-[19px] md:text-[21px] leading-[2] font-medium w-full mx-auto">ईश्वर की असीम कृपा एवं परिवारजनों के आशीर्वाद से</motion.p>
          <motion.div variants={{ hidden: { opacity: 0, y: 6, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 2, ease: "easeOut", delay: 2.3 } } }} className="text-[#5A1520] text-[26px] sm:text-3xl md:text-4xl block my-8 sm:my-10 font-normal font-amita drop-shadow-md w-full mx-auto">काव्या एवं आदित्य</motion.div>
          <motion.p variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0, transition: { duration: 1.6, ease: "easeOut", delay: 2.8 } } }} className="text-[#4A2014] font-noto text-[16px] sm:text-[19px] md:text-[21px] leading-[2] mb-10 sm:mb-12 font-medium w-full mx-auto">शुभ विवाह के पावन बंधन में बंधने जा रहे हैं।</motion.p>
          <motion.p variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0, transition: { duration: 1.6, ease: "easeOut", delay: 3.2 } } }} className="text-[#4A2014] font-noto text-[15px] sm:text-[18px] md:text-[20px] leading-[2] mb-12 sm:mb-14 w-full mx-auto opacity-95">इस मंगल अवसर पर आप सपरिवार सादर आमंत्रित हैं。<br className="hidden sm:block" />कृपया पधारकर नवदंपति को अपना स्नेह एवं आशीर्वाद प्रदान करें।</motion.p>
          <motion.p variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0, transition: { duration: 1.8, ease: "easeOut", delay: 4.2 } } }} className="text-[#B78B4A] font-noto text-[16px] sm:text-[19px] md:text-[21px] font-medium italic drop-shadow-sm opacity-90">आपकी उपस्थिति हमारे लिए सौभाग्य होगी।</motion.p>
        </motion.div>
      </section>

      {/* NEW SECTION: FAMILY BLESSING */}
      <section className="relative w-full flex flex-col items-center text-center bg-[#F8F0DF] py-10 sm:py-16 md:py-24 lg:py-28 min-h-[100svh] md:min-h-[82svh] lg:min-h-0 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.05, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1, transition: { duration: 3, ease: "easeOut" } }}
          viewport={{ once: true, amount: 0.1 }}
          src={ASSETS.familyBg} 
          alt="Family Background" 
          className="absolute inset-0 w-full h-full object-fill z-0 pointer-events-none origin-center" 
        />

        <motion.div
          className="relative z-10 w-full max-w-[90%] sm:max-w-4xl lg:max-w-6xl mx-auto flex flex-col items-center my-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.35, delayChildren: 0.2 }
            }
          }}
        >
          {/* Ganesha */}
          <motion.img
            variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: "easeOut" } } }}
            src={ASSETS.ganesha}
            alt="Lord Ganesha"
            className="w-16 sm:w-20 md:w-24 mb-3 sm:mb-6 object-contain opacity-90 drop-shadow-sm"
          />

          {/* Heading */}
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } } }}
            className="text-[#5A1520] text-3xl sm:text-4xl md:text-5xl font-tiro mb-1 sm:mb-3 drop-shadow-sm"
          >
            परिवार का आशीर्वाद
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } } }}
            className="text-[#B78B4A] text-[17px] sm:text-xl md:text-2xl font-serif tracking-wide italic mb-4 sm:mb-6 drop-shadow-sm"
          >
            दो कुल • एक मंगल मिलन
          </motion.p>

          {/* Divider */}
          <motion.img
            variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1, transition: { duration: 1.5, ease: "easeOut" } } }}
            src={ASSETS.goldDivider}
            alt=""
            className="w-56 sm:w-72 md:w-96 h-auto mb-6 sm:mb-12 origin-center opacity-100 drop-shadow-sm"
          />

          {/* Family Columns Container */}
          <div className="w-full flex flex-row items-stretch justify-center gap-2 sm:gap-12 md:gap-8 relative mt-0 sm:mt-4 family-cols-container">
            
            {/* Bride Family (Left) */}
            <motion.div 
              variants={{ hidden: { opacity: 0, x: -15 }, visible: { opacity: 1, x: 0, transition: { duration: 1.6, ease: "easeOut" } } }}
              className="flex-1 flex flex-col items-center relative w-full px-1 sm:px-8 py-2 family-col"
            >
              <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 0.8, scale: 1, transition: { duration: 2, ease: "easeOut", delay: 1.5 } } }} className="absolute top-1/2 -translate-y-1/2 left-[-20px] sm:left-[-40px] md:left-[-50px] pointer-events-none flex items-center justify-start z-0 botanical-left-wrapper">
                <img 
                  src={ASSETS.botanicalLineage} 
                  className="h-[220px] sm:h-[320px] md:h-[400px] w-auto object-contain object-left drop-shadow-[0_2px_4px_rgba(90,21,32,0.15)] botanical-left" 
                  alt="" 
                />
              </motion.div>
              
              <h3 className="text-[#5A1520] text-[clamp(18px,4.5vw,28px)] font-amita mb-3 sm:mb-6 drop-shadow-sm text-center relative z-10 pl-6 sm:pl-0 family-col-title">वधू पक्ष</h3>
              <div className="text-[#4A2014] font-noto space-y-1 sm:space-y-3 text-[clamp(12px,2.8vw,18px)] font-medium leading-snug sm:leading-relaxed text-center w-full relative z-10 pl-6 sm:pl-0 family-col-text">
                <p className="font-semibold text-[#5A1520] text-[clamp(13px,3.2vw,20px)] leading-tight">स्व. श्रीमती एवं श्री रामेश्वर प्रसाद</p>
                <p className="leading-tight">श्रीमती राधा एवं श्री कृष्ण कुमार</p>
                <p className="pt-2 sm:pt-2 text-[clamp(11px,2.5vw,16px)]">दर्शनाभिलाषी:<br className="sm:hidden"/> समस्त शर्मा परिवार</p>
              </div>
            </motion.div>

            {/* Sacred Thread (Middle) - Mobile & Desktop */}
            <motion.div 
              variants={{ hidden: { opacity: 0, scaleY: 0 }, visible: { opacity: 1, scaleY: 1, transition: { duration: 1.8, ease: "easeInOut" } } }}
              className="flex w-6 sm:w-12 items-center justify-center relative z-10 py-4 sm:py-6 origin-top sacred-thread-wrapper"
            >
              <motion.img
                animate={{ rotate: [-0.5, 0.5, -0.5] }}
                transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
                style={{ transformOrigin: "top center" }}
                src={ASSETS.sacredThread}
                className="w-2.5 sm:w-4 h-[60%] sm:h-full object-contain opacity-50 sm:opacity-75"
                alt=""
              />
            </motion.div>

            {/* Groom Family (Right) */}
            <motion.div 
              variants={{ hidden: { opacity: 0, x: 15 }, visible: { opacity: 1, x: 0, transition: { duration: 1.6, ease: "easeOut" } } }}
              className="flex-1 flex flex-col items-center relative w-full px-1 sm:px-8 py-2 family-col"
            >
              <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 0.8, scale: 1, transition: { duration: 2, ease: "easeOut", delay: 1.5 } } }} className="absolute top-1/2 -translate-y-1/2 right-[-20px] sm:right-[-40px] md:right-[-50px] pointer-events-none flex items-center justify-end scale-x-[-1] z-0 botanical-right-wrapper">
                <img 
                  src={ASSETS.botanicalLineage} 
                  className="h-[220px] sm:h-[320px] md:h-[400px] w-auto object-contain object-left drop-shadow-[0_2px_4px_rgba(90,21,32,0.15)] botanical-right" 
                  alt="" 
                />
              </motion.div>

              <h3 className="text-[#5A1520] text-[clamp(18px,4.5vw,28px)] font-amita mb-3 sm:mb-6 drop-shadow-sm text-center relative z-10 pr-6 sm:pr-0 family-col-title">वर पक्ष</h3>
              <div className="text-[#4A2014] font-noto space-y-1 sm:space-y-3 text-[clamp(12px,2.8vw,18px)] font-medium leading-snug sm:leading-relaxed text-center w-full relative z-10 pr-6 sm:pr-0 family-col-text">
                <p className="font-semibold text-[#5A1520] text-[clamp(13px,3.2vw,20px)] leading-tight">स्व. श्रीमती एवं श्री हरिओम सिंह</p>
                <p className="leading-tight">श्रीमती मीरा एवं श्री राजेंद्र सिंह</p>
                <p className="pt-2 sm:pt-2 text-[clamp(11px,2.5vw,16px)]">दर्शनाभिलाषी:<br className="sm:hidden"/> समस्त सिंह परिवार</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* NEW SECTION: EVENTS */}
      <section className="relative w-full flex flex-col items-center text-center bg-[#F8F0DF] py-12 sm:py-20 md:py-28 lg:py-32 min-h-[100svh] md:min-h-[82svh] lg:min-h-0 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.05, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1, transition: { duration: 3, ease: "easeOut" } }}
          viewport={{ once: true, amount: 0.1 }}
          src={ASSETS.familyBg} 
          alt="Events Background" 
          className="absolute inset-0 w-full h-full object-fill z-0 pointer-events-none origin-center" 
        />

        <motion.div
          className="relative z-10 w-full max-w-[90%] sm:max-w-4xl lg:max-w-5xl mx-auto flex flex-col items-center my-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.25, delayChildren: 0.2 }
            }
          }}
        >
          {/* Heading */}
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } } }}
            className="text-[#5A1520] text-3xl sm:text-4xl md:text-5xl font-tiro mb-2 sm:mb-3 drop-shadow-sm"
          >
            मंगल कार्यक्रम
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } } }}
            className="text-[#B78B4A] text-[17px] sm:text-xl md:text-2xl font-serif tracking-wide italic mb-10 sm:mb-16 drop-shadow-sm"
          >
            शुभ उत्सवों की मंगलमयी झलक
          </motion.p>

          {/* Events Grid Container */}
          <div className="w-full relative grid grid-cols-2 md:grid-cols-2 gap-x-12 gap-y-12 sm:gap-y-16 mt-2 mangal-grid">
            
            {/* Subtle cross-divider for desktop */}
            <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 2, ease: "easeInOut" } } }} className="hidden lg:block absolute inset-0 pointer-events-none z-0 mangal-connector">
              <motion.div variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 2, ease: "easeInOut" } } }} className="absolute top-1/2 left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-transparent via-[#B78B4A] to-transparent opacity-30 origin-center"></motion.div>
              <motion.div variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1, transition: { duration: 2, ease: "easeInOut" } } }} className="absolute left-1/2 top-[5%] bottom-[5%] w-[1px] bg-gradient-to-b from-transparent via-[#B78B4A] to-transparent opacity-30 origin-center"></motion.div>
              <motion.div variants={{ hidden: { scale: 0, rotate: 0 }, visible: { scale: 1, rotate: 45, transition: { duration: 1.5, ease: "easeOut", delay: 1 } } }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-[#B78B4A] opacity-40"></motion.div>
            </motion.div>

            {/* Event 1: Haldi */}
            <motion.div 
              variants={{ hidden: { opacity: 0, x: -12, y: -12 }, visible: { opacity: 1, x: 0, y: 0, transition: { duration: 1.6, ease: "easeOut" } } }}
              className="flex flex-col items-center text-center relative z-10"
            >
              <motion.img 
                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: "easeOut" } } }}
                src={ASSETS.haldi} alt="हल्दी" className="w-24 sm:w-32 h-auto object-contain mb-3 sm:mb-4 drop-shadow-sm mangal-event-img mangal-haldi" 
              />
              <motion.div variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: "easeOut" } } }}>
                <h3 className="text-[#5A1520] text-[clamp(22px,6vw,30px)] font-amita mb-1 sm:mb-2 drop-shadow-sm mangal-event-title">हल्दी</h3>
                <div className="text-[#4A2014] font-noto leading-snug space-y-0.5 mangal-event-text">
                  <p className="text-[clamp(15px,4vw,18px)] font-medium">10 दिसंबर 2026</p>
                  <p className="text-[clamp(15px,4vw,18px)]">प्रातः 11:00 बजे</p>
                  <p className="text-[clamp(14px,3.5vw,16px)] text-[#8C5A35] mt-1 sm:mt-1.5 font-medium">केसर आँगन</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Mobile divider */}
            <div className="hidden w-[30%] h-[1px] bg-gradient-to-r from-transparent via-[#B78B4A] to-transparent opacity-30 mx-auto mangal-mobile-divider"></div>

            {/* Event 2: Mehndi */}
            <motion.div 
              variants={{ hidden: { opacity: 0, x: 12, y: -12 }, visible: { opacity: 1, x: 0, y: 0, transition: { duration: 1.6, ease: "easeOut" } } }}
              className="flex flex-col items-center text-center relative z-10"
            >
              <motion.img 
                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: "easeOut" } } }}
                src={ASSETS.mehndi} alt="मेहंदी" className="w-20 sm:w-28 h-auto object-contain mb-3 sm:mb-4 drop-shadow-sm mangal-event-img mangal-mehndi" 
              />
              <motion.div variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: "easeOut" } } }}>
                <h3 className="text-[#5A1520] text-[clamp(22px,6vw,30px)] font-amita mb-1 sm:mb-2 drop-shadow-sm mangal-event-title">मेहंदी</h3>
                <div className="text-[#4A2014] font-noto leading-snug space-y-0.5 mangal-event-text">
                  <p className="text-[clamp(15px,4vw,18px)] font-medium">10 दिसंबर 2026</p>
                  <p className="text-[clamp(15px,4vw,18px)]">सायं 4:00 बजे</p>
                  <p className="text-[clamp(14px,3.5vw,16px)] text-[#8C5A35] mt-1 sm:mt-1.5 font-medium">गुलाब बाग</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Mobile divider */}
            <div className="hidden w-[30%] h-[1px] bg-gradient-to-r from-transparent via-[#B78B4A] to-transparent opacity-30 mx-auto mangal-mobile-divider"></div>

            {/* Event 3: Sangeet */}
            <motion.div 
              variants={{ hidden: { opacity: 0, x: -12, y: 12 }, visible: { opacity: 1, x: 0, y: 0, transition: { duration: 1.6, ease: "easeOut" } } }}
              className="flex flex-col items-center text-center relative z-10"
            >
              <motion.img 
                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: "easeOut" } } }}
                src={ASSETS.sangeet} alt="संगीत संध्या" className="w-28 sm:w-36 h-auto object-contain mb-3 sm:mb-4 drop-shadow-sm mangal-event-img mangal-sangeet" 
              />
              <motion.div variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: "easeOut" } } }}>
                <h3 className="text-[#5A1520] text-[clamp(22px,6vw,30px)] font-amita mb-1 sm:mb-2 drop-shadow-sm mangal-event-title">संगीत संध्या</h3>
                <div className="text-[#4A2014] font-noto leading-snug space-y-0.5 mangal-event-text">
                  <p className="text-[clamp(15px,4vw,18px)] font-medium">11 दिसंबर 2026</p>
                  <p className="text-[clamp(15px,4vw,18px)]">सायं 7:30 बजे</p>
                  <p className="text-[clamp(14px,3.5vw,16px)] text-[#8C5A35] mt-1 sm:mt-1.5 font-medium">राजदरबार लॉन</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Mobile divider */}
            <div className="hidden w-[30%] h-[1px] bg-gradient-to-r from-transparent via-[#B78B4A] to-transparent opacity-30 mx-auto mangal-mobile-divider"></div>

            {/* Event 4: Vivah */}
            <motion.div 
              variants={{ hidden: { opacity: 0, x: 12, y: 12 }, visible: { opacity: 1, x: 0, y: 0, transition: { duration: 1.6, ease: "easeOut" } } }}
              className="flex flex-col items-center text-center relative z-10"
            >
              <motion.img 
                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: "easeOut" } } }}
                src={ASSETS.vivah} alt="विवाह एवं फेरे" className="w-32 sm:w-40 h-auto object-contain mb-3 sm:mb-4 drop-shadow-sm mangal-event-img mangal-vivah" 
              />
              <motion.div variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: "easeOut" } } }}>
                <h3 className="text-[#5A1520] text-[clamp(22px,6vw,30px)] font-amita mb-1 sm:mb-2 drop-shadow-sm mangal-event-title">विवाह एवं फेरे</h3>
                <div className="text-[#4A2014] font-noto leading-snug space-y-0.5 mangal-event-text">
                  <p className="text-[clamp(15px,4vw,18px)] font-medium">12 दिसंबर 2026</p>
                  <p className="text-[clamp(15px,4vw,18px)]">रात्रि 8:15 बजे</p>
                  <p className="text-[clamp(14px,3.5vw,16px)] text-[#8C5A35] mt-1 sm:mt-1.5 font-medium">शाही मंडप</p>
                  <p className="text-[clamp(12px,3vw,14px)] text-[#B78B4A] mt-2 italic font-serif tracking-wide">शुभ फेरे • रात्रि 10:45 बजे</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* 5. Vivah Sanskar Section */}
      <section className="relative w-full flex flex-col items-center justify-start overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-24">
        {/* Layer 1: Background */}
        <motion.img 
          initial={{ scale: 1 }}
          whileInView={{ scale: 1.02, transition: { duration: 20, ease: "linear" } }}
          src={ASSETS.familyBg} 
          alt="Vivah Background" 
          className="absolute inset-0 w-full h-full object-fill z-0 pointer-events-none origin-center" 
        />

        {/* Heading & Subtitle */}
        <motion.div
          className="relative z-30 w-full max-w-5xl mx-auto flex flex-col items-center mt-2 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.3, delayChildren: 0.1 }
            }
          }}
        >
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut" } } }}
            className="text-[#5A1520] text-[clamp(2.25rem,6vw,4rem)] leading-tight font-tiro mb-2 sm:mb-4 drop-shadow-sm text-center"
          >
            विवाह संस्कार
          </motion.h2>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut" } } }}
            className="text-[#B78B4A] text-[clamp(1.05rem,2.5vw,1.65rem)] font-serif tracking-wide italic text-center drop-shadow-sm"
          >
            सात पग, सात वचन, अग्नि साक्षी मंगल मिलन
          </motion.p>
        </motion.div>

        {/* Cinematic Scene */}
        <div className="relative z-10 w-[88%] sm:w-[84%] md:w-[80%] max-w-[950px] mx-auto mt-6 sm:mt-10 lg:mt-12 flex justify-center">
            
            {/* The Scene Coordinate System */}
            {/* Dictated strictly by the Mandap's natural aspect ratio. All assets scale together inside this. */}
            <div className="relative w-full">
                
                {/* Layer 1: Soft Glow (Behind Mandap) */}
                <motion.img
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.35, transition: { duration: 3, delay: 0.5 } }}
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  viewport={{ once: true }}
                  src={ASSETS.softGlow}
                  className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[70%] max-w-[700px] pointer-events-none mix-blend-screen z-0"
                  alt=""
                />

                {/* Layer 2: Mandap Overlay (Master Size Definer) */}
                <motion.img 
                  initial={{ opacity: 0, y: "4%" }}
                  whileInView={{ opacity: 1, y: "0%", transition: { duration: 3, ease: "easeOut", delay: 0.2 } }}
                  viewport={{ once: true }}
                  src={ASSETS.mandapOverlay} 
                  className="relative w-full h-auto object-contain object-bottom pointer-events-none z-10 block" 
                  style={{
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 95%, 95% 98%, 88% 99.5%, 80% 100%, 20% 100%, 12% 99.5%, 5% 98%, 0% 95%)"
                  }}
                  alt="Mandap" 
                />

                {/* Layer 3: Jasmine Strands */}
                <motion.img 
                  initial={{ opacity: 0, y: "-10%" }}
                  whileInView={{ opacity: 0.9, y: "0%", transition: { duration: 2.5, ease: "easeOut", delay: 0.8 } }}
                  animate={{ x: [0, 3, 0], rotate: [0, 1, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  viewport={{ once: true }}
                  src={ASSETS.jasmineStrand} 
                  className="absolute top-[12%] left-[23%] w-[4.5%] h-auto pointer-events-none z-20 origin-top drop-shadow-sm" 
                  alt="" 
                />
                <motion.img 
                  initial={{ opacity: 0, y: "-10%" }}
                  whileInView={{ opacity: 0.9, y: "0%", transition: { duration: 2.5, ease: "easeOut", delay: 0.9 } }}
                  animate={{ x: [0, -3, 0], rotate: [0, -1, 0] }}
                  transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
                  viewport={{ once: true }}
                  src={ASSETS.jasmineStrand} 
                  className="absolute top-[12%] right-[23%] w-[4.5%] h-auto pointer-events-none z-20 origin-top drop-shadow-sm" 
                  alt="" 
                />

                {/* Layer 4: Fire Assembly (Kund, Flame, Smoke) */}
                <div className="absolute bottom-[16%] left-1/2 -translate-x-1/2 w-[22%] z-30 flex flex-col items-center justify-end pointer-events-none">
                  
                  {/* Sacred Smoke */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1, transition: { duration: 3, delay: 2.2 } }}
                    viewport={{ once: true }}
                    className="absolute bottom-[55%] w-[120%] flex justify-center mix-blend-screen z-10"
                  >
                    <motion.img
                      animate={{ y: ["0%", "-15%"], x: ["0%", "3%", "-2%"], opacity: [0, 0.35, 0] }}
                      transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                      src={ASSETS.sacredSmoke}
                      className="w-full h-auto"
                      alt=""
                    />
                  </motion.div>

                  {/* Havan Flame */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1, transition: { duration: 2, delay: 1.6 } }}
                    viewport={{ once: true }}
                    className="absolute bottom-[75%] w-[40%] flex justify-center origin-bottom z-20"
                  >
                    <motion.img
                      animate={{ 
                        scaleY: [1, 1.05, 0.95, 1.05, 1], 
                        scaleX: [1, 0.98, 1.02, 0.98, 1], 
                        opacity: [0.85, 0.95, 0.85, 0.95, 0.85] 
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      src={ASSETS.havanFlame}
                      className="w-full h-auto origin-bottom"
                      alt=""
                    />
                  </motion.div>

                  {/* Havan Kund */}
                  <motion.img
                    initial={{ opacity: 0, y: "15%" }}
                    whileInView={{ opacity: 1, y: "0%", transition: { duration: 2.5, ease: "easeOut", delay: 1.2 } }}
                    viewport={{ once: true }}
                    src={ASSETS.havanKund}
                    className="relative w-full h-auto drop-shadow-2xl z-30"
                    alt="Havan Kund"
                  />
                </div>

                {/* Layer 5: Foreground Floral */}
                <motion.img
                  initial={{ opacity: 0, y: "8%" }}
                  whileInView={{ opacity: 0.85, y: "0%", transition: { duration: 2.5, ease: "easeOut", delay: 2.8 } }}
                  viewport={{ once: true }}
                  src={ASSETS.mandapFloral}
                  className="absolute -bottom-[8%] left-1/2 -translate-x-1/2 w-[82%] h-auto object-contain object-bottom pointer-events-none z-40"
                  alt="Floral Foreground"
                />

            </div>
        </div>
      </section>

      {/* SECTION 7: TWO LIVES • ONE CONFLUENCE */}
      <section className="relative z-10 w-full flex flex-col items-center justify-center bg-[#F8F0DF] py-16 sm:py-20 md:py-12 lg:py-16 min-h-0 md:min-h-[82vh] overflow-hidden">
        
        {/* Master background - matching approved sections exactly */}
        <motion.img 
          initial={{ scale: 1.05, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1, transition: { duration: 3, ease: "easeOut" } }}
          viewport={{ once: true, amount: 0.1 }}
          src={ASSETS.familyBg}
          alt=""
          className="absolute inset-0 w-full h-full object-fill z-0 pointer-events-none origin-center" 
        />

        {/* Subtle background botanical accent */}
        <motion.img 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.12, transition: { duration: 1.5, ease: "easeOut", delay: 2.0 } }}
          viewport={{ once: true, amount: 0.2 }}
          src={ASSETS.botanicalAccent} 
          alt="" 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] md:w-[60%] lg:w-[45%] h-auto object-contain pointer-events-none z-0 opacity-10" 
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-12 flex flex-col items-center text-center py-0"
        >
          {/* Top Text Content */}
          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut", delay: 0.2 } } }} 
            className="text-[#5A1520] text-[28px] sm:text-4xl md:text-5xl font-tiro mb-3 sm:mb-5 drop-shadow-sm"
          >
            दो जीवन • एक संगम
          </motion.h2>

          <motion.img
            variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1, transition: { duration: 1.5, ease: "easeOut", delay: 0.4 } } }}
            src={ASSETS.goldDivider}
            alt=""
            className="w-40 sm:w-56 md:w-72 h-auto mb-8 sm:mb-12 origin-center opacity-90 drop-shadow-sm"
          />

          {/* Portrait Frames (Side-by-side on all devices) */}
          <div className="w-full flex flex-row items-center justify-center gap-1 sm:gap-6 md:gap-12 lg:gap-16 mb-10 sm:mb-16">
            
            {/* Bride Frame */}
            <motion.div 
              variants={{ hidden: { opacity: 0, x: -15 }, visible: { opacity: 1, x: 0, transition: { duration: 1.4, ease: "easeOut", delay: 0.8 } } }}
              className="flex flex-col items-center w-[46%] sm:w-[40%] md:w-[38%] max-w-[340px]"
            >
              <div 
                className="relative w-full flex items-center justify-center mb-3 sm:mb-6"
                style={{ aspectRatio: "1134/1387" }}
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-[#B78B4A] opacity-[0.06] blur-2xl rounded-full scale-[0.8] z-0 pointer-events-none"></div>
                
                {/* Image Placeholder Container for Bride */}
                <div 
                  className="absolute overflow-hidden rounded-t-full z-0 flex items-center justify-center"
                  style={{ top: "17.4%", bottom: "9.3%", left: "27.5%", right: "27.6%" }}
                >
                   <img src={ASSETS.coupleKavya} alt="काव्या" className="w-full h-full object-cover object-center" />
                </div>
                
                {/* Frame */}
                <img 
                  src={ASSETS.coupleStoryFrame} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-contain drop-shadow-lg z-10"
                />
              </div>
              <h3 className="text-[#5A1520] text-xl sm:text-2xl md:text-3xl font-amita drop-shadow-sm">काव्या</h3>
            </motion.div>

            {/* Tiny Antique-Gold Connector */}
            <motion.div
              variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 0.7, scale: 1, transition: { duration: 1.2, ease: "easeOut", delay: 1.4 } } }}
              className="flex flex-col items-center justify-center px-1 sm:px-2 z-10"
            >
              <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rotate-45 bg-[#B78B4A] opacity-70 drop-shadow-sm"></div>
            </motion.div>

            {/* Groom Frame */}
            <motion.div 
              variants={{ hidden: { opacity: 0, x: 15 }, visible: { opacity: 1, x: 0, transition: { duration: 1.4, ease: "easeOut", delay: 1.1 } } }}
              className="flex flex-col items-center w-[46%] sm:w-[40%] md:w-[38%] max-w-[340px]"
            >
              <div 
                className="relative w-full flex items-center justify-center mb-3 sm:mb-6"
                style={{ aspectRatio: "1134/1387" }}
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-[#B78B4A] opacity-[0.06] blur-2xl rounded-full scale-[0.8] z-0 pointer-events-none"></div>
                
                {/* Image Placeholder Container for Groom */}
                <div 
                  className="absolute overflow-hidden rounded-t-full z-0 flex items-center justify-center"
                  style={{ top: "17.4%", bottom: "9.3%", left: "27.5%", right: "27.6%" }}
                >
                   <img src={ASSETS.coupleAditya} alt="आदित्य" className="w-full h-full object-cover object-[center_15%]" />
                </div>
                
                {/* Frame - Mirrored for visual balance */}
                <img 
                  src={ASSETS.coupleStoryFrame} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-contain drop-shadow-lg z-10 scale-x-[-1]"
                />
              </div>
              <h3 className="text-[#5A1520] text-xl sm:text-2xl md:text-3xl font-amita drop-shadow-sm">आदित्य</h3>
            </motion.div>
          </div>

          {/* Bottom Text */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut", delay: 1.8 } } }}
            className="flex flex-col items-center w-full"
          >
            <div className="text-[#5A1520] text-3xl sm:text-4xl lg:text-5xl font-amita mb-5 sm:mb-7 drop-shadow-sm">
              काव्या & आदित्य
            </div>
            
            <div className="text-[#4A2014] font-noto text-[15px] sm:text-[17px] md:text-[19px] leading-[1.9] sm:leading-[2] max-w-[95%] md:max-w-2xl mx-auto opacity-90 space-y-4">
              <p>
                दो अलग राहों से चलकर,<br className="hidden sm:block" />
                अब एक ही जीवन-पथ पर साथ चलने की शुरुआत।
              </p>
              <p>
                दो जीवन, दो परिवार और एक नई शुरुआत —<br className="hidden sm:block" />
                जहाँ साथ केवल आज का नहीं,<br className="hidden sm:block" />
                पूरे जीवन का वचन बनता है।
              </p>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* SECTION 8: OUR STORY */}
      <section className="relative z-10 w-full flex flex-col items-center justify-center bg-[#F8F0DF] py-12 sm:py-20 md:py-28 lg:py-32 overflow-hidden">
        
        {/* Master background - matching approved sections exactly */}
        <motion.img 
          initial={{ scale: 1.05, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1, transition: { duration: 3, ease: "easeOut" } }}
          viewport={{ once: true, amount: 0.1 }}
          src={ASSETS.familyBg}
          alt=""
          className="absolute inset-0 w-full h-full object-fill z-0 pointer-events-none origin-center" 
        />
        
        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[90%] sm:max-w-4xl lg:max-w-6xl mx-auto flex flex-col items-center">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
            }}
            className="flex flex-col items-center text-center w-full mb-6 sm:mb-16 md:mb-24"
          >
            <h2 className="text-[#5A1520] text-3xl sm:text-4xl md:text-5xl font-tiro mb-2 sm:mb-6 drop-shadow-sm">
              हमारी कहानी
            </h2>
            <p className="text-[#4A2014] text-[15px] sm:text-[19px] md:text-[21px] font-noto font-medium leading-[1.7] md:leading-[1.9] max-w-2xl opacity-90">
              कुछ मुलाक़ातें संयोग होती हैं,<br className="hidden sm:block" />
              कुछ रिश्ते धीरे-धीरे घर बन जाते हैं।
            </p>
          </motion.div>

          {/* Story Timeline */}
          <div className="relative hidden md:flex w-full flex-col gap-[90px] lg:gap-[100px] pb-12">
            
            {/* Connecting Line (Desktop/Tablet) */}
            <div className="hidden md:block absolute left-1/2 top-[5%] bottom-[5%] w-[1px] bg-gradient-to-b from-transparent via-[#B78B4A] to-transparent opacity-40 -translate-x-1/2" />

            {/* Moment 1 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.3 } } }}
              className="flex flex-col md:flex-row items-center w-full gap-1 sm:gap-6 md:gap-10 lg:gap-16"
            >
              {/* Image Left */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
                <motion.img 
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } } }}
                  src={ASSETS.story1} 
                  alt="पहली मुलाक़ात" 
                  className="w-[64vw] max-w-[250px] md:w-auto h-auto md:max-h-[340px] lg:max-h-[360px] object-contain drop-shadow-xl rounded-sm" 
                />
              </div>
              
              {/* Text Right */}
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left relative z-10 px-2 md:px-0">
                <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } } }} className="text-[#B78B4A] font-tiro text-3xl sm:text-4xl md:text-6xl lg:text-7xl opacity-40 mb-0 md:mb-2 md:-ml-1">01</motion.div>
                <motion.h3 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }} className="text-[#5A1520] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-amita mb-1 sm:mb-3 drop-shadow-sm">पहली मुलाक़ात</motion.h3>
                <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.2 } } }} className="text-[#4A2014] font-noto text-[14px] sm:text-[15px] md:text-[17px] leading-relaxed opacity-85 max-w-[95%] md:max-w-[400px] mx-auto md:mx-0">
                  एक अनजानी सी शुरुआत, जिसने दिल के तारों को कुछ इस तरह छुआ कि हर अजनबी पल भी अपना सा लगने लगा।
                </motion.p>
              </div>
            </motion.div>

            {/* Moment 2 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.3 } } }}
              className="flex flex-col md:flex-row-reverse items-center w-full gap-1 sm:gap-6 md:gap-10 lg:gap-16"
            >
              {/* Image Right */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-start relative">
                <motion.img 
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } } }}
                  src={ASSETS.story2} 
                  alt="साथ का सफ़र" 
                  className="w-[64vw] max-w-[250px] md:w-auto h-auto md:max-h-[340px] lg:max-h-[360px] object-contain drop-shadow-xl rounded-sm" 
                />
              </div>
              
              {/* Text Left */}
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-end text-center md:text-right relative z-10 px-2 md:px-0">
                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } } }} className="text-[#B78B4A] font-tiro text-3xl sm:text-4xl md:text-6xl lg:text-7xl opacity-40 mb-0 md:mb-2 md:-mr-1">02</motion.div>
                <motion.h3 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }} className="text-[#5A1520] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-amita mb-1 sm:mb-3 drop-shadow-sm">साथ का सफ़र</motion.h3>
                <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.2 } } }} className="text-[#4A2014] font-noto text-[14px] sm:text-[15px] md:text-[17px] leading-relaxed opacity-85 max-w-[95%] md:max-w-[400px] mx-auto md:mx-0">
                  हँसी, बातों और छोटे-छोटे अनमोल लम्हों से बुना गया वह सफर, जहाँ दो अलग दुनिया एक हो गईं।
                </motion.p>
              </div>
            </motion.div>

            {/* Moment 3 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.3 } } }}
              className="flex flex-col md:flex-row items-center w-full gap-1 sm:gap-6 md:gap-10 lg:gap-16"
            >
              {/* Image Left */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
                <motion.img 
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } } }}
                  src={ASSETS.story3} 
                  alt="हमेशा के लिए" 
                  className="w-[64vw] max-w-[250px] md:w-auto h-auto md:max-h-[340px] lg:max-h-[360px] object-contain drop-shadow-xl rounded-sm" 
                />
              </div>
              
              {/* Text Right */}
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left relative z-10 px-2 md:px-0">
                <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } } }} className="text-[#B78B4A] font-tiro text-3xl sm:text-4xl md:text-6xl lg:text-7xl opacity-40 mb-0 md:mb-2 md:-ml-1">03</motion.div>
                <motion.h3 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }} className="text-[#5A1520] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-amita mb-1 sm:mb-3 drop-shadow-sm">हमेशा के लिए</motion.h3>
                <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.2 } } }} className="text-[#4A2014] font-noto text-[14px] sm:text-[15px] md:text-[17px] leading-relaxed opacity-85 max-w-[95%] md:max-w-[400px] mx-auto md:mx-0">
                  अब यह रिश्ता सिर्फ यादें नहीं, बल्कि एक दूसरे का हाथ थाम कर उम्र भर साथ चलने का खूबसूरत वचन बन चुका है।
                </motion.p>
              </div>
            </motion.div>

          </div>

          {/* Mobile Storybook */}
          <div className="relative flex md:hidden w-full flex-col items-center mt-2 overflow-visible">
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
                    <div key={i} className="flex flex-col items-center text-center w-[72%] max-w-[270px] mx-auto pointer-events-none drop-shadow-sm pb-2">
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
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Mobile Nav */}
            <div className="relative w-[72%] max-w-[270px] mx-auto flex flex-col items-center z-20 mt-4 mb-2">
              <div className="flex items-center gap-3 text-[#B78B4A] text-xs opacity-70 mb-4 tracking-widest font-noto">
                <span className={storyPage === 0 ? "opacity-100 font-bold scale-110 transition-transform" : ""}>01</span> • 
                <span className={storyPage === 1 ? "opacity-100 font-bold scale-110 transition-transform" : ""}>02</span> • 
                <span className={storyPage === 2 ? "opacity-100 font-bold scale-110 transition-transform" : ""}>03</span>
              </div>
              <div className="flex items-center justify-between w-full">
                 <button 
                   onClick={() => paginateStory(-1)} 
                   className={`text-[#5A1520] font-noto text-[13px] font-medium tracking-wide opacity-90 transition-opacity ${storyPage === 0 ? 'invisible' : 'visible'}`}
                 >
                   ← पिछली
                 </button>
                 <button 
                   onClick={() => paginateStory(1)} 
                   className={`text-[#5A1520] font-noto text-[13px] font-medium tracking-wide opacity-90 transition-opacity ${storyPage === 2 ? 'invisible' : 'visible'}`}
                 >
                   अगली →
                 </button>
              </div>
            </div>
          </div>

          {/* Ending Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut" } } }}
            className={`w-[72%] max-w-[270px] md:w-full md:max-w-none mx-auto text-center mt-4 sm:mt-12 md:mt-16 mb-6 md:mb-8 ${storyPage === 2 ? "block" : "hidden md:block"}`}
          >
            <p className="text-[#5A1520] text-[16px] sm:text-[20px] md:text-[26px] font-amita leading-relaxed drop-shadow-sm w-full mx-auto opacity-95">
              “और अब, इस कहानी का सबसे सुंदर अध्याय<br className="block md:hidden" /> शुरू होने वाला है…”
            </p>
          </motion.div>

        </div>
      </section>

    
      {/* SECTION 10: VENUE */}
      <section className="relative w-full flex flex-col items-center text-center bg-[#F8F0DF] py-12 sm:py-20 md:py-28 lg:py-32 min-h-[100svh] md:min-h-[82svh] lg:min-h-0 overflow-hidden">
        {/* Master background */}
        <motion.img 
          initial={{ scale: 1.05, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1, transition: { duration: 3, ease: "easeOut" } }}
          viewport={{ once: true, amount: 0.1 }}
          src={ASSETS.familyBg}
          alt=""
          className="absolute inset-0 w-full h-full object-fill z-0 pointer-events-none origin-center" 
        />
        
        {/* Venue Content */}
        <div className="relative z-10 w-full max-w-[90%] sm:max-w-4xl lg:max-w-6xl mx-auto flex flex-col items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut", staggerChildren: 0.2 } }
            }}
            className="flex flex-col items-center text-center w-full relative"
          >
            {/* Subtle warm glow around content */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,248,235,0.7)_0%,transparent_70%)] pointer-events-none blur-2xl -z-10" />

            <motion.h2 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-[#5A1520] text-[28px] sm:text-4xl md:text-5xl font-tiro mb-6 sm:mb-8 drop-shadow-sm">आपका आगमन</motion.h2>
            
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} className="mb-6 sm:mb-8">
              <img src={ASSETS.goldDivider} alt="" className="w-24 sm:w-32 h-auto opacity-80 drop-shadow-sm" />
            </motion.div>

            <motion.p variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} className="text-[#4A2014] font-noto text-[16px] sm:text-[19px] md:text-[21px] leading-[2] font-medium mb-10 sm:mb-12 drop-shadow-sm">
              हमारे शुभ विवाह में आपका सादर स्वागत है।
            </motion.p>
            
            {/* Venue Details */}
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col items-center mb-8 sm:mb-10">
              <span className="text-[#5A1520] text-[22px] sm:text-[28px] md:text-[32px] font-tiro mb-2 drop-shadow-sm">Jai Mahal Palace</span>
              <span className="text-[#B78B4A] font-noto text-[16px] sm:text-[20px] font-medium tracking-wide drop-shadow-sm">Jaipur, Rajasthan</span>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col items-center mb-8 sm:mb-10">
              <span className="text-[#B78B4A] font-noto text-[18px] sm:text-[22px] md:text-[24px] font-medium tracking-widest drop-shadow-sm mb-2">12 December 2026</span>
              <span className="text-[#5A1520] font-amita text-[18px] sm:text-[22px] md:text-[24px] drop-shadow-sm">रात्रि 9:00 बजे</span>
            </motion.div>

            <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-[#4A2014] font-noto text-[14px] sm:text-[16px] md:text-[18px] leading-[1.8] opacity-85 mb-12 sm:mb-16 max-w-[280px] sm:max-w-md mx-auto drop-shadow-sm">
              Jacob Road, Civil Lines,<br />
              Jaipur, Rajasthan 302006
            </motion.p>

            {/* Buttons */}
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col sm:flex-row items-center justify-center w-full gap-5 sm:gap-8">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Jai+Mahal+Palace,+Jacob+Road,+Civil+Lines,+Jaipur,+Rajasthan+302006" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative group flex items-center justify-center px-10 py-3.5 bg-gradient-to-br from-[#F4E6C8] to-[#E8D1A7] border border-[#B78B4A]/60 rounded-sm shadow-[0_4px_14px_rgba(90,21,32,0.12)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(90,21,32,0.18)] hover:-translate-y-0.5 overflow-hidden w-[80%] sm:w-auto max-w-[280px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFF8EB]/60 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                <span className="relative z-10 text-[#5A1520] font-noto text-[15px] sm:text-[17px] font-medium tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
                  स्थान देखें →
                </span>
              </a>

              <a 
                href="tel:7827357021"
                className="relative group flex items-center justify-center px-10 py-3.5 bg-[#F8F0DF]/50 border border-[#5A1520]/30 rounded-sm shadow-sm transition-all duration-300 hover:bg-[#F4E6C8]/80 hover:border-[#5A1520]/50 hover:-translate-y-0.5 w-[80%] sm:w-auto max-w-[280px]"
              >
                <span className="relative z-10 text-[#5A1520] font-noto text-[15px] sm:text-[17px] font-medium tracking-wide">
                  संपर्क करें
                </span>
              </a>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* SECTION 11: RSVP */}
      <RsvpSection />

    
      {/* FINAL SECTION: आपका आशीर्वाद */}
      <section className="relative w-full flex flex-col items-center justify-center text-center bg-[#F8F0DF] py-16 sm:py-24 md:py-32 lg:py-40 min-h-[100svh] md:min-h-[82svh] lg:min-h-[100svh] overflow-hidden">
        {/* Master background - Slow ambient breathing */}
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1.02, opacity: 1, transition: { duration: 4, ease: "easeOut" } }}
          animate={{ scale: [1.02, 1.05, 1.02] }}
          transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
          viewport={{ once: true, amount: 0.1 }}
          src={ASSETS.familyBg}
          alt=""
          className="absolute inset-0 w-full h-full object-fill z-0 pointer-events-none origin-center opacity-90" 
        />
        
        {/* Warm Overlay to make it feel settled */}
        <div className="absolute inset-0 bg-[#F8F0DF]/30 z-0 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(255,248,235,0.85)_0%,rgba(248,240,223,0.2)_60%,transparent_100%)] pointer-events-none blur-3xl z-0" />

        <div className="relative z-10 w-full max-w-[90%] sm:max-w-4xl lg:max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 1.8, ease: "easeOut", staggerChildren: 0.3 } }
            }}
            className="flex flex-col items-center text-center w-full"
          >
            <motion.h2 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 1.5 } } }} className="text-[#5A1520] text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-tiro mb-8 sm:mb-12 drop-shadow-sm tracking-wide">
              आपका आशीर्वाद
            </motion.h2>
            
            <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 2 } } }} className="text-[#4A2014] font-noto text-[16px] sm:text-[19px] md:text-[22px] leading-[2.2] font-medium opacity-90 mb-10 sm:mb-14 max-w-[300px] sm:max-w-md mx-auto">
              आपका साथ, आपका स्नेह और आपका आशीर्वाद<br />
              हमारे लिए इस नए सफ़र की सबसे सुंदर शुरुआत है।
            </motion.p>

            <motion.div variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 1.5 } } }} className="flex flex-col items-center mb-10 sm:mb-16">
              <span className="text-[#5A1520] font-amita text-[26px] sm:text-[34px] md:text-[42px] mb-3 drop-shadow-md">काव्या & आदित्य</span>
              <span className="text-[#B78B4A] font-tiro italic text-[15px] sm:text-[18px] opacity-80">With love and gratitude</span>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 1.5 } } }} className="flex flex-col items-center gap-1.5 sm:gap-2 mb-14 sm:mb-20">
              <span className="text-[#B78B4A] font-noto text-[15px] sm:text-[17px] font-medium tracking-[0.2em] uppercase">12 December 2026</span>
              <span className="text-[#B78B4A] font-noto text-[14px] sm:text-[15px] tracking-[0.1em] uppercase opacity-80">Jaipur, Rajasthan</span>
            </motion.div>

            <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 2, delay: 0.5 } } }} className="text-[#5A1520] font-noto text-[14px] sm:text-[16px] font-medium tracking-wide opacity-70 italic border-t border-[#B78B4A]/30 pt-6 px-4 w-[80%] sm:w-[60%]">
              “आँगन से मंडप तक — एक निमंत्रण, एक उत्सव, एक याद।”
            </motion.p>

          </motion.div>
        </div>
      </section>
</main>
  );
}
