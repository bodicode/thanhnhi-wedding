'use client';

import { motion } from 'framer-motion';

export default function Schedule() {
  const events = [
    { time: '10:30', title: 'Đón Khách', desc: 'Chụp hình lưu niệm cùng Cô Dâu Chú Rể' },
    { time: '12:00', title: 'Làm Lễ', desc: 'Nghi thức thành hôn chính thức' },
    { time: '12:30', title: 'Khai Tiệc', desc: 'Dùng bữa trưa thân mật' },
  ];

  return (
    <section className="relative py-24 px-4 bg-paper-muted border-b border-ink-light/20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto flex flex-col items-center"
      >
        <span className="text-sm tracking-[0.2em] uppercase text-ink-light mb-16 text-center">
          Chương Trình Buổi Lễ
        </span>

        <div className="flex flex-col items-center w-full space-y-12 relative py-4">
          {/* Central thin line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-ink-light/30 -translate-x-1/2" />

          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="relative w-full flex items-center justify-between z-10"
            >
              {/* Box 1: Time */}
              <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-6 md:pr-16' : 'order-last text-left pl-6 md:pl-16'}`}>
                <span className="font-serif text-2xl md:text-3xl text-ink font-medium tracking-wider">{event.time}</span>
              </div>
              
              {/* Point on the center line */}
              <div className="absolute left-1/2 w-2 h-2 bg-paper-muted border border-gold-accent rounded-full -translate-x-1/2" />

              {/* Box 2: Detail */}
              <div className={`w-1/2 ${index % 2 === 0 ? 'text-left pl-6 md:pl-16' : 'order-first text-right pr-6 md:pr-16'}`}>
                <h3 className="font-serif text-xl tracking-wide text-ink mb-1">{event.title}</h3>
                <p className="text-ink-light text-sm italic font-light">{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
