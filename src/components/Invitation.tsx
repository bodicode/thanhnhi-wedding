'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const VP = { once: true, margin: '-80px' } as const;

export default function Invitation() {
  return (
    <section className="relative py-16 px-4 bg-paper max-w-6xl mx-auto text-center border-b border-ink-light/20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(circle_at_center,_var(--color-ink)_0%,_transparent_70%)]" />

      <div className="flex flex-col items-center relative w-full z-10">

        {/* Header */}
        <motion.div
          className="flex flex-col items-center mb-16"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
          transition={{ duration: 1.2, delay: 0 }}
        >
          <h2 className="text-xl md:text-3xl tracking-[0.15em] uppercase text-ink/70 font-serif font-bold mb-4">
            Thư Mời Tham Dự Lễ Cưới
          </h2>
          <motion.div
            className="w-px bg-gold-accent opacity-40 mb-4"
            initial={{ height: 0 }} whileInView={{ height: 32 }} viewport={VP}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-base md:text-xl tracking-[0.1em] text-ink font-serif italic max-w-md leading-relaxed">
            Trân trọng kính mời đến tham dự lễ cưới của
          </p>
        </motion.div>

        {/* Couple grid */}
        <div className="grid grid-cols-2 gap-4 md:gap-x-16 w-full max-w-5xl mx-auto mb-20 items-start">
          {[
            { role: 'Chú rể', name: 'Quý Thanh', sub: 'Út Nam', src: '/chure.jpg', alt: 'Chú rể', quality: 75, x: -40 },
            { role: 'Cô dâu', name: 'Uyển Nhi', sub: 'Trưởng Nữ', src: '/codau.jpg', alt: 'Cô dâu', quality: 65, x: 40 },
          ].map((p, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center space-y-4 md:space-y-8"
              initial={{ opacity: 0, x: p.x }} whileInView={{ opacity: 1, x: 0 }} viewport={VP}
              transition={{ duration: 1.2, delay: 0.2 + i * 0.15 }}
            >
              <div className="text-center">
                <span className="font-script text-4xl md:text-6xl text-ink leading-none block mb-2 md:mb-4">{p.role}</span>
                <h1 className="font-serif text-xl md:text-7xl text-ink font-bold tracking-wider uppercase mb-1 md:mb-2 leading-tight">{p.name}</h1>
                <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-ink font-semibold">{p.sub}</p>
              </div>
              <div className="w-full aspect-[3/4] relative overflow-hidden bg-stone-100 shadow-[10px_10px_30px_rgba(0,0,0,0.05)] md:shadow-[20px_20px_60px_rgba(0,0,0,0.05)] border-4 md:border-8 border-white ring-1 ring-black/5">
                <Image src={p.src} alt={p.alt} fill className="object-cover hover:scale-105 transition-transform duration-1000" sizes="(max-width: 768px) 50vw, 50vw" priority quality={p.quality} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote + Photo + Parents */}
        <div className="w-full max-w-5xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-[320px_1fr] md:grid-rows-2 gap-x-16 gap-y-10 md:gap-y-0 items-center">
          {/* Quote */}
          <motion.div
            className="order-1 md:order-2 md:col-start-2 md:self-end md:pb-6"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className="font-serif text-lg md:text-xl text-ink/90 leading-relaxed italic text-center">
              Chúng tôi vô cùng hân hạnh khi được đón tiếp quý vị trong ngày trọng đại của mình. Sự hiện diện cùng những lời chúc tốt đẹp của quý vị chính là niềm vinh hạnh và là món quà ý nghĩa, góp phần làm nên những khoảnh khắc trọn vẹn, đáng nhớ. Chúng tôi xin gửi lời cảm ơn chân thành và sâu sắc nhất!
            </p>
          </motion.div>

          {/* Photo */}
          <motion.div
            className="order-2 md:order-1 md:col-start-1 md:row-span-2 w-full max-w-xs mx-auto md:mx-0 md:w-80 md:flex-shrink-0 md:self-center"
            initial={{ opacity: 0, scale: 0.92, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={VP}
            transition={{ duration: 1.3 }}
          >
            <div className="w-full aspect-[3/4] relative overflow-hidden border-4 border-white ring-1 ring-black/10 shadow-xl" style={{ borderRadius: '50% 50% 0 0 / 40% 40% 0 0' }}>
              <Image src="/invite.jpg" alt="Ảnh đôi" fill className="object-cover object-top" sizes="(max-width: 768px) 80vw, 320px" quality={80} />
            </div>
          </motion.div>

          {/* Parents */}
          <motion.div
            className="order-3 md:order-3 md:col-start-2 md:self-start md:pt-6 md:border-t md:border-ink-light/20"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="grid grid-cols-2 gap-6 md:gap-10 items-stretch">
              {[
                { title: 'Nhà Trai', bo: 'Phùng Văn Thanh', me: 'Phan Thị Thanh', addr: 'P. Trấn Biên, T. Đồng Nai' },
                { title: 'Nhà Gái', bo: 'Đinh Nguyễn Thị Ngân', me: 'Hoàng Thị Thu Hiền', addr: 'P. Tân Triều, T. Đồng Nai' },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
                  transition={{ duration: 0.9, delay: 0.5 + i * 0.15 }}
                >
                  <div className="h-[130px]">
                    <p className="font-serif font-bold text-lg md:text-base tracking-widest uppercase text-ink mb-3">{f.title}</p>
                    <p className="text-base md:text-xl text-ink font-serif tracking-wide leading-relaxed"><span className="font-semibold">Bố:</span> {f.bo}</p>
                    <p className="text-base md:text-xl text-ink font-serif tracking-wide leading-relaxed"><span className="font-semibold">Mẹ:</span> {f.me}</p>
                  </div>
                  <div className="w-full h-px bg-ink/20 mt-auto mb-3" style={{ marginTop: '12px' }} />
                  <p className="text-sm md:text-base text-ink italic font-serif tracking-wide">{f.addr}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Lễ Tân Hôn */}
        <motion.div
          className="w-full max-w-5xl mx-auto lex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center gap-4 mb-10">
            <motion.div className="h-[1px] bg-gradient-to-r from-transparent to-gold-accent" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={VP} transition={{ duration: 0.8 }} />
            <span className="text-gold-accent text-xs">✦</span>
            <motion.div className="h-[1px] bg-gradient-to-l from-transparent to-gold-accent" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={VP} transition={{ duration: 0.8 }} />
          </div>
          <motion.span
            className="font-script text-4xl md:text-7xl text-ink mb-6 block"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
            transition={{ duration: 1, delay: 0.1 }}
          >
            Lễ Tân Hôn
          </motion.span>
          <motion.p
            className="text-sm md:text-base tracking-[0.2em] uppercase text-ink/80 font-serif mb-6"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VP}
            transition={{ duration: 1, delay: 0.2 }}
          >
            08:00, Chủ Nhật
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-6 md:gap-10 mb-3"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <span className="text-sm md:text-base tracking-[0.25em] uppercase text-ink font-medium">Tháng 07</span>
            <div className="w-px h-8 bg-ink-light/30" />
            <span className="text-6xl md:text-8xl font-serif font-bold text-[#904C4C] leading-none">05</span>
            <div className="w-px h-8 bg-ink-light/30" />
            <span className="text-sm md:text-base tracking-[0.25em] uppercase text-ink font-medium">Năm 2026</span>
          </motion.div>
          <motion.p
            className="text-sm text-ink/70 italic mb-6"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VP}
            transition={{ duration: 1, delay: 0.3 }}
          >
            (Nhằm ngày 21 tháng 05 năm Bính Ngọ)
          </motion.p>
          <motion.div
            className="flex flex-col items-center mb-8"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <svg className="w-5 h-5 text-[#904C4C] mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <p className="text-sm md:text-base tracking-[0.25em] uppercase text-ink font-serif">Được cử hành tại Tư Gia</p>
          </motion.div>
          <motion.div
            className="w-full aspect-[16/9] relative overflow-hidden"
            initial={{ opacity: 0, scale: 1.04 }} whileInView={{ opacity: 1, scale: 1 }} viewport={VP}
            transition={{ duration: 1.5 }}
          >
            <Image src="/letanhon.jpg" alt="Lễ Tân Hôn" fill className="object-cover object-center" sizes="100vw" quality={75} />
          </motion.div>
        </motion.div>

        {/* Lễ Thành Hôn */}
        <motion.div
          className="w-full max-w-5xl mx-auto mt-16 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center gap-4 mb-10">
            <motion.div className="h-[1px] bg-gradient-to-r from-transparent to-gold-accent" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={VP} transition={{ duration: 0.8 }} />
            <span className="text-gold-accent text-xs">✦</span>
            <motion.div className="h-[1px] bg-gradient-to-l from-transparent to-gold-accent" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={VP} transition={{ duration: 0.8 }} />
          </div>
          <motion.span
            className="font-script text-4xl md:text-7xl text-ink mb-3 block"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
            transition={{ duration: 1, delay: 0.1 }}
          >
            Lễ Thành Hôn
          </motion.span>
          <motion.p
            className="text-sm md:text-lg tracking-[0.2em] uppercase text-ink/70 mb-10"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VP}
            transition={{ duration: 1, delay: 0.15 }}
          >
            Nhà Trai
          </motion.p>
          <motion.p
            className="text-sm md:text-xl tracking-[0.2em] uppercase text-ink/80 font-bold mb-2"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VP}
            transition={{ duration: 1, delay: 0.2 }}
          >
            ĐƯỢC TỔ CHỨC TẠI TRUNG TÂM HỘI NGHỊ TIỆC CƯỚI
          </motion.p>
          <motion.div
            className="relative w-48 md:w-64 h-20 md:h-28 mb-2"
            initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={VP}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Image src="/logo-golden-palace.png" alt="Golden Palace" fill className="object-contain" sizes="256px" quality={75} />
          </motion.div>
          <motion.p
            className="text-sm md:text-base tracking-[0.15em] uppercase text-ink/70 font-serif mb-8"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VP}
            transition={{ duration: 1, delay: 0.25 }}
          >
            (Sảnh King Room)
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-4 md:gap-8 mb-3"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <span className="font-serif font-bold text-4xl md:text-6xl text-ink">10:30</span>
            <div className="w-px h-10 bg-ink-light/40" />
            <span className="font-serif font-bold text-2xl md:text-4xl text-ink">05/07/2026</span>
            <div className="w-px h-10 bg-ink-light/40" />
            <span className="font-serif font-bold text-xl md:text-3xl tracking-widest uppercase text-ink">Chủ<br />Nhật</span>
          </motion.div>
          <motion.p
            className="text-sm text-ink/70 italic mb-10"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VP}
            transition={{ duration: 1, delay: 0.3 }}
          >
            (Nhằm ngày 21 tháng 05 năm Bính Ngọ)
          </motion.p>
          <motion.div
            className="flex flex-col items-center mb-4 w-full"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
            transition={{ duration: 1, delay: 0.1 }}
          >
            <div className="flex flex-col items-center mb-4">
              <svg className="w-6 h-6 text-[#904C4C] mb-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <p className="text-sm md:text-base tracking-[0.25em] uppercase text-ink font-serif font-semibold">Địa Điểm</p>
            </div>
            <motion.div
              className="w-full max-w-4xl aspect-[16/9] relative overflow-hidden rounded shadow-md mb-4"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
              transition={{ duration: 1.2 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.9905658898238!2d106.84143887466104!3d10.964084255705007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174dd002364c983%3A0x65c15515479738af!2zR29sZGVuIFBhbGFjZSAtIFRydW5nIHTDom0gVGnhu4djIGPGsOG7m2kgJiBI4buZaSBuZ2jhu4s!5e0!3m2!1svi!2s!4v1775801058745!5m2!1svi!2s"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Golden Palace location"
              />
            </motion.div>
            <p className="text-sm md:text-base tracking-[0.15em] uppercase text-ink font-serif font-semibold">04-06 Nguyễn Ái Quốc, P. Tam Hiệp, T. Đồng Nai</p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
