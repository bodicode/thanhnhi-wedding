'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import Image from 'next/image';

export default function Gallery() {
  const [images, setImages] = useState<{ src: string, alt: string }[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    async function loadImagesFromStorage() {
      const { data, error } = await supabase
        .storage
        .from('wedding-images')
        .list('', {
          limit: 100,
          sortBy: { column: 'created_at', order: 'asc' },
        });

      if (error) {
        console.error('Không thể lấy danh sách ảnh từ Supabase:', error);
        return;
      }

      if (data) {
        const validFiles = data.filter(file => file.id && !file.name.startsWith('.'));
        const imageUrls = validFiles.map((file) => {
          const { data: publicUrlData } = supabase
            .storage
            .from('wedding-images')
            .getPublicUrl(file.name);
          return {
            src: publicUrlData.publicUrl,
            alt: file.name
          };
        });
        setImages(imageUrls);
      }
    }
    loadImagesFromStorage();
  }, []);

  // Keyboard navigation and body scroll lock
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedIndex(null);
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedIndex]);

  const handleNext = () => {
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
  };

  if (images.length === 0) return null;

  // Split images into two rows for the double sliding marquee effect
  const half = Math.max(1, Math.ceil(images.length / 2));
  const row1 = images.slice(0, half);
  const row2 = images.slice(half).length > 0 ? images.slice(half) : row1;

  // Helper to multiply an array until it has enough items to fill the screen width smoothly
  const fillArray = (arr: typeof images) => {
    let result = [...arr];
    while (result.length < 8) {
      result = [...result, ...arr];
    }
    return result;
  };

  const createMarquee = (row: typeof images, direction: "left" | "right", speedFactor: number, startIndexOffset: number) => {
    const base = fillArray(row);
    // Duplicate the base array for seamless loop
    const duplicated = [...base, ...base];
    const duration = base.length * speedFactor;

    return (
      <div className="w-full flex overflow-hidden py-4 md:py-6 relative -mx-4 md:mx-0">
        <div 
          className={`flex flex-nowrap w-max pause-on-hover ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
          style={{ 
            animationDuration: `${duration}s`,
            willChange: "transform"
          }}
        >
          {duplicated.map((img, i) => {
            const rotationClass = i % 3 === 0 ? '-rotate-2' : i % 2 === 0 ? 'rotate-2' : '-rotate-1';
            // Determine the original index in the 'images' array for the lightbox
            const originalIndex = startIndexOffset + (i % row.length);
            
            return (
              <div 
                key={i} 
                className="px-3 md:px-5 w-[240px] md:w-[380px] shrink-0 hover:z-20 cursor-zoom-in"
                onClick={() => setSelectedIndex(originalIndex)}
              >
                <div className={`aspect-[3/4] p-2 md:p-3 shadow-[2px_6px_15px_rgba(0,0,0,0.05)] bg-[#FDFCF9] border border-black/5 ${rotationClass} hover:rotate-0 hover:scale-105 transition-all duration-500 relative group overflow-hidden`}>
                  <div className="relative w-full h-full bg-paper-muted border border-ink-light/10 overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={300}
                      height={400}
                      sizes="(max-width: 768px) 240px, 380px"
                      className="w-full h-full object-cover transition-transform duration-[10s] ease-out group-hover:scale-110"
                      quality={70}
                      loading={i < 4 ? "eager" : "lazy"}
                      priority={i < 4}
                    />
                    <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.05)] pointer-events-none" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="relative py-24 bg-paper border-b border-ink-light/20 overflow-hidden flex flex-col items-center">

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5 }}
        className="w-full flex flex-col gap-0 md:gap-4"
      >
        {createMarquee(row1, "left", 6, 0)}
        {createMarquee(row2, "right", 7, half)}
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-paper/95 backdrop-blur-md px-4 md:px-20"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-8 right-8 text-ink hover:text-gold-accent transition-colors z-110"
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Navigation Buttons */}
            <button 
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink transition-colors z-110 bg-white/20 p-2 rounded-full backdrop-blur-sm"
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <button 
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink transition-colors z-110 bg-white/20 p-2 rounded-full backdrop-blur-sm"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            {/* Image Display */}
            <motion.div 
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-[70vh] md:h-[85vh] flex items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Wg8AAm8BlGz/g1gAAAAASUVORK5CYII="
              />
            </motion.div>

            {/* Pre-fetching next/prev images for instant transitions */}
            <div className="hidden">
              <Image 
                src={images[(selectedIndex + 1) % images.length].src}
                alt="prefetch-next"
                width={1}
                height={1}
                priority
              />
              <Image 
                src={images[(selectedIndex - 1 + images.length) % images.length].src}
                alt="prefetch-prev"
                width={1}
                height={1}
                priority
              />
            </div>

            {/* Pagination Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-serif italic text-ink/60 tracking-widest uppercase text-sm">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
