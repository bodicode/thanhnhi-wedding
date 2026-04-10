'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Schedule() {
  const events = [
    { time: '10:30', label: 'Đón Khách', sub: 'Chụp hình lưu niệm cùng Cô Dâu Chú Rể', timeLeft: true  },
    { time: '12:00', label: 'Làm Lễ',    sub: 'Nghi thức thành hôn chính thức',         timeLeft: false },
    { time: '12:30', label: 'Khai Tiệc', sub: 'Dùng bữa trưa thân mật',                timeLeft: true  },
  ];

  const COLOR_TIME  = '#5c3d20';
  const COLOR_LABEL = '#6b4a2a';
  const COLOR_SUB   = '#7a5c3a';
  const COLOR_LINE  = 'rgba(160,128,96,0.5)';

  return (
    <section className="relative border-b border-ink-light/20">
      <div className="w-full relative overflow-hidden" style={{ minHeight: '450px' }}>

        {/* Background */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08, opacity: 0 }}
          whileInView={{ scale: 1.05, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <Image src="/timeline.jpg" alt="Timeline background" fill className="object-cover object-center" sizes="100vw" quality={75} />
          <div className="absolute inset-x-0" style={{ top: '8%', bottom: '8%', background: 'rgba(255,255,255,0.65)' }} />
        </motion.div>

        {/* Content */}
        <div className="absolute inset-0 flex items-stretch py-10 px-4 md:px-14">

          {/* Timeline script desktop */}
          <motion.div
            className="hidden md:flex w-2/5 items-center justify-center pr-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <span className="font-script select-none leading-none"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', color: COLOR_TIME, textShadow: '0 2px 16px rgba(255,255,255,0.9)' }}>
              Timeline
            </span>
          </motion.div>

          {/* Events column */}
          <div className="flex-1 flex flex-col py-2">
            <motion.div
              className="md:hidden flex justify-center mb-6"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-script leading-none" style={{ fontSize: '2.8rem', color: COLOR_TIME, textShadow: '0 2px 12px rgba(255,255,255,0.9)' }}>
                Timeline
              </span>
            </motion.div>

            <div className="flex-1 relative flex flex-col justify-between">
              {/* Vertical line animates in */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-px"
                style={{ background: COLOR_LINE }}
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
              />

              {events.map((item, i) => (
                <motion.div
                  key={i}
                  className="grid grid-cols-[1fr_28px_1fr] items-center w-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.5 + i * 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                >
                  {/* Left */}
                  <div className="pr-3 md:pr-6 text-right">
                    {item.timeLeft ? (
                      <p className="font-serif font-semibold leading-none"
                        style={{ fontSize: 'clamp(1.4rem, 3vw, 2.4rem)', color: COLOR_TIME }}>
                        {item.time}
                      </p>
                    ) : (
                      <>
                        <p className="font-serif font-semibold"
                          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', color: COLOR_LABEL }}>{item.label}</p>
                        <p className="font-serif italic mt-0.5"
                          style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)', color: COLOR_SUB, textShadow: '0 1px 6px rgba(255,255,255,0.8)' }}>{item.sub}</p>
                      </>
                    )}
                  </div>

                  {/* Dot */}
                  <motion.div
                    className="relative z-10 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-white/90" style={{ border: `1px solid ${COLOR_LINE}` }} />
                  </motion.div>

                  {/* Right */}
                  <div className="pl-3 md:pl-6 text-left">
                    {item.timeLeft ? (
                      <>
                        <p className="font-serif font-semibold"
                          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', color: COLOR_LABEL }}>{item.label}</p>
                        <p className="font-serif italic mt-0.5"
                          style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)', color: COLOR_SUB, textShadow: '0 1px 6px rgba(255,255,255,0.8)' }}>{item.sub}</p>
                      </>
                    ) : (
                      <p className="font-serif font-semibold leading-none"
                        style={{ fontSize: 'clamp(1.4rem, 3vw, 2.4rem)', color: COLOR_TIME }}>
                        {item.time}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
