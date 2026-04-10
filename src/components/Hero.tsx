'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const handleMusicToggle = () => {
    window.dispatchEvent(new CustomEvent('toggle-wedding-music'));
  };

  return (
    <section className="relative min-h-screen flex flex-col bg-paper overflow-hidden">
      {/* Top Image Section */}
      <div className="relative h-[100vh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/gallery/6.jpg"
            alt="Thanh & Nhi"
            fill
            className="object-cover object-top md:object-bottom"
            priority
          />
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </motion.div>

        {/* Text Overlay on Image */}
        <div className="absolute inset-x-0 bottom-12 md:bottom-20 flex flex-col items-center justify-center text-white z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="font-script text-6xl md:text-[10rem] mb-4 drop-shadow-lg"
          >
            We get married!
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-col items-center"
          >
            <h1 className="font-serif text-2xl md:text-4xl tracking-[0.2em] font-medium uppercase drop-shadow-md">
              QUÝ THANH & UYỂN NHI
            </h1>
            <div className="w-12 h-[1px] bg-white/60 mt-4 md:mt-6" />
          </motion.div>
        </div>
      </div>

      {/* Bottom Invitation Section */}
      <div className="relative flex-1 bg-paper flex flex-col items-center justify-center py-12 px-6">
        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex flex-col items-center space-y-8 z-10"
        >
          {/* Invitation Text */}
          <div className="text-center">
            <p className="font-serif text-md md:text-lg text-ink/70 tracking-[0.4em] uppercase font-light">
              THƯ MỜI THAM DỰ LỄ CƯỚI
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4 opacity-30">
              <div className="w-12 h-[0.5px] bg-ink" />
              <div className="w-1 h-1 bg-ink rotate-45" />
              <div className="w-12 h-[0.5px] bg-ink" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Corner (Optional, adds to luxury feel) */}
      <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-10">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-gold-accent transform rotate-90">
          <path d="M0 0C50 0 100 50 100 100" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0 20C40 20 80 60 80 100" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
    </section>
  );
}
