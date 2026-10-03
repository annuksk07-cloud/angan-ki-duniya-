import React, { useState } from 'react';
import { usePWAInstall, useOnlineStatus } from '../hooks/usePWA';

export const PWAControls: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const isOnline = useOnlineStatus();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  return (
    <>
      {/* Offline Status Badge */}
      {!isOnline && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2 rounded-full bg-[#3A0C12]/95 border border-[#B78B4A]/60 px-4 py-1.5 text-xs font-noto text-[#F8F0DF] shadow-xl backdrop-blur-md animate-fade-in">
          <span className="h-2 w-2 rounded-full bg-[#D89A32] animate-pulse" />
          <span>ऑफ़लाइन मोड • आमंत्रण सुरक्षित है (Offline Mode)</span>
        </div>
      )}

      {/* In-App Install Prompt Button (Desktop / Android / Chromium) */}
      {!isInstalled && !isDismissed && (isInstallable || isIOS) && (
        <div className="fixed bottom-5 right-5 z-[80] flex items-center gap-1.5 animate-fade-in">
          {isInstallable && (
            <button
              onClick={install}
              className="group flex items-center gap-2 rounded-full bg-[#3A0C12]/90 hover:bg-[#5A1520] border border-[#B78B4A]/70 px-3.5 py-2 text-xs font-medium text-[#F8F0DF] shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-md"
              title="Install Aangan Wedding Invitation"
            >
              <svg className="w-3.5 h-3.5 text-[#D89A32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="font-tiro tracking-wide">ऐप इंस्टॉल करें</span>
              <span className="text-[10px] opacity-75 font-serif">(Install App)</span>
            </button>
          )}

          {isIOS && !isInstallable && (
            <button
              onClick={() => setShowIOSGuide(true)}
              className="group flex items-center gap-2 rounded-full bg-[#3A0C12]/90 hover:bg-[#5A1520] border border-[#B78B4A]/70 px-3.5 py-2 text-xs font-medium text-[#F8F0DF] shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-md"
              title="Install on iPhone / iPad"
            >
              <svg className="w-3.5 h-3.5 text-[#D89A32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v12m0 0l-4-4m4 4l4-4M4 18h16" />
              </svg>
              <span className="font-tiro tracking-wide">होम स्क्रीन पर जोड़ें</span>
              <span className="text-[10px] opacity-75 font-serif">(Add to Home)</span>
            </button>
          )}

          <button
            onClick={() => setIsDismissed(true)}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-[#2b080c]/80 text-[#B78B4A] hover:text-[#F8F0DF] text-xs transition"
            aria-label="Dismiss install button"
          >
            ✕
          </button>
        </div>
      )}

      {/* Guided iOS Safari Installation Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-[#2b080c] border border-[#B78B4A]/60 p-6 text-center shadow-2xl">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#3A0C12] border border-[#B78B4A]/50 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#D89A32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m0-16l-4 4m4-4l4 4m-8 12h16" />
              </svg>
            </div>
            <h3 className="font-tiro text-xl text-[#F8F0DF] mb-2">
              iPhone / iPad पर इंस्टॉल करें
            </h3>
            <div className="text-left font-noto text-xs sm:text-sm text-[#F8F0DF]/90 space-y-2.5 my-4 bg-[#3A0C12]/70 p-3.5 rounded-xl border border-[#B78B4A]/30">
              <p className="flex items-start gap-2">
                <span className="font-bold text-[#D89A32]">1.</span>
                <span>Safari के निचले बार में <strong>Share (साझा करें)</strong> आइकन पर टैप करें।</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="font-bold text-[#D89A32]">2.</span>
                <span>नीचे स्क्रॉल करें और <strong>"Add to Home Screen" (होम स्क्रीन में जोड़ें)</strong> चुनें।</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="font-bold text-[#D89A32]">3.</span>
                <span>शीर्ष दाईं ओर <strong>Add</strong> पर टैप करें।</span>
              </p>
            </div>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full rounded-xl bg-[#5A1520] hover:bg-[#721c2a] border border-[#B78B4A] py-2.5 text-sm font-medium text-[#F8F0DF] shadow-md transition"
            >
              समझ गया (Got It)
            </button>
          </div>
        </div>
      )}
    </>
  );
};
