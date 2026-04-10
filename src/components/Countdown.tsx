'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TARGET_DATE = new Date('2026-07-05T10:30:00');

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden h-12 md:h-16 flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-4xl md:text-6xl font-serif text-ink tracking-tight"
          >
            {value.toString().padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-ink-light mt-2 font-serif opacity-70">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 px-4 bg-[#F9F7F2] overflow-hidden">
      {/* Background Watermark/Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <span className="font-script text-[30vw] md:text-[20vw] select-none text-ink">
          T & N
        </span>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div
           className="flex flex-col items-center mb-10"
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
        >
          <span className="font-script text-4xl md:text-5xl text-gold-accent mb-4">Countdown</span>
          <div className="h-px w-24 bg-linear-to-r from-transparent via-gold-accent to-transparent opacity-40" />
        </motion.div>

        <motion.div 
          className="flex items-center gap-4 md:gap-10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <TimeBox value={timeLeft.days} label="Ngày" />
          <span className="text-2xl md:text-4xl font-serif text-gold-accent/40 mb-6">:</span>
          <TimeBox value={timeLeft.hours} label="Giờ" />
          <span className="text-2xl md:text-4xl font-serif text-gold-accent/40 mb-6">:</span>
          <TimeBox value={timeLeft.minutes} label="Phút" />
          <span className="text-2xl md:text-4xl font-serif text-gold-accent/40 mb-6">:</span>
          <TimeBox value={timeLeft.seconds} label="Giây" />
        </motion.div>

        <motion.p 
          className="mt-12 text-sm md:text-base tracking-[0.15em] text-ink/60 font-serif italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Đang đếm ngược từng khoảnh khắc đến ngày hạnh phúc...
        </motion.p>
      </div>

      {/* Decorative ornaments */}
      <div className="absolute top-10 left-10 opacity-20 hidden md:block select-none">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M0 0 L0 15 M0 0 L15 0" stroke="#C3AC8F" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 hidden md:block select-none">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M40 40 L40 25 M40 40 L25 40" stroke="#C3AC8F" strokeWidth="1" />
        </svg>
      </div>
    </section>
  );
}
