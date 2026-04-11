'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {

    return (
        <section className="relative min-h-screen flex flex-col bg-paper overflow-hidden">
            {/* Top Image Section */}
            <div className="relative h-[100vh] w-full overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src="/gallery/6.jpg"
                        alt="Thanh & Nhi"
                        fill
                        className="object-cover object-top lg:object-bottom"
                        priority
                    />
                    {/* Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>

                {/* Text Overlay on Image */}
                <div className="absolute inset-x-0 bottom-12 lg:bottom-20 flex flex-col items-center justify-center text-white z-10 px-6 w-full lg:inset-x-0 lg:top-auto inset-0">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="font-script text-6xl md:text-9xl lg:text-[10rem] mb-4 drop-shadow-lg text-center w-full"
                    >
                        We get married!
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="flex flex-col items-center text-center w-full"
                    >
                        <h1 className="font-serif text-[20px] md:text-4xl lg:tracking-[0.2em] lg:font-medium uppercase drop-shadow-md text-center w-full">
                            PHÊRÔ QUÝ THANH & LUCIA UYỂN NHI
                        </h1>
                        <div className="w-12 h-[1px] bg-white/60 mt-4 lg:mt-6" />
                    </motion.div>
                </div>
            </div>

            {/* Bottom Invitation Section */}
            <div className="relative flex-1 bg-paper flex flex-col items-center justify-center py-4 px-6">
                {/* Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
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