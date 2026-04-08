'use client';

import { motion } from 'framer-motion';

export default function LocationMap() {
  return (
    <section className="relative py-24 px-4 bg-paper-muted border-b border-ink-light/20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="bg-paper p-8 md:p-16 border border-ink-light/20 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative">
          {/* Inner decor lines acting like an insert card */}
          <div className="absolute inset-3 border border-gold-accent/30 pointer-events-none hidden md:block" />
          <div className="absolute inset-[14px] border border-gold-accent/10 pointer-events-none hidden md:block" />

          <span className="text-sm tracking-[0.2em] uppercase text-ink-light mb-8 block mt-4 md:mt-0">
            Địa Điểm Tổ Chức
          </span>

          <h2 className="font-serif text-3xl md:text-5xl text-ink mb-6 mt-4">Golden Palace</h2>

          <p className="text-ink-light text-lg md:text-xl mb-12 font-light leading-relaxed">
            Sảnh King Room<br />
            04-06 Nguyễn Ái Quốc<br />
            Phường Tam Hiệp, Tỉnh Đồng Nai
          </p>

          <a
            href="https://www.google.com/maps/search/?api=1&query=04-06+Nguyễn+Ái+Quốc,+Tân+Mai,+Tam+Hiệp,+Đồng+Nai,+Việt+Nam"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-3 border border-ink text-ink uppercase tracking-widest text-xs hover:bg-ink hover:text-paper transition-colors duration-500 rounded-sm mb-4 md:mb-0"
          >
            Mở Bản Đồ
          </a>
        </div>
      </motion.div>
    </section>
  );
}
