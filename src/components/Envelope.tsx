'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

/* ── CSS-animated Petal (GPU-composited) ── */
function Petal({ index }: { index: number }) {
  const shapes = ['❀', '✿', '❁', '✾', '🌸', '✦', '✧', '❋'];
  const shape = shapes[index % shapes.length];
  const color = index % 3 === 0 ? '#C3AC8F' : index % 3 === 1 ? '#E8C4B8' : '#F5E6D3';
  const size = 10 + (index % 5) * 4;
  const left = (index * 13.7 + 5) % 95;
  const delay = (index * 0.7) % 6;
  const duration = 8 + (index % 4) * 3;
  const drift = (index % 2 === 0 ? 1 : -1) * (20 + (index % 3) * 15);
  const rotDir = index % 2 === 0 ? 360 : -360;

  const animName = `petal-fall-${index}`;
  const keyframes = `
    @keyframes ${animName} {
      0%   { transform: translate3d(0, -5%, 0) rotate(0deg); opacity: 0; }
      10%  { opacity: 0.7; }
      50%  { transform: translate3d(${drift}px, 50vh, 0) rotate(${rotDir / 2}deg); opacity: 0.5; }
      80%  { opacity: 0.3; }
      100% { transform: translate3d(${-drift / 2}px, 110vh, 0) rotate(${rotDir}deg); opacity: 0; }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div
        className="absolute top-0 pointer-events-none select-none"
        style={{
          left: `${left}%`,
          fontSize: size,
          color,
          willChange: 'transform, opacity',
          animation: `${animName} ${duration}s ${delay}s linear infinite`,
          opacity: 0,
        }}
      >
        {shape}
      </div>
    </>
  );
}

/* ── CSS-animated Sparkle (GPU-composited) ── */
function Sparkle({ index }: { index: number }) {
  const left = (index * 17.3 + 10) % 90;
  const top = (index * 23.1 + 5) % 85;
  const delay = (index * 0.4) % 3;
  const duration = 2.5 + (index % 3);

  return (
    <div
      className="absolute pointer-events-none rounded-full"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: index % 2 === 0 ? 3 : 2,
        height: index % 2 === 0 ? 3 : 2,
        background: index % 3 === 0 ? '#C3AC8F' : '#F5E6D3',
        willChange: 'transform, opacity',
        animation: `sparkle-pulse ${duration}s ${delay}s ease-in-out infinite`,
        opacity: 0,
      }}
    />
  );
}

export default function Envelope({ onOpen }: { onOpen: () => void }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleOpen = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      onOpen();
    }, 1000);
  };

  const petals = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);
  const sparkles = useMemo(() => Array.from({ length: 16 }, (_, i) => i), []);

  return (
    <motion.div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${isAnimating ? 'pointer-events-none' : ''}`}
      style={{
        perspective: 1500,
        background: 'radial-gradient(ellipse at 50% 40%, #FFFDF8 0%, #F9F7F1 50%, #F2EFE9 100%)',
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 2, ease: 'easeInOut' } }}
    >
      {/* Subtle ambient glow layers */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 70% 80%, rgba(195,172,143,0.15) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 20% 30%, rgba(195,172,143,0.1) 0%, transparent 50%)' }} />

      {/* Falling petals — CSS animations for GPU compositing */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {petals.map(i => <Petal key={i} index={i} />)}
      </div>

      {/* Sparkle dots — CSS animations for GPU compositing */}
      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map(i => <Sparkle key={i} index={i} />)}
      </div>

      {/* Decorative corner ornaments */}
      {[
        'top-4 left-4 rotate-0',
        'top-4 right-4 rotate-90',
        'bottom-4 left-4 -rotate-90',
        'bottom-4 right-4 rotate-180',
      ].map((cls, i) => (
        <motion.div
          key={i}
          className={`absolute ${cls} pointer-events-none`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isAnimating ? 0 : 0.6, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path d="M5 5 L5 25 M5 5 L25 5" stroke="#C3AC8F" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="5" cy="5" r="2.5" fill="#C3AC8F" />
            <path d="M15 5 Q20 15 30 15" stroke="#C3AC8F" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.6" />
          </svg>
        </motion.div>
      ))}

      <div className="flex flex-col items-center gap-5 md:gap-8 z-10 w-full max-w-3xl relative px-4 py-4 md:py-10">

        {/* Header text */}
        <motion.div
          className="flex flex-col items-center text-center"
          animate={{ opacity: isAnimating ? 0 : 1, y: isAnimating ? -15 : 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative line with diamond */}
          <div className="flex items-center gap-3 mb-3">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#C3AC8F]" />
            <span style={{ color: '#C3AC8F', fontSize: 10 }}>✦</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#C3AC8F]" />
          </div>
          <span className="font-serif tracking-[0.35em] uppercase text-xs mb-2 font-medium"
            style={{ color: '#8C6A4A' }}>
            Thiệp Báo Hỷ
          </span>
          <p className="font-script text-xl sm:text-2xl md:text-4xl leading-relaxed"
            style={{ color: '#5C3D2E' }}>
            Sự hiện diện của bạn là niềm vinh hạnh của chúng tôi
          </p>
          <div className="flex items-center gap-3 mt-3">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C3AC8F]" />
            <span style={{ color: '#C3AC8F', fontSize: 8 }}>❀ ✦ ❀</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C3AC8F]" />
          </div>
        </motion.div>

        {/* Envelope Container */}
        <motion.div
          className="relative w-[80vw] max-w-2xl aspect-[1.4] cursor-pointer"
          style={{
            maxHeight: '46vh',
            animation: isAnimating ? 'none' : 'envelope-float 3.5s ease-in-out infinite',
            willChange: 'transform',
          }}
          onClick={handleOpen}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ scale: 1.02 }}
        >
          {/* Glow behind envelope */}
          <motion.div
            className="absolute inset-0 rounded-sm pointer-events-none"
            style={{ filter: 'blur(30px)', background: 'radial-gradient(ellipse, rgba(195,172,143,0.6) 0%, transparent 70%)' }}
            animate={{ opacity: hovered ? 1 : 0.5 }}
            transition={{ duration: 0.5 }}
          />

          {/* Stacked cards behind */}
          <div className="absolute inset-0 rotate-3 scale-[1.03] rounded-sm pointer-events-none"
            style={{ background: 'linear-gradient(135deg, #F5E6D0, #EDD9B8)', boxShadow: '0 4px 20px rgba(120,80,40,0.12)', border: '1px solid rgba(195,172,143,0.3)' }} />
          <div className="absolute inset-0 -rotate-2 scale-[1.015] rounded-sm pointer-events-none"
            style={{ background: 'linear-gradient(135deg, #F8EDD8, #F0DFC0)', boxShadow: '0 4px 20px rgba(120,80,40,0.1)', border: '1px solid rgba(195,172,143,0.25)' }} />

          {/* Main Envelope Body — no overflow-hidden so card can slide out */}
          <div className="absolute inset-0 rounded-sm"
            style={{ boxShadow: '0 25px 60px rgba(100,60,20,0.25), 0 8px 20px rgba(100,60,20,0.15), inset 0 1px 0 rgba(255,255,255,0.4)' }}>

            {/* Envelope base */}
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(160deg, #F5E4C4 0%, #EDD5A3 40%, #E4C88A 70%, #D4B070 100%)' }} />

            {/* Inner card — Fixed zIndex so it stays behind the pocket flaps (zIndex 20) */}
            <motion.div
              className="absolute left-3 right-3 sm:left-5 sm:right-5 top-3 bottom-3 sm:top-5 sm:bottom-5 flex flex-col items-center justify-center rounded-sm pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, #FFFDF8 0%, #FDF6E8 100%)',
                border: '1px solid rgba(195,172,143,0.4)',
                boxShadow: '0 2px 12px rgba(100,60,20,0.1)',
                zIndex: 10,
              }}
              animate={{ y: isAnimating ? '-45%' : 0 }}
              transition={{ duration: 1.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <div className="absolute inset-2 sm:inset-3 rounded-sm pointer-events-none"
                style={{ border: '1px solid rgba(195,172,143,0.25)' }} />
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 text-[8px] sm:text-[10px] opacity-40" style={{ color: '#C3AC8F' }}>❀ ✦ ❀</div>
              <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 text-[8px] sm:text-[10px] opacity-40" style={{ color: '#C3AC8F' }}>❀ ✦ ❀</div>
              <div className="flex flex-col items-center px-4 text-center pt-6 md:pt-8">
                <span className="font-script text-2xl sm:text-4xl lg:text-5xl break-words max-w-full" style={{ color: '#5C3D2E' }}>Quý Thanh &amp; Uyển Nhi</span>
                <div className="mt-1 sm:mt-2 text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.3em] uppercase font-serif opacity-50" style={{ color: '#8C6A4A' }}>
                  Trân trọng kính mời
                </div>
              </div>
            </motion.div>

            {/* Envelope pocket flaps — z-index 20 (always in front of card) */}
            <div className="absolute inset-0" style={{ zIndex: 20 }}>
              {/* Left flap */}
              <div className="absolute inset-0"
                style={{
                  clipPath: 'polygon(0 0, 51% 50%, 0 100%)',
                  background: 'linear-gradient(to right, #EDD5A3, #E8CC95)',
                  borderRight: '1px solid rgba(195,172,143,0.3)',
                }} />
              {/* Right flap */}
              <div className="absolute inset-0"
                style={{
                  clipPath: 'polygon(100% 0, 100% 100%, 49% 50%)',
                  background: 'linear-gradient(to left, #EDD5A3, #E8CC95)',
                  borderLeft: '1px solid rgba(195,172,143,0.3)',
                }} />
              {/* Bottom flap */}
              <div className="absolute inset-0"
                style={{
                  clipPath: 'polygon(0 100%, 50% 48.5%, 100% 100%)',
                  background: 'linear-gradient(to top, #D4B070, #E4C88A)',
                  borderTop: '1px solid rgba(195,172,143,0.4)',
                }} />
            </div>

            {/* Top flap - z-index high when closed, low when open */}
            <motion.div
              className="absolute inset-0 origin-top"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 52%)',
                background: 'linear-gradient(to bottom, #F0DDB0, #E4C88A)',
                borderBottom: '1px solid rgba(195,172,143,0.4)',
                zIndex: isAnimating ? 5 : 25,
              }}
              initial={{ rotateX: 0 }}
              animate={{ rotateX: isAnimating ? -180 : 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.25) 0%, transparent 60%)', clipPath: 'polygon(0 0, 100% 0, 50% 52%)' }} />
            </motion.div>

            {/* Wax Seal — zIndex 30 (always on top until hidden by opening) */}
            <motion.div
              className="absolute top-1/2 left-1/2 z-30"
              style={{ translateX: '-50%', translateY: 'calc(-50% - 4%)' }}
              animate={{
                opacity: isAnimating ? 0 : 1,
                scale: isAnimating ? 0 : [1, 1.05, 1],
              }}
              transition={isAnimating
                ? { duration: 0.5, ease: 'easeIn' }
                : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }
            >
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full pointer-events-none"
                style={{ filter: 'blur(8px)', background: 'radial-gradient(circle, rgba(195,172,143,0.8) 0%, transparent 70%)', transform: 'scale(1.4)' }} />
              {/* Seal body */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center relative"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #7A5C3A, #3D2010)',
                  boxShadow: 'inset 0 -3px 8px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1), 0 6px 20px rgba(60,30,10,0.4)',
                  border: '2px solid rgba(195,172,143,0.5)',
                }}>
                {/* Inner ring */}
                <div className="absolute inset-2 rounded-full"
                  style={{ border: '1px solid rgba(195,172,143,0.3)', background: 'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.08), transparent)' }} />
                {/* Monogram */}
                <span className="font-script text-3xl sm:text-4xl relative z-10 pt-1"
                  style={{ color: '#E5DCC5', textShadow: '0 1px 3px rgba(0,0,0,0.8), 0 0 10px rgba(195,172,143,0.4)' }}>
                  T&amp;N
                </span>
                {/* Shimmer highlight */}
                <div className="absolute top-2 left-3 w-4 h-2 rounded-full pointer-events-none"
                  style={{ background: 'rgba(255,255,255,0.15)', filter: 'blur(2px)' }} />
              </div>
            </motion.div>

            {/* Overall envelope sheen */}
            <div className="absolute inset-0 pointer-events-none rounded-sm"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(0,0,0,0.05) 100%)', zIndex: 40 }} />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          animate={{ opacity: isAnimating ? 0 : 1, y: isAnimating ? 10 : 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          {/* Decorative vertical line */}
          <div className="flex flex-col items-center gap-1 mb-5">
            <div className="w-[1px] h-5 bg-gradient-to-b from-transparent to-[#C3AC8F]" />
            <span style={{ color: '#C3AC8F', fontSize: 8 }}>✦</span>
            <div className="w-[1px] h-5 bg-gradient-to-t from-transparent to-[#C3AC8F]" />
          </div>

          <motion.button
            onClick={handleOpen}
            className="group relative px-14 py-3 uppercase tracking-[0.25em] text-xs font-medium font-serif overflow-hidden"
            style={{ color: '#5C3D2E' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Button background shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(195,172,143,0.3) 50%, transparent 100%)' }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
            />
            <span className="relative z-10">Mở Thiệp</span>
            {/* Border */}
            <div className="absolute inset-0 rounded-sm pointer-events-none"
              style={{ border: '1px solid rgba(195,172,143,0.6)', boxShadow: '0 0 12px rgba(195,172,143,0.15)' }} />
            {/* Corner accents */}
            <span className="absolute top-1 left-1 text-[8px] opacity-60" style={{ color: '#C3AC8F' }}>✦</span>
            <span className="absolute top-1 right-1 text-[8px] opacity-60" style={{ color: '#C3AC8F' }}>✦</span>
            <span className="absolute bottom-1 left-1 text-[8px] opacity-60" style={{ color: '#C3AC8F' }}>✦</span>
            <span className="absolute bottom-1 right-1 text-[8px] opacity-60" style={{ color: '#C3AC8F' }}>✦</span>
          </motion.button>

          <p className="mt-3 text-[10px] tracking-[0.2em] uppercase font-serif opacity-50" style={{ color: '#8C6A4A' }}>
            Nhấn để mở thiệp mời
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
}
