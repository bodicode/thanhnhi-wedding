'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Envelope from '@/components/Envelope';
import Hero from '@/components/Hero';
import Invitation from '@/components/Invitation';
import Schedule from '@/components/Schedule';
import Gallery from '@/components/Gallery';
import RSVP from '@/components/RSVP';
import Countdown from '@/components/Countdown';
import Guestbook from '@/components/Guestbook';
import MusicPlayer from '@/components/MusicPlayer';

export default function NhaTrai() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!isOpened && (
          <Envelope onOpen={() => setIsOpened(true)} />
        )}
      </AnimatePresence>

      {isOpened && (
        <main className="w-full bg-paper min-h-screen relative">
          <MusicPlayer />
          <div className="w-full bg-paper">
            <Hero />
            <Invitation />
            <Schedule />
            <Gallery />
            <RSVP />
            <Countdown />
            <Guestbook />
          </div>
        </main>
      )}
    </>
  );
}
