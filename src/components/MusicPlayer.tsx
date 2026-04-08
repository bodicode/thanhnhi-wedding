'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      // Tự động phát khi component được render (sau khi user đã tương tác click "Mở thiệp")
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.log("Autoplay prevented:", error);
            setIsPlaying(false);
          });
      }
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[60]">
      <audio
        ref={audioRef}
        src="/BeautifulInWhite.mp3"
        loop
      />
      
      <motion.button
        onClick={toggleMusic}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-gold-accent/20 group"
      >
        {/* Animated Ring when playing */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={{ 
                scale: [1, 1.5],
                opacity: [0.5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeOut" 
              }}
              className="absolute inset-0 rounded-full border border-gold-accent"
            />
          )}
        </AnimatePresence>

        {/* Music Icon / Vinyl Style */}
        <div className="relative flex items-center justify-center">
          <motion.div 
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="text-ink"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            )}
          </motion.div>
        </div>

        {/* Floating Notes when playing */}
        <AnimatePresence>
          {isPlaying && (
            <>
              <motion.span
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{ opacity: [0, 1, 0], y: -40, x: -10 }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                className="absolute -top-2 -left-2 text-gold-accent text-xs"
              >
                ♪
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{ opacity: [0, 1, 0], y: -30, x: 15 }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
                className="absolute -top-4 right-0 text-gold-accent text-xs"
              >
                ♫
              </motion.span>
            </>
          )}
        </AnimatePresence>

        {/* Hover Label */}
        <div className="absolute left-full ml-4 px-3 py-1 bg-ink text-paper text-[10px] tracking-[0.2em] uppercase rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {isPlaying ? 'Tắt Nhạc' : 'Bật Nhạc'}
        </div>
      </motion.button>
    </div>
  );
}
