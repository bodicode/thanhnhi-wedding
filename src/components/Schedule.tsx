'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Schedule() {
  const events = [
    { time: '10:30', label: 'Đón Khách', sub: 'Chụp hình lưu niệm cùng Cô Dâu Chú Rể', timeLeft: true  },
    { time: '12:00', label: 'Làm Lễ',    sub: 'Nghi thức thành hôn chính thức',         timeLeft: false },
    { time: '12:30', label: 'Khai Tiệc', sub: 'Dùng bữa trưa thân mật',                timeLeft: true  },
  ];

  const COLOR_TIME  = '#7a5c3a';
  const COLOR_LABEL = '#8a6a4a';
  const COLOR_SUB   = '#b09070';
  const COLOR_LINE  = 'rgba(160,128,96,0.5)';

  return (
    <section className="relative border-b border-ink-light/20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-full relative overflow-hidden" style={{ minHeight: '450px' }}>

          {/* Background */}
          <div className="absolute inset-0">
            <Image src="/invite.jpg" alt="Timeline background" fill className="object-cover object-center scale-105" sizes="100vw" quality={75} />
            <div className="absolute inset-x-0" style={{ top: '8%', bottom: '8%', background: 'rgba(255,255,255,0.65)' }} />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-stretch py-10 px-4 md:px-14">

            {/* "Timeline" script — desktop only */}
            <div className="hidden md:flex w-2/5 items-center justify-center pr-4">
              <span className="font-script select-none leading-none"
                style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', color: COLOR_TIME, textShadow: '0 2px 16px rgba(255,255,255,0.9)' }}>
                Timeline
              </span>
            </div>

            {/* Events column */}
            <div className="flex-1 relative flex flex-col justify-between py-2">

              {/* Vertical line */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px" style={{ background: COLOR_LINE }} />

              {/* "Timeline" mobile — inside flow, above first event */}
              <div className="md:hidden flex justify-center mb-4">
                <span className="font-script leading-none" style={{ fontSize: '2.8rem', color: COLOR_TIME, textShadow: '0 2px 12px rgba(255,255,255,0.9)' }}>
                  Timeline
                </span>
              </div>

              {events.map((item, i) => (
                <div key={i} className="grid grid-cols-[1fr_28px_1fr] items-center w-full">

                  {/* Left */}
                  <div className="pr-3 md:pr-6 text-right">
                    {item.timeLeft ? (
                      <p className="font-serif font-semibold leading-none"
                        style={{ fontSize: 'clamp(1.1rem, 2.5vw, 2.2rem)', color: COLOR_TIME }}>
                        {item.time}
                      </p>
                    ) : (
                      <>
                        <p className="font-serif font-medium"
                          style={{ fontSize: 'clamp(0.8rem, 1.6vw, 1.3rem)', color: COLOR_LABEL }}>{item.label}</p>
                        <p className="font-serif italic"
                          style={{ fontSize: 'clamp(0.6rem, 1vw, 0.82rem)', color: COLOR_SUB }}>{item.sub}</p>
                      </>
                    )}
                  </div>

                  {/* Dot */}
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/90" style={{ border: `1px solid ${COLOR_LINE}` }} />
                  </div>

                  {/* Right */}
                  <div className="pl-3 md:pl-6 text-left">
                    {item.timeLeft ? (
                      <>
                        <p className="font-serif font-medium"
                          style={{ fontSize: 'clamp(0.8rem, 1.6vw, 1.3rem)', color: COLOR_LABEL }}>{item.label}</p>
                        <p className="font-serif italic"
                          style={{ fontSize: 'clamp(0.6rem, 1vw, 0.82rem)', color: COLOR_SUB }}>{item.sub}</p>
                      </>
                    ) : (
                      <p className="font-serif font-semibold leading-none"
                        style={{ fontSize: 'clamp(1.1rem, 2.5vw, 2.2rem)', color: COLOR_TIME }}>
                        {item.time}
                      </p>
                    )}
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
