'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';

const IMAGE_NAMES = Array.from({ length: 30 }, (_, i) => `${i + 1}.jpg`);

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((i: number) => {
    setActiveIndex((i + IMAGE_NAMES.length) % IMAGE_NAMES.length);
  }, []);

  useEffect(() => {
    if (!thumbsRef.current) return;
    const container = thumbsRef.current;
    const thumb = container.children[activeIndex] as HTMLElement;
    if (thumb) {
      const scrollLeft = thumb.offsetLeft - container.offsetWidth / 2 + thumb.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(activeIndex + 1);
      if (e.key === 'ArrowLeft') goTo(activeIndex - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, goTo]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) goTo(activeIndex + 1);
    else if (info.offset.x > 50) goTo(activeIndex - 1);
  };

  const src = `/gallery/${IMAGE_NAMES[activeIndex]}`;

  return (
    <section className="relative py-20 bg-paper overflow-hidden">

      {/* Header */}
      <motion.div
        className="flex flex-col items-center mb-10 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-4 mb-10">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-accent" />
          <span className="text-gold-accent text-xs">✦</span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-accent" />
        </div>
        <p className="font-script text-4xl md:text-5xl text-ink">Album Ảnh Cưới</p>
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-4">

        {/* Main image wrapper — relative for overlay buttons */}
        <div className="relative w-full flex justify-center select-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="cursor-grab active:cursor-grabbing rounded-sm overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
            >
              {/* Plain img — browser respects natural ratio, no cropping */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={IMAGE_NAMES[activeIndex]}
                className="block pointer-events-none"
                style={{ maxHeight: '75vh', maxWidth: '100%', width: 'auto', height: 'auto' }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next — outside AnimatePresence so they don't flicker */}
          <button
            onClick={() => goTo(activeIndex - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-ink hover:bg-white transition-colors shadow-md"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => goTo(activeIndex + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-ink hover:bg-white transition-colors shadow-md"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute bottom-3 right-6 z-10 font-serif text-xs text-white/90 tracking-widest bg-black/25 backdrop-blur-sm px-2 py-1 rounded-full">
            {activeIndex + 1} / {IMAGE_NAMES.length}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div
          ref={thumbsRef}
          className="flex gap-2 w-full overflow-x-auto pb-1 scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
        >
          {IMAGE_NAMES.map((name, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="flex-shrink-0 relative rounded-sm overflow-hidden transition-all duration-300 focus:outline-none"
              style={{
                width: 72,
                height: 54,
                opacity: i === activeIndex ? 1 : 0.55,
                transform: i === activeIndex ? 'scale(1.05)' : 'scale(1)',
                boxShadow: i === activeIndex ? '0 0 0 2px #C3AC8F' : 'none',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/gallery/${name}`}
                alt={name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
