'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Invitation() {
  return (
    <section className="relative py-16 px-4 bg-paper max-w-6xl mx-auto text-center border-b border-ink-light/20 overflow-hidden">

      {/* Soft decorative background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(circle_at_center,_var(--color-ink)_0%,_transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center relative w-full z-10"
      >
        {/* HEADER TITLE (Inspired by Photo 1) */}
        <div className="flex flex-col items-center mb-16 md:mb-24">
          <h2 className="text-xl md:text-3xl tracking-[0.5em] uppercase text-ink/70 font-serif font-bold mb-8">
            Thư Mời Tham Dự Lễ Cưới
          </h2>
          <div className="w-px h-16 bg-gold-accent opacity-40 mb-10" />
          <p className="text-sm md:text-xl tracking-[0.1em] text-ink font-serif italic opacity-90 max-w-md leading-relaxed">
            Trân trọng kính mời đến tham dự lễ cưới của
          </p>
        </div>

        {/* COUPLE GRID (Symmetric - Text top, Image bottom) */}
        <div className="grid grid-cols-2 gap-4 md:gap-x-16 w-full max-w-5xl mx-auto mb-20 items-start">

          {/* Groom Block */}
          <div className="flex flex-col items-center space-y-4 md:space-y-8">
            <div className="text-center">
              <span className="font-script text-3xl md:text-6xl text-ink leading-none block mb-2 md:mb-4">Chú rể</span>
              <h1 className="font-serif text-lg md:text-7xl text-ink font-bold tracking-wider uppercase mb-1 md:mb-2 leading-tight">Quý Thanh</h1>
              <p className="text-[10px] md:text-sm tracking-[0.3em] uppercase text-ink-light font-semibold">Út Nam</p>
            </div>

            <div className="w-full aspect-[3/4] relative overflow-hidden bg-stone-100 shadow-[10px_10px_30px_rgba(0,0,0,0.05)] md:shadow-[20px_20px_60px_rgba(0,0,0,0.05)] border-4 md:border-8 border-white ring-1 ring-black/5">
              <Image
                src="/chure.jpg"
                alt="Chú rể"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
                sizes="(max-width: 768px) 50vw, 50vw"
                priority={true}
                quality={75}
              />
            </div>

            {/* <p className="text-[10px] md:text-sm tracking-[0.3em] uppercase text-ink-light font-medium italic">Út Nam</p> */}
          </div>

          {/* Bride Block */}
          <div className="flex flex-col items-center space-y-4 md:space-y-8">
            <div className="text-center">
              <span className="font-script text-3xl md:text-6xl text-ink leading-none block mb-2 md:mb-4">Cô dâu</span>
              <h1 className="font-serif text-lg md:text-7xl text-ink font-bold tracking-wider uppercase mb-1 md:mb-2 leading-tight">Uyển Nhi</h1>
              <p className="text-[10px] md:text-sm tracking-[0.3em] uppercase text-ink-light font-semibold">Trưởng Nữ</p>
            </div>

            <div className="w-full aspect-[3/4] relative overflow-hidden bg-stone-100 shadow-[10px_10px_30px_rgba(0,0,0,0.05)] md:shadow-[20px_20px_60px_rgba(0,0,0,0.05)] border-4 md:border-8 border-white ring-1 ring-black/5">
              <Image
                src="/codau.jpg"
                alt="Cô dâu"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
                sizes="(max-width: 768px) 50vw, 50vw"
                priority={true}
                quality={65}
              />
            </div>

            {/* <p className="text-[10px] md:text-sm tracking-[0.3em] uppercase text-ink-light font-medium italic">Trưởng Nữ</p> */}
          </div>
        </div>

        {/* QUOTE + PHOTO + PARENTS — mobile: stacked, desktop: side by side */}
        <div className="w-full max-w-5xl mx-auto mb-8 flex flex-col md:flex-row md:items-center md:gap-16">

          {/* Couple Photo */}
          <div className="w-full max-w-xs mx-auto md:mx-0 md:w-80 md:flex-shrink-0 mb-10 md:mb-0">
            <div className="w-full aspect-[3/4] relative overflow-hidden border-4 border-white ring-1 ring-black/10 shadow-xl"
              style={{ borderRadius: '50% 50% 0 0 / 40% 40% 0 0' }}>
              <Image
                src="/invite.jpg"
                alt="Ảnh đôi"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 80vw, 320px"
                quality={80}
              />
            </div>
          </div>

          {/* Right side: Quote + Parents */}
          <div className="flex flex-col flex-1 gap-8">
            {/* Quote */}
            <p className="font-serif text-sm md:text-base text-ink/80 leading-relaxed italic text-center md:text-left">
              Chúng tôi vô cùng hân hạnh khi được đón tiếp quý vị trong ngày trọng đại của mình. Sự hiện diện cùng những lời chúc tốt đẹp của quý vị chính là niềm vinh hạnh và là món quà ý nghĩa, góp phần làm nên những khoảnh khắc trọn vẹn, đáng nhớ. Chúng tôi xin gửi lời cảm ơn chân thành và sâu sắc nhất!
            </p>

            {/* Parents */}
            <div className="pt-6 border-t border-ink-light/20">
              <div className="grid grid-cols-2 gap-6 md:gap-10">
                {/* Nhà Trai */}
                <div className="flex flex-col items-start text-left">
                  <p className="font-serif font-bold text-sm md:text-base tracking-widest uppercase text-ink mb-3">Nhà Trai</p>
                  <p className="text-xs md:text-sm text-ink/80 font-serif uppercase tracking-wide leading-relaxed">
                    <span className="font-semibold">Bố:</span> Phùng Văn Thanh
                  </p>
                  <p className="text-xs md:text-sm text-ink/80 font-serif uppercase tracking-wide leading-relaxed mb-3">
                    <span className="font-semibold">Mẹ:</span> Phan Thị Thanh
                  </p>
                  <div className="w-full h-px bg-ink/20 mb-3" />
                  <p className="text-xs text-ink-light italic font-serif tracking-wide">P. Trấn Biên, T. Đồng Nai</p>
                </div>
                {/* Nhà Gái */}
                <div className="flex flex-col items-start text-left">
                  <p className="font-serif font-bold text-sm md:text-base tracking-widest uppercase text-ink mb-3">Nhà Gái</p>
                  <p className="text-xs md:text-sm text-ink/80 font-serif uppercase tracking-wide leading-relaxed">
                    <span className="font-semibold">Bố:</span> Đinh Nguyễn Thị Ngân
                  </p>
                  <p className="text-xs md:text-sm text-ink/80 font-serif uppercase tracking-wide leading-relaxed mb-3">
                    <span className="font-semibold">Mẹ:</span> Hoàng Thị Thu Hiền
                  </p>
                  <div className="w-full h-px bg-ink/20 mb-3" />
                  <p className="text-xs text-ink-light italic font-serif tracking-wide">P. Tân Triều, T. Đồng Nai</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── LỄ TÂN HÔN ── */}
        <div className="w-full max-w-5xl mx-auto mt-8 flex flex-col items-center text-center border-t border-ink-light/20 pt-12">
          <span className="font-script text-6xl md:text-7xl text-ink mb-6">Lễ Tân Hôn</span>
          <p className="text-sm md:text-base tracking-[0.2em] uppercase text-ink/70 font-serif mb-6">08:00, Chủ Nhật</p>

          {/* Date row */}
          <div className="flex items-center justify-center gap-6 md:gap-10 mb-3">
            <span className="text-xs md:text-sm tracking-[0.25em] uppercase text-ink-light font-medium">Tháng 07</span>
            <div className="w-px h-8 bg-ink-light/30" />
            <span className="text-6xl md:text-8xl font-serif font-bold text-[#904C4C] leading-none">05</span>
            <div className="w-px h-8 bg-ink-light/30" />
            <span className="text-xs md:text-sm tracking-[0.25em] uppercase text-ink-light font-medium">Năm 2026</span>
          </div>
          <p className="text-xs text-ink-light italic mb-6">(Nhằm ngày 21 tháng 05 năm Bính Ngọ)</p>

          {/* Location */}
          <div className="flex flex-col items-center mb-8">
            <svg className="w-5 h-5 text-[#904C4C] mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-ink/70 font-serif">Được cử hành tại Tư Gia</p>
          </div>

          {/* Full-width couple photo */}
          <div className="w-full aspect-[16/9] md:aspect-[21/9] relative overflow-hidden">
            <Image
              src="/letanhon.jpg"
              alt="Lễ Tân Hôn"
              fill
              className="object-cover object-center"
              sizes="100vw"
              quality={75}
            />
          </div>
        </div>

        {/* ── LỄ THÀNH HÔN ── */}
        <div className="w-full max-w-5xl mx-auto mt-16 flex flex-col items-center text-center">
          <span className="font-script text-6xl md:text-7xl text-ink mb-6">Lễ Thành Hôn</span>
          <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-ink-light mb-6">Nhà Trai</p>

          <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-ink/70 font-serif mb-2">Được tổ chức tại</p>
          <div className="relative w-48 md:w-64 h-20 md:h-28 mb-2">
            <Image src="/logo-golden-palace.png" alt="Golden Palace" fill className="object-contain" sizes="256px" quality={75} />
          </div>
          <p className="text-xs md:text-sm tracking-[0.15em] uppercase text-ink/60 font-serif mb-8">(Sảnh King Room)</p>

          {/* Time row */}
          <p className="text-xs tracking-[0.25em] uppercase text-ink-light mb-3">Vào Lúc</p>
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-3">
            <span className="font-serif font-bold text-4xl md:text-6xl text-ink">10:30</span>
            <div className="w-px h-10 bg-ink-light/40" />
            <span className="font-serif font-bold text-2xl md:text-4xl text-ink">05/07/2026</span>
            <div className="w-px h-10 bg-ink-light/40" />
            <span className="font-serif font-bold text-xl md:text-3xl tracking-widest uppercase text-ink">Chủ<br />Nhật</span>
          </div>
          <p className="text-xs text-ink-light italic mb-10">(Nhằm ngày 21 tháng 05 năm Bính Ngọ)</p>

          {/* Map + Address */}
          <div className="flex flex-col items-center mb-4 w-full">
            <div className="flex flex-col items-center mb-4">
              <svg className="w-6 h-6 text-[#904C4C] mb-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-ink/70 font-serif font-semibold">Địa Điểm</p>
            </div>
            <div className="w-full max-w-2xl aspect-[16/9] relative overflow-hidden rounded shadow-md mb-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.9905658898238!2d106.84143887466104!3d10.964084255705007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174dd002364c983%3A0x65c15515479738af!2zR29sZGVuIFBhbGFjZSAtIFRydW5nIHTDom0gVGnhu4djIGPGsOG7m2kgJiBI4buZaSBuZ2jhu4s!5e0!3m2!1svi!2s!4v1775801058745!5m2!1svi!2s"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Golden Palace location"
              />
            </div>
            <p className="text-xs md:text-sm tracking-[0.15em] uppercase text-ink/80 font-serif font-semibold">04-06 Nguyễn Ái Quốc, P. Tam Hiệp, T. Đồng Nai</p>
          </div>

          {/* Timeline */}
        </div>

      </motion.div>
    </section>
  );
}
