'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';

const IMAGE_NAMES = Array.from({ length: 28 }, (_, i) => `${i + 1}.jpg`);

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
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
      if (e.key === 'Escape') setShowLightbox(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (showLightbox) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showLightbox]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) goTo(activeIndex + 1);
    else if (info.offset.x > 50) goTo(activeIndex - 1);
  };

  const src = `/gallery/${IMAGE_NAMES[activeIndex]}`;

  return (
    <section className="relative py-10 bg-paper overflow-hidden">

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

        {/* Main image wrapper */}
        <div className="relative w-full flex justify-center select-none overflow-hidden h-[50vh] md:h-[75vh]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeIndex}
              className="cursor-zoom-in rounded-sm overflow-hidden shadow-2xl w-full h-full flex items-center justify-center"
              onClick={() => setShowLightbox(true)}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
            >
              <Image
                src={src}
                alt={IMAGE_NAMES[activeIndex]}
                width={1600}
                height={2000}
                className="w-full h-full object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
                quality={80}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={() => goTo(activeIndex - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-ink hover:bg-white transition-colors shadow-md"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => goTo(activeIndex + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-ink hover:bg-white transition-colors shadow-md"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Aggressive high-res preloader */}
          <div className="hidden" aria-hidden="true">
            <Image src={`/gallery/${IMAGE_NAMES[(activeIndex - 1 + IMAGE_NAMES.length) % IMAGE_NAMES.length]}`} alt="" width={1600} height={2000} quality={80} priority />
            <Image src={`/gallery/${IMAGE_NAMES[(activeIndex + 1) % IMAGE_NAMES.length]}`} alt="" width={1600} height={2000} quality={80} priority />
            <Image src={`/gallery/${IMAGE_NAMES[(activeIndex + 2) % IMAGE_NAMES.length]}`} alt="" width={1600} height={2000} quality={80} />
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
              <Image
                src={`/gallery/${name}`}
                alt={name}
                width={100}
                height={75}
                className="w-full h-full object-cover"
                quality={50}
              />
            </button>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-md"
            onClick={() => setShowLightbox(false)}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[120] p-2"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowLightbox(false)}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full h-full flex items-center justify-center p-0"
                >
                  <Image
                    src={src}
                    alt={IMAGE_NAMES[activeIndex]}
                    width={1600}
                    height={2000}
                    className="w-full h-full object-contain"
                    quality={80}
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Internal Navigation Buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); goTo(activeIndex - 1); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors z-[110] bg-black/10 backdrop-blur-sm rounded-full"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goTo(activeIndex + 1); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors z-[110] bg-black/10 backdrop-blur-sm rounded-full"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 font-serif text-sm tracking-widest bg-black/20 backdrop-blur-md px-6 py-1.5 rounded-full z-[110]">
                {activeIndex + 1} / {IMAGE_NAMES.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
