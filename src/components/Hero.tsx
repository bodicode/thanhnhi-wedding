'use client';

import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-paper">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
        className="relative w-full min-h-[100svh] flex flex-col items-center justify-center py-20 px-4 md:px-12"
      >
        {/* Borders */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
          className="absolute inset-4 md:inset-6 border-[0.5px] border-[#C3AC8F]/50 pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
          className="absolute inset-5 md:inset-7 border-[0.5px] border-[#C3AC8F]/20 pointer-events-none"
        />

        {/* Save the date badge */}
        <motion.div {...fadeUp(0.4)} className="flex flex-col items-center mb-12">
          <motion.svg
            className="w-8 h-8 text-gold-accent/40 mb-3"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5"
            initial={{ opacity: 0, rotate: -20, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
            <circle cx="12" cy="10" r="1" fill="currentColor" />
          </motion.svg>
          <div className="w-60 h-12 flex items-center justify-center border border-gold-accent/30 rounded-full bg-stone-50/50 shadow-sm">
            <span className="font-script text-xl text-ink pt-1">Save The Date</span>
          </div>
        </motion.div>

        {/* Names */}
        <motion.div {...fadeUp(0.9)} className="text-center w-full z-10 flex flex-col items-center">
          <h1 className="font-script text-7xl sm:text-8xl md:text-9xl text-ink leading-[1.1] mb-2 px-4 drop-shadow-sm">
            <motion.span
              className="block md:inline"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] as const }}
            >
              Quý Thanh
            </motion.span>
            <motion.span
              className="text-3xl md:text-5xl text-gold-accent/80 block md:inline md:mx-6 font-serif italic font-light"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.3, ease: [0.16, 1, 0.3, 1] as const }}
            >
              &amp;
            </motion.span>
            <motion.span
              className="block md:inline"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] as const }}
            >
              Uyển Nhi
            </motion.span>
          </h1>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.6, ease: 'easeInOut' }}
          className="flex items-center w-full max-w-xs mx-auto my-12 opacity-80"
        >
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-ink-light/40" />
          <motion.svg
            className="w-4 h-4 mx-4 text-gold-accent/60"
            viewBox="0 0 24 24" fill="currentColor"
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <path d="M12 2L12.5 10.5L21 11L12.5 11.5L12 20L11.5 11.5L3 11L11.5 10.5L12 2Z" opacity="0.8" />
          </motion.svg>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-ink-light/40" />
        </motion.div>

        {/* Date */}
        <motion.div {...fadeUp(1.9)} className="flex flex-col items-center space-y-4">
          <p className="font-serif text-2xl md:text-4xl text-ink font-medium tracking-[0.15em] drop-shadow-sm uppercase">
            05 <span className="text-gold-accent mx-1">.</span> 07 <span className="text-gold-accent mx-1">.</span> 2026
          </p>
          <motion.span
            className="text-ink-light text-md md:text-base italic font-serif opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 1.5, delay: 2.2 }}
          >
            (Nhằm ngày 21 tháng 05 năm Bính Ngọ)
          </motion.span>
        </motion.div>

        {/* Corner decorations */}
        {['top-8 left-8 border-t border-l', 'top-8 right-8 border-t border-r', 'bottom-8 left-8 border-b border-l', 'bottom-8 right-8 border-b border-r'].map((cls, i) => (
          <motion.div
            key={i}
            className={`absolute w-8 h-8 ${cls} border-gold-accent/30 pointer-events-none hidden md:block`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
          />
        ))}
      </motion.div>
    </section>
  );
}
