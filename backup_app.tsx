import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useScroll, useMotionTemplate } from 'motion/react';

const ASSETS = {
  entrance: "https://lh3.googleusercontent.com/d/1WZpZ2vSFvDFVoAmAyMdyiVei4SUcQllQ",
  curtain: "https://lh3.googleusercontent.com/d/1r0AN7KEwdB3Xlx9DoF3RHgEP9E2nXmf8",
  tassel: "https://lh3.googleusercontent.com/d/156hvtCuQWSzDYzVvmF22birhPm6rsDDO",
  hero: "https://lh3.googleusercontent.com/d/1cbioxdcr0QqL-TEaTycPdnsgqh24xIN5",
  invitation: "https://lh3.googleusercontent.com/d/1DwFZLihmAm0THV9VZ3EAtvhcUaCZjqVr"
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] } 
  }
};

export default function App() {
  const transitionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: transitionRef,
    offset: ["start start", "center start"]
  });

  const maskSize = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const maskStyle = useMotionTemplate`${maskSize}vmax`;
  const stickyVisibility = useTransform(scrollYProgress, v => v >= 1 ? "hidden" : "visible");
  const invitationVisibility = useTransform(scrollYProgress, v => v >= 1 ? "visible" : "hidden");

  const [leftHooked, setLeftHooked] = useState(false);
  const [rightHooked, setRightHooked] = useState(false);
  const [showHeroContent, setShowHeroContent] = useState(false);

  const isOpen = leftHooked && rightHooked;

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowHeroContent(true);
      }, 1650);
      return () => clearTimeout(timer);
    }
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
      className="relative w-full min-h-[100dvh] overflow-x-hidden bg-[#F8F0DF] selection:bg-[#D89A32] selection:text-white"
    >
      {/* HERO SECTION WRAPPED IN TRANSITION */}
      <div ref={transitionRef} className="relative w-full h-[200dvh] z-20">
        <motion.div 
          className="sticky top-0 w-full h-[100dvh] overflow-hidden"
          style={{ visibility: stickyVisibility }}
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
                className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 text-center w-full max-w-[550px] lg:max-w-[700px] mx-auto h-[100dvh] pb-[12vh] sm:pb-[14vh]"
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
                <motion.p variants={itemVariants} className="relative z-10 text-[#4A2014] font-serif tracking-wider uppercase text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] mb-4 sm:mb-6 drop-shadow-sm font-medium">
                  Together with our families
                </motion.p>
                
                <motion.div variants={itemVariants} className="relative z-10 flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-4 md:gap-5 mb-3 sm:mb-5">
                  <h2 className="text-[34px] min-[380px]:text-[38px] sm:text-[46px] md:text-[64px] lg:text-[72px] leading-none font-amita text-[#5A1520] font-normal drop-shadow-sm">
                    काव्या
                  </h2>
                  <span className="text-[#B78B4A] text-[20px] min-[380px]:text-[24px] sm:text-[28px] md:text-[36px] font-serif italic drop-shadow-sm mt-1 sm:mt-2">
                    &
                  </span>
                  <h2 className="text-[34px] min-[380px]:text-[38px] sm:text-[46px] md:text-[64px] lg:text-[72px] leading-none font-amita text-[#5A1520] font-normal drop-shadow-sm">
                    आदित्य
                  </h2>
                </motion.div>
                
                <motion.p variants={itemVariants} className="relative z-10 font-serif text-[#4A2014] text-[12px] sm:text-[14px] md:text-[16px] lg:text-[17px] mb-6 sm:mb-10 tracking-[0.15em] uppercase drop-shadow-sm font-medium">
                  Kavya & Aditya
                </motion.p>
                
                <motion.p variants={itemVariants} className="relative z-10 text-[16px] min-[380px]:text-[18px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-noto text-[#5A1520] mb-8 sm:mb-10 md:mb-12 max-w-[90%] sm:max-w-md mx-auto leading-relaxed drop-shadow-sm font-medium">
                  “दो दिल, दो परिवार, एक उत्सव।”
                </motion.p>
                
                <motion.div variants={itemVariants} className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-1.5 min-[380px]:gap-2 sm:gap-4 font-serif text-[#3A1015] uppercase font-medium max-w-[95%]">
                  <p className="text-[14px] min-[380px]:text-[15px] sm:text-[16px] md:text-[18px] lg:text-[19px] tracking-wider drop-shadow-[0_1px_2px_rgba(255,248,233,0.9)]">12 December 2026</p>
                  <span className="hidden sm:inline-block text-[#B78B4A] text-[18px] font-normal drop-shadow-none">•</span>
                  <p className="text-[13px] min-[380px]:text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] tracking-wider drop-shadow-[0_1px_2px_rgba(255,248,233,0.9)] opacity-95">Jaipur, Rajasthan</p>
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

        {/* 3. Curtains */}
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
              <div className="absolute inset-y-0 left-0 w-[100vw] flex justify-center">
                <img 
                  src={ASSETS.curtain} 
                  className="w-[125vw] h-[115dvh] -translate-y-[7dvh] object-cover object-top max-w-none flex-shrink-0" 
                  alt="" 
                />
              </div>
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
              <div className="absolute inset-y-0 right-0 w-[100vw] flex justify-center">
                <img 
                  src={ASSETS.curtain} 
                  className="w-[125vw] h-[115dvh] -translate-y-[7dvh] object-cover object-top max-w-none flex-shrink-0" 
                  alt="" 
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Tie-Back Holders */}
          <motion.div
            className="absolute top-[50%] -translate-y-1/2 left-[8vw] w-2 h-16 sm:h-20 rounded-full z-40 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, #A67C33, #F8E092, #A67C33)',
              boxShadow: '2px 4px 10px rgba(0,0,0,0.5), inset -1px -1px 4px rgba(0,0,0,0.4)',
              border: '1px solid rgba(248,224,146,0.3)',
              opacity: holderHighlightLeft
            }}
          />
          <motion.img
            src={ASSETS.tassel}
            className="absolute top-[52%] -translate-y-1/2 left-[7vw] w-[35px] sm:w-[45px] drop-shadow-xl z-40 pointer-events-none"
            style={{ opacity: holderHighlightLeft }}
            alt=""
          />

          <motion.div
            className="absolute top-[50%] -translate-y-1/2 right-[8vw] w-2 h-16 sm:h-20 rounded-full z-40 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, #A67C33, #F8E092, #A67C33)',
              boxShadow: '-2px 4px 10px rgba(0,0,0,0.5), inset 1px -1px 4px rgba(0,0,0,0.4)',
              border: '1px solid rgba(248,224,146,0.3)',
              opacity: holderHighlightRight
            }}
          />
          <motion.img
            src={ASSETS.tassel}
            className="absolute top-[52%] -translate-y-1/2 right-[7vw] w-[35px] sm:w-[45px] drop-shadow-xl z-40 pointer-events-none"
            style={{ opacity: holderHighlightRight }}
            alt=""
          />
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
            onDragEnd={handleDragEndLeft}
            onClick={() => {
              if (!leftHooked) {
                setLeftHooked(true);
                animate(xLeft, -maxDrag, { type: "tween", ease: "easeOut", duration: 0.4 });
              }
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
            onDragEnd={handleDragEndRight}
            onClick={() => {
              if (!rightHooked) {
                setRightHooked(true);
                animate(xRight, maxDrag, { type: "tween", ease: "easeOut", duration: 0.4 });
              }
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

      {/* TRANSITION MASK LAYER */}
      <motion.div 
        className="absolute inset-0 z-50 pointer-events-none"
        style={{
          WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 120'%3E%3Cpath d='M0,120 L100,120 L100,60 C100,45 90,45 85,35 C80,20 65,25 50,5 C35,25 20,20 15,35 C10,45 0,45 0,60 Z' fill='black' /%3E%3C/svg%3E")`,
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: '50% 85%',
          WebkitMaskSize: maskStyle,
          maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 120'%3E%3Cpath d='M0,120 L100,120 L100,60 C100,45 90,45 85,35 C80,20 65,25 50,5 C35,25 20,20 15,35 C10,45 0,45 0,60 Z' fill='black' /%3E%3C/svg%3E")`,
          maskRepeat: 'no-repeat',
          maskPosition: '50% 85%',
          maskSize: maskStyle,
        }}
      >
        <img src={ASSETS.invitation} className="w-full h-full object-cover object-top sm:object-center" alt="" />
      </motion.div>

        </motion.div>
      </div>

      {/* NEW SECTION: INVITATION MESSAGE */}
      <motion.div 
        className="-mt-[100dvh] relative z-10 w-full"
        style={{ visibility: invitationVisibility }}
      >
      <section className="relative z-10 w-full min-h-[100dvh] flex flex-col items-center justify-center text-center bg-[#F8F0DF] overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.15)]">
        
        {/* Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#F8F0DF]">
          <motion.div
            className="w-full h-full origin-center"
            animate={{ scale: [1, 1.05] }}
            transition={{ duration: 25, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
          >
            <img 
              src={ASSETS.invitation} 
              alt="Invitation Background" 
              className="w-full h-full object-cover object-top sm:object-center"
            />
          </motion.div>
          {/* Subtle warm ivory text-readability layer */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(248,240,223,0.85)_0%,rgba(248,240,223,0)_70%)] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center justify-center px-6 py-[18dvh] sm:py-12">
          <h2 className="text-[#5A1520] text-3xl sm:text-4xl md:text-5xl font-tiro mb-6 sm:mb-8 drop-shadow-sm">
            सादर आमंत्रण
          </h2>
          
          <div className="w-16 h-[1px] bg-[#B78B4A] opacity-70 mb-8 sm:mb-10" />

          <p className="text-[#4A2014] font-noto text-[17px] sm:text-[19px] md:text-[21px] leading-relaxed mb-6 sm:mb-8 font-medium">
            ईश्वर की असीम कृपा एवं परिवारजनों के आशीर्वाद से<br className="hidden sm:block" />
            <span className="text-[#5A1520] text-2xl sm:text-3xl md:text-4xl block my-4 font-normal font-amita drop-shadow-sm">काव्या एवं आदित्य</span>
            शुभ विवाह के पावन बंधन में बंधने जा रहे हैं।
          </p>

          <p className="text-[#4A2014] font-noto text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed mb-8 sm:mb-10">
            इस मंगल अवसर पर आप सपरिवार सादर आमंत्रित हैं।<br className="hidden sm:block" />
            कृपया पधारकर नवदंपति को अपना स्नेह एवं आशीर्वाद प्रदान करें।
          </p>

          <p className="text-[#B78B4A] font-noto text-[17px] sm:text-[19px] md:text-[21px] font-medium italic drop-shadow-sm">
            आपकी उपस्थिति हमारे लिए सौभाग्य होगी।
          </p>
        </div>
      </section>
      </motion.div>
    </main>
  );
}

