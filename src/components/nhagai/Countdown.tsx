'use client';

import { useState, useEffect } from 'react';
import { motion, } from 'framer-motion';
import Image from 'next/image';

const TARGET_DATE = new Date('2026-07-04T10:30:00');

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const qrData = [
    {
      title: 'Nhà Trai',
      name: 'Phêrô Phùng Quý Thanh',
      bank: 'Vietcombank',
      stk: '9786501403',
      qrUrl: '/qr-nhatrai.jpg',
    },
    {
      title: 'Nhà Gái',
      name: 'Lucia Đinh Hoàng Uyển Nhi',
      bank: 'Vietcombank',
      stk: '9989789139',
      qrUrl: '/qr-nhagai.jpg',
    }
  ];

  return (
    <section className="w-full flex flex-col bg-paper">

      {/* 1. Gift Box Section Header */}
      <div className="py-12 bg-[#F9F7F2] text-center border-b border-ink/5 w-full flex flex-col items-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <motion.div className="h-[1px] bg-gradient-to-r from-transparent to-gold-accent" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
          <span className="text-gold-accent text-xs">✦</span>
          <motion.div className="h-[1px] bg-gradient-to-l from-transparent to-gold-accent" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
        </div>

        <h2 className="font-script text-4xl md:text-6xl text-ink mb-2">Hộp quà mừng cưới</h2>
      </div>

      {/* 2. QR Cards Section with Background Image */}
      <div className="relative w-full min-h-[500px] md:min-h-[800px] flex items-center justify-center py-16 overflow-hidden">
        {/* Background Photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/gift.jpg"
            alt="Couple photo"
            fill
            className="object-cover object-top brightness-[0.85]"
            sizes="100vw"
            quality={80}
          />
        </div>

        {/* QR Cards Container */}
        <div className="relative z-10 w-full max-w-7xl px-2 md:px-4 grid grid-cols-2 gap-2 md:gap-24 lg:gap-[32rem] items-center place-items-center">
          {qrData.map((qr, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="bg-white/90 backdrop-blur-sm p-2 md:p-4 rounded-2xl md:rounded-[2rem] shadow-xl md:shadow-2xl w-full max-w-[130px] md:max-w-[320px] flex flex-col items-center border border-white/50"
            >
              {/* QR Image */}
              <div className="relative w-full aspect-square rounded-lg md:rounded-xl overflow-hidden mb-2 md:mb-4">
                <Image
                  src={qr.qrUrl}
                  alt={`QR ${qr.name}`}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              {/* Bank Info */}
              <div className="text-center space-y-0.5 md:space-y-1">
                <p className="text-[8px] md:text-xs text-ink/60 font-serif uppercase tracking-widest">{qr.bank}</p>
                <p className="text-[10px] md:text-base text-ink font-serif font-bold uppercase leading-tight">{qr.name}</p>
                <p className="text-[8px] md:text-sm text-ink-light font-serif tracking-tighter md:tracking-widest">STK: {qr.stk}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative w-full py-24 md:py-32 bg-[#F9F7F2] overflow-hidden">
        {/* Subtle Background pattern/photo */}
        <div className="absolute inset-0 z-0 opacity-[0.05]">
          <Image src="/gallery/5.jpg" alt="footer bg" fill className="object-cover blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="font-serif text-lg md:text-xl text-ink/80 leading-relaxed italic"
          >
            Chúng tôi xin chân thành cảm ơn sự hiện diện và những lời chúc tốt đẹp của quý vị. Sự quan tâm của quý vị là niềm vinh hạnh và góp phần làm nên một ngày trọng đại trọn vẹn.
          </motion.p>

          {/* Bottom Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 flex justify-center"
          >
            <div className="relative w-16 h-16 opacity-30 select-none flex items-center justify-center">
              <span className="font-script text-4xl text-ink w-full h-full flex items-center justify-center">T&N</span>
              <div className="absolute inset-0 border border-ink rounded-full rotate-45 scale-125" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. Countdown Section */}
      <div className="relative w-full py-24 md:py-32 flex flex-col items-center text-center overflow-hidden">
        {/* Background Photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/countdown.jpg"
            alt="Countdown background"
            fill
            className="object-cover"
            sizes="100vw"
            quality={70}
          />
          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 w-full flex flex-col items-center">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="font-script text-6xl md:text-8xl text-white mb-2 drop-shadow-sm select-none"
          >
            Countdown
          </motion.h3>

          {/* Mini Calendar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="flex flex-col items-center mb-10 text-white"
          >
            <p className="font-serif text-sm tracking-[0.2em] uppercase opacity-70 mb-4">Tháng 07 / 2026</p>
            <div className="grid grid-cols-7 gap-x-3 gap-y-2 md:gap-x-6 md:gap-y-3 text-center border-y border-white/10 py-6">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div key={i} className="text-[16px] uppercase font-serif tracking-widest opacity-40">{day}</div>
              ))}
              {/* Empty spaces for Wed start */}
              <div /> <div />
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <div key={day} className="relative w-6 h-6 md:w-12 md:h-12 flex items-center justify-center font-serif text-xs md:text-lg">
                  {day === 4 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.5 }}
                      className="absolute inset-0 border border-gold-accent rounded-full scale-110 md:scale-125"
                    />
                  )}
                  <span className={day === 4 ? "text-gold-accent font-bold" : "opacity-80"}>
                    {day}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Big Digit Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center justify-center font-serif text-5xl md:text-9xl text-white gap-2 md:gap-4 tracking-tighter"
          >
            <div className="flex flex-col items-center">
              <span>{timeLeft.days.toString().padStart(2, '0')}</span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest font-sans opacity-70 mt-2">Ngày</span>
            </div>
            <span className="opacity-40 mb-6 md:mb-12">:</span>
            <div className="flex flex-col items-center">
              <span>{timeLeft.hours.toString().padStart(2, '0')}</span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest font-sans opacity-70 mt-2">Giờ</span>
            </div>
            <span className="opacity-40 mb-6 md:mb-12">:</span>
            <div className="flex flex-col items-center">
              <span>{timeLeft.minutes.toString().padStart(2, '0')}</span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest font-sans opacity-70 mt-2">Phút</span>
            </div>
            <span className="opacity-40 mb-6 md:mb-12">:</span>
            <div className="flex flex-col items-center">
              <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest font-sans opacity-70 mt-2">Giây</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}