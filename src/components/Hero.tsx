'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-paper">
      {/* Texture Layer */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

      {/* Outer Glow / Soft Ambient Light */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.03)_100%)] pointer-events-none" />

      {/* Main Luxury Frame (The "Card" surface) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="relative w-full h-full min-h-[100svh] flex flex-col items-center justify-center py-20 px-4 md:px-12"
      >
        {/* Layered Inner Borders (Embossed styling) */}
        <div className="absolute inset-4 md:inset-6 border-[0.5px] border-[#C3AC8F]/50 shadow-[inset_0_0_20px_rgba(195,172,143,0.05)] pointer-events-none" />
        <div className="absolute inset-5 md:inset-7 border-[0.5px] border-[#C3AC8F]/20 pointer-events-none" />

        {/* Top Monogram / Crest Area */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="flex flex-col items-center mb-12"
        >
          {/* Subtle floral/ornamental accent above monogram */}
          <svg className="w-8 h-8 text-gold-accent/40 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
            <circle cx="12" cy="10" r="1" fill="currentColor" />
          </svg>
          <div className="w-12 h-12 flex items-center justify-center border border-gold-accent/30 rounded-full bg-stone-50/50 shadow-sm relative">
            <span className="font-script text-xl text-ink pt-1">T&N</span>
          </div>
        </motion.div>

        {/* Ceremonial Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
          className="text-center"
        >
          <span className="text-md tracking-[0.4em] uppercase text-ink-light font-medium block mb-8">
            Lễ Thành Hôn
          </span>
        </motion.div>

        {/* Main Names Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 1 }}
          className="text-center w-full z-10 flex flex-col items-center relative"
        >
          <h1 className="font-script text-7xl sm:text-8xl md:text-9xl text-ink leading-[1.1] mb-2 px-4 drop-shadow-sm">
            <span className="block md:inline">Quý Thanh</span>
            <span className="text-3xl md:text-5xl text-gold-accent/80 block md:inline md:mx-6 font-serif italic font-light">&amp;</span>
            <span className="block md:inline">Uyển Nhi</span>
          </h1>
        </motion.div>

        {/* Mid-section Divider (Elegant fine line layout) */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
          className="flex items-center w-full max-w-xs mx-auto my-12 opacity-80"
        >
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-ink-light/40" />
          <svg className="w-4 h-4 mx-4 text-gold-accent/60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L12.5 10.5L21 11L12.5 11.5L12 20L11.5 11.5L3 11L11.5 10.5L12 2Z" opacity="0.8" />
          </svg>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-ink-light/40" />
        </motion.div>

        {/* Date & Location Group */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.8 }}
          className="flex flex-col items-center space-y-4"
        >
          <p className="font-serif text-2xl md:text-4xl text-ink font-medium tracking-[0.15em] drop-shadow-sm uppercase">
            05 <span className="text-gold-accent mx-1">.</span> 07 <span className="text-gold-accent mx-1">.</span> 2026
          </p>
          <span className="text-ink-light text-md md:text-base italic font-serif opacity-90">
            (Nhằm ngày 21 tháng 05 năm Bính Ngọ)
          </span>
        </motion.div>

        {/* Corner Decorations */}
        <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-gold-accent/30 pointer-events-none hidden md:block" />
        <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-gold-accent/30 pointer-events-none hidden md:block" />
        <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-gold-accent/30 pointer-events-none hidden md:block" />
        <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-gold-accent/30 pointer-events-none hidden md:block" />

      </motion.div>
    </section>
  );
}
