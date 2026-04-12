'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Envelope from '@/components/Envelope';
import Hero from '@/components/Hero';
import Image from 'next/image';
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

      {/* Preload Hero Image for faster visual appearance after open */}
      <div className="hidden" aria-hidden="true">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Image
            src="/gallery/6.jpg"
            alt="Preload"
            width={1920}
            height={1080}
            priority
            quality={1}
          />
        </motion.div>
      </div>

      {isOpened && (
        <main className="w-full bg-paper min-h-screen relative">
          <MusicPlayer />
          <div className="w-full bg-paper">
            <Hero />
            <Invitation />
            <Schedule />
            <Gallery />
            <RSVP />
            <Guestbook />
            <Countdown />
          </div>
        </main>
      )}
    </>
  );
}
