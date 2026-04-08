'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import Image from 'next/image';

export default function Invitation() {
  return (
    <section className="relative py-24 md:py-32 px-4 bg-paper max-w-6xl mx-auto text-center border-b border-ink-light/20 overflow-hidden">

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
          <div className="w-px h-16 md:h-24 bg-gold-accent opacity-40 mb-10" />
          <p className="text-sm md:text-xl tracking-[0.1em] text-ink font-serif italic opacity-90 max-w-md leading-relaxed">
            Trân trọng kính mời đến tham dự lễ cưới của
          </p>
        </div>

        {/* STAGGERED COUPLE GRID (Magazine Style) */}
        <div className="grid grid-cols-2 gap-4 md:gap-x-32 w-full max-w-5xl mx-auto mb-20 items-start">

          {/* Groom Block (Text top, Image bottom) */}
          <div className="flex flex-col items-center md:items-end space-y-6 md:space-y-10">
            <div className="text-center md:text-right md:pr-2">
              <span className="font-script text-3xl md:text-6xl text-ink leading-none block mb-3 md:mb-6 px-1">Chú rể</span>
              <h1 className="font-serif text-xl md:text-7xl text-ink font-semibold tracking-wider uppercase mb-2 md:mb-3 leading-tight">Phùng Quý Thanh</h1>
              <p className="text-[10px] md:text-sm tracking-[0.3em] uppercase text-ink-light font-medium italic">Út Nam</p>
            </div>

            <div className="w-full aspect-[3/4] relative overflow-hidden bg-stone-100 shadow-[10px_10px_30px_rgba(0,0,0,0.05)] md:shadow-[20px_20px_60px_rgba(0,0,0,0.05)] border-4 md:border-12 border-white ring-1 ring-black/5">
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
          </div>

          {/* Bride Block (Image top, Text bottom) */}
          <div className="flex flex-col items-center md:items-start space-y-6 md:space-y-10 mt-12 md:mt-32">
            <div className="w-full aspect-[3/4] relative overflow-hidden bg-stone-100 shadow-[10px_10px_30px_rgba(0,0,0,0.05)] md:shadow-[20px_20px_60px_rgba(0,0,0,0.05)] border-4 md:border-12 border-white ring-1 ring-black/5">
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

            <div className="text-center md:text-left md:pl-2">
              <span className="font-script text-3xl md:text-6xl text-ink leading-none block mb-3 md:mb-6 px-1">Cô dâu</span>
              <h1 className="font-serif text-xl md:text-7xl text-ink font-semibold tracking-wider uppercase mb-2 md:mb-3 leading-tight">Đinh Hoàng Uyển Nhi</h1>
              <p className="text-[10px] md:text-sm tracking-[0.3em] uppercase text-ink-light font-medium italic">Trưởng Nữ</p>
            </div>
          </div>
        </div>

        {/* PARENTS (Refined & Elegant) */}
        <div className="w-full max-w-4xl mx-auto mb-4 py-4 border-t border-ink-light/10">
          <div className="grid grid-cols-2 gap-12 md:gap-32">
            <div className="flex flex-col items-center">
              <span className="text-ink-light/70 text-sm italic font-serif mb-4 block">Đại diện nhà trai</span>
              <h3 className="font-serif md:text-xl text-ink font-semibold tracking-widest uppercase leading-relaxed text-center">
                Phùng Văn Thanh<br />Phan Thị Thanh
              </h3>
              <p className="md:text-md text-ink-light tracking-widest uppercase mt-4 opacity-80 italic font-serif">
                P. Trấn Biên, Tỉnh Đồng Nai
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-ink-light/70 text-sm italic font-serif mb-4 block">Đại diện nhà gái</span>
              <h3 className="font-serif md:text-xl text-ink font-semibold tracking-widest uppercase leading-relaxed text-center">
                Đinh Nguyễn Thụy Ngân<br />Hoàng Thị Thu Hiền
              </h3>
              <p className="md:text-md text-ink-light tracking-widest uppercase mt-4 opacity-80 italic font-serif">
                P. Tân Triều, Tỉnh Đồng Nai
              </p>
            </div>
          </div>
        </div>

        {/* CEREMONY DETAILS (Maintain existing functional info) */}
        <div className="flex flex-col items-center space-y-6 pt-8">
          <p className="text-xs tracking-[0.3em] uppercase text-ink-light font-medium mb-2">Lễ Thành Hôn Được Cử Hành Tại</p>
          <p className="text-2xl md:text-4xl font-serif text-[#904C4C] tracking-widest font-semibold mb-2 uppercase">Tư Gia</p>

          <p className="text-xs tracking-[0.3em] uppercase text-ink-light font-medium mt-10 mb-2">Vào Lúc</p>
          <p className="text-4xl md:text-5xl font-serif text-ink tracking-wide font-light">08:00</p>

          <div className="flex items-center space-x-8 py-10 my-8 border-y border-ink-light/10 w-full max-w-lg justify-center">
            <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-ink-light font-medium">Chủ Nhật</span>
            <div className="w-px h-12 bg-ink-light/30" />
            <span className="text-7xl md:text-9xl font-serif italic text-[#904C4C] tracking-tighter mix-blend-multiply pb-2">05</span>
            <div className="w-px h-12 bg-ink-light/30" />
            <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-ink-light font-medium">Tháng 07</span>
          </div>

          <p className="text-2xl md:text-3xl font-serif text-ink tracking-[0.2em] mb-4">2026</p>
          <p className="text-[11px] tracking-[0.3em] uppercase text-ink-light opacity-70 italic">(Tức ngày 21/05 năm Bính Ngọ)</p>
        </div>

      </motion.div>
    </section>
  );
}
