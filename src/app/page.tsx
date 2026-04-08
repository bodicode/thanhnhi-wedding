'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Envelope from '@/components/Envelope';
import Hero from '@/components/Hero';
import Invitation from '@/components/Invitation';
import Schedule from '@/components/Schedule';
import Gallery from '@/components/Gallery';
import LocationMap from '@/components/LocationMap';
import RSVP from '@/components/RSVP';
import Guestbook from '@/components/Guestbook';
import MusicPlayer from '@/components/MusicPlayer';

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      {/* 3D Envelope Intro Overlay */}
      <AnimatePresence>
        {!isOpened && (
          <Envelope onOpen={() => setIsOpened(true)} />
        )}
      </AnimatePresence>

      {/* Main Content strictly mounts after the envelope is fully signaled to open, 
          triggering all the initial load animations sequentially */}
      {isOpened && (
        <main className="w-full bg-paper min-h-screen relative shadow-2xl max-w-[1440px] mx-auto bg-stone-50">
          <MusicPlayer />
          <div className="w-full bg-paper">
            <Hero />
            <Invitation />
            <Schedule />
            <Gallery />
            <LocationMap />
            <RSVP />
            <Guestbook />

            {/* Footer / Closing panel */}
            <footer className="py-24 px-4 text-center bg-paper border-t border-ink-light/20 relative">
              <div className="max-w-2xl mx-auto flex flex-col items-center">
                <p className="text-ink-light text-sm tracking-[0.3em] uppercase mb-12 font-light">
                  Trân Trọng Cảm Ơn
                </p>
                <p className="font-script text-5xl md:text-6xl text-ink leading-tight">
                  Quý Thanh <span className="text-gold-accent px-3">&</span> Uyển Nhi
                </p>
              </div>
            </footer>
          </div>
        </main>
      )}
    </>
  );
}
