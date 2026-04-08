'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/utils/supabase/client';

type RSVP = {
  id: string;
  name: string;
  attendance: string;
  message: string;
  created_at: string;
};

export default function Guestbook() {
  const [wishes, setWishes] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    async function fetchWishes() {
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setWishes(data);
      }
      setLoading(false);
    }

    fetchWishes();

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'rsvps',
        },
        (payload) => {
          setWishes((prev) => {
            if (prev.some((wish) => wish.id === payload.new.id)) return prev;
            return [payload.new as RSVP, ...prev];
          });
          setCurrentPage(1);
        }
      )
      .subscribe();

    const handleNewRSVP = () => {
      fetchWishes();
      setCurrentPage(1);
    };
    window.addEventListener('new-rsvp', handleNewRSVP);

    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener('new-rsvp', handleNewRSVP);
    };
  }, []);

  // Yêu cầu: Nếu data = 0 thì KHÔNG cần show những lời chúc tốt đẹp ra
  if (!loading && wishes.length === 0) {
    return null;
  }

  const totalPages = Math.ceil(wishes.length / ITEMS_PER_PAGE);
  const currentWishes = wishes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="relative py-24 px-4 bg-[#FDFCF9] w-full flex flex-col items-center border-t border-ink-light/10">
      <div className="max-w-3xl w-full flex flex-col items-center">
        <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-ink-light font-serif mb-4">
          Sổ Lưu Bút
        </span>
        <h2 className="font-script text-6xl md:text-7xl text-ink mb-16 text-center">Những Lời Chúc Tốt Đẹp</h2>

        {loading ? (
          <p className="text-ink-light animate-pulse font-serif italic text-lg tracking-wide">Đang mở sổ lưu bút...</p>
        ) : (
          <div className="flex flex-col gap-6 w-full">
            <AnimatePresence mode="popLayout">
              {currentWishes.map((wish) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="w-full bg-paper p-8 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-gold-accent/20 relative"
                >
                  {/* Card Corner Pin element */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-[0.5px] bg-gold-accent/40" />

                  <p className="font-serif text-xl md:text-2xl text-ink/90 pt-3 leading-relaxed text-center mb-6 italic">
                    {wish.message ? `"${wish.message}"` : (wish.attendance === 'yes' ? '"Tôi xác nhận sẽ tham dự, chúc hai bạn trăm năm hạnh phúc!"' : '"Rất tiếc vì không thể đến chung vui, chúc gia đình hai bạn mãi mãi gắn kết!"')}
                  </p>
                  <div className="flex flex-col items-center w-full border-t border-ink-light/15 pt-4 mt-2">
                    <span className="font-serif font-semibold text-ink uppercase tracking-widest text-sm text-center">{wish.name}</span>
                    <span className="text-[10px] text-ink-light tracking-widest uppercase mt-2">
                      {new Date(wish.created_at).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Phân trang (Pagination) */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-8 mt-12 w-full border-t border-ink-light/10 pt-8">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="text-ink font-serif text-sm tracking-widest uppercase hover:text-gold-accent transition-colors disabled:opacity-30 disabled:hover:text-ink cursor-pointer disabled:cursor-not-allowed"
                >
                  Trang Trước
                </button>
                <span className="text-ink-light font-serif italic text-sm">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="text-ink font-serif text-sm tracking-widest uppercase hover:text-gold-accent transition-colors disabled:opacity-30 disabled:hover:text-ink cursor-pointer disabled:cursor-not-allowed"
                >
                  Trang Sau
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
