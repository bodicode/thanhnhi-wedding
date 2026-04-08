'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Envelope({ onOpen }: { onOpen: () => void }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleOpen = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Smooth cinematic opening
    setTimeout(() => {
      onOpen();
    }, 1600); // slightly longer for the luxury feel
  };

  return (
    <motion.div 
      // Deep elegant studio-light backdrop (muted stone with central soft light)
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#DED6D1]/90 backdrop-blur-xl px-4 overflow-hidden"
      style={{ 
        perspective: 1500,
        background: 'radial-gradient(circle at center, rgba(239,235,230,0.95) 0%, rgba(206,196,188,0.95) 100%)'
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 2, ease: 'easeInOut' } }}
    >
      {/* Floating dust particles (extremely subtle) / Ambient light */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.5%22/%3E%3C/svg%3E')] mix-blend-overlay" />

      <div className="flex flex-col items-center z-10 w-full max-w-2xl relative">
        
        {/* Ceremonial Text Above */}
        <motion.div 
          className="flex flex-col items-center mb-10 md:mb-14 text-center"
          animate={{ opacity: isAnimating ? 0 : 1, y: isAnimating ? -10 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-serif text-ink-light tracking-[0.3em] uppercase text-xs mb-3 font-medium">
            Thiệp Báo Hỷ
          </span>
          <p className="font-script text-ink text-4xl leading-relaxed">
            Sự hiện diện của bạn là niềm vinh hạnh
          </p>
        </motion.div>

        {/* Envelope Container with gentle breathing animation */}
        <motion.div 
          className="relative w-[90vw] max-w-xl aspect-[1.4] cursor-pointer"
          onClick={handleOpen}
          animate={{ y: isAnimating ? 0 : [0, -6, 0] }}
          transition={{ duration: 4, repeat: isAnimating ? 0 : Infinity, ease: 'easeInOut' }}
        >
          {/* Subtle background layer (a faint card underneath the envelope to show depth) */}
          <div className="absolute inset-0 bg-paper/60 rotate-2 scale-[1.02] shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-ink-light/10 pointer-events-none transition-transform duration-700" />
          
          <div className="absolute inset-0 bg-[#F4F1EC] -rotate-1 scale-[1.01] shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-ink-light/10 pointer-events-none transition-transform duration-700" />

          {/* Main Envelope Body */}
          <div className="absolute inset-0 shadow-[0_20px_50px_rgba(60,50,40,0.15)] flex">
            
            {/* Inner Envelope matching card paper */}
            <div className="absolute inset-0 bg-[#F0EBE1] shadow-inner" />
            
            {/* The Actual Invitation Card sliding/peeking inside */}
            <motion.div 
              className="absolute left-4 right-4 top-4 bottom-4 bg-paper border border-gold-accent/20 flex flex-col items-center justify-center shadow-sm"
              animate={{ 
                y: isAnimating ? -160 : 0, 
                opacity: isAnimating ? 1 : 1 
              }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Very faint inner border */}
              <div className="absolute inset-3 border border-gold-accent/10" />
              <span className="font-script text-4xl sm:text-5xl text-ink">Thanh & Nhi</span>
            </motion.div>

            {/* The Envelope Flaps Collection */}
            <div className="absolute inset-0">
              
              {/* Left Flap with detailed shading */}
              <div 
                className="absolute inset-0 bg-[#F9F7F1] border-r border-[#E5DCC5]/40"
                style={{ 
                  clipPath: 'polygon(0 0, 51% 50%, 0 100%)',
                  boxShadow: 'inset -2px 0 10px rgba(0,0,0,0.01)'
                }}
              />
              
              {/* Right Flap */}
              <div 
                className="absolute inset-0 bg-[#F9F7F1] border-l border-[#E5DCC5]/40"
                style={{ 
                  clipPath: 'polygon(100% 0, 100% 100%, 49% 50%)',
                  boxShadow: 'inset 2px 0 10px rgba(0,0,0,0.01)'
                }}
              />
              
              {/* Bottom Flap overlaying the side flaps slightly */}
              <div 
                className="absolute inset-0 bg-[#F5F2EB] drop-shadow-[0_-5px_15px_rgba(0,0,0,0.04)] border-t border-[#E5DCC5]/50"
                style={{ clipPath: 'polygon(0 100%, 50% 48.5%, 100% 100%)' }}
              />
              
              {/* Top Flap (The one that opens) */}
              <motion.div 
                className="absolute inset-0 bg-[#F8F5EE] origin-top z-10 border-b border-[#E5DCC5]/50"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 52%)' }}
                initial={{ rotateX: 0 }}
                animate={{ rotateX: isAnimating ? -180 : 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Soft gradient to simulate lighting on the top flap */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.02)]" />
              </motion.div>

              {/* Luxury Wax Seal */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+4%)] z-20 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center cursor-pointer group"
                animate={{ 
                  opacity: isAnimating ? 0 : 1,
                  scale: isAnimating ? 0 : 1 
                }}
                transition={{ duration: 0.6, ease: 'easeIn' }}
              >
                {/* Outer metallic/wax rim with shadow */}
                <div className="absolute inset-0 rounded-full bg-ink shadow-[inset_0_-3px_6px_rgba(0,0,0,0.5),_0_6px_15px_rgba(0,0,0,0.25)] border p-1" style={{ borderColor: 'rgba(195,172,143,0.4)' }}>
                  {/* Inner bevel ring */}
                  <div className="w-full h-full rounded-full border border-[rgba(255,255,255,0.1)] shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] flex items-center justify-center bg-gradient-to-br from-ink to-[#4A3B31]">
                    <span className="font-script text-3xl sm:text-4xl text-[#E5DCC5] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] pt-1">
                      T&N
                    </span>
                  </div>
                </div>
              </motion.div>
              
            </div>
          </div>
        </motion.div>

        {/* Refined CTA Button */}
        <motion.div
          animate={{ opacity: isAnimating ? 0 : 1, y: isAnimating ? 10 : 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 md:mt-20 flex flex-col items-center"
        >
          <div className="w-[1px] h-8 bg-ink/20 mb-6" />
          <button
            onClick={handleOpen}
            className="group relative px-12 py-3 bg-transparent text-ink uppercase tracking-[0.2em] text-xs font-medium transition-all duration-700"
          >
            <span className="relative z-10">Mở Thiệp</span>
            <div className="absolute inset-0 border border-ink/30 rounded-sm scale-100 group-hover:scale-105 transition-transform duration-700 ease-out" />
            <div className="absolute inset-0 bg-ink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-sm" />
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
}
