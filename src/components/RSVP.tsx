'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/utils/supabase/client';

export default function RSVP() {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('yes');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const { error } = await supabase.from('rsvps').insert([{ name, attendance, message }]);
      if (error) throw error;
      setIsSuccess(true);
      window.dispatchEvent(new CustomEvent('new-rsvp'));
    } catch (err: unknown) {
      setError('Đã có lỗi xảy ra. Hãy thử lại nhé!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-paper flex justify-center w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
        className="max-w-2xl w-full flex flex-col items-center text-center"
      >
        <div className="flex items-center gap-4 mb-10">
          <motion.div className="h-[1px] bg-gradient-to-r from-transparent to-gold-accent" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
          <span className="text-gold-accent text-xs">✦</span>
          <motion.div className="h-[1px] bg-gradient-to-l from-transparent to-gold-accent" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
        </div>

        <span className="font-script text-4xl md:text-6xl text-ink mb-2 text-nowrap">Phản Hồi Tham Dự</span>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
              className="w-full space-y-6 flex flex-col items-center py-12 border border-gold-accent/30 bg-[#FDFCF9] shadow-[0_4px_30px_rgba(0,0,0,0.02)] mt-8"
            >
              <motion.span
                className="text-4xl text-[#904C4C] font-serif"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                ♥️
              </motion.span>
              <h3 className="text-2xl font-serif text-ink tracking-wide">Cảm ơn bạn đã phản hồi!</h3>
              <p className="text-ink-light font-medium tracking-[0.1em] text-sm max-w-sm leading-relaxed">
                Sự hiện diện và lời chúc của bạn là niềm vinh hạnh của gia đình.
              </p>
              <button
                onClick={() => { setIsSuccess(false); setName(''); setMessage(''); setAttendance('yes'); }}
                className="mt-6 px-10 py-3 border border-ink text-ink text-xs tracking-widest uppercase hover:bg-ink hover:text-paper transition-colors duration-500 rounded-sm"
              >
                Gửi thêm phúc đáp
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="w-full space-y-10 flex flex-col items-center mt-8"
            >
              <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Quý danh (Tên và Danh xưng) *"
                  className="w-full bg-transparent border-b-2 border-ink-light/20 py-3 text-center text-ink placeholder-ink-light/60 focus:outline-none focus:border-ink transition-colors font-serif text-xl"
                  required
                  disabled={isSubmitting}
                />
              </motion.div>

              <motion.div
                className="w-full flex flex-col sm:flex-row gap-6 sm:gap-12 justify-center py-4"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {[
                  { value: 'yes', label: 'Sẽ đến chung vui' },
                  { value: 'no', label: 'Xin phép vắng mặt' },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-center justify-center space-x-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input type="radio" name="attendance" value={opt.value} checked={attendance === opt.value} onChange={() => setAttendance(opt.value)} className="sr-only" disabled={isSubmitting} />
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${attendance === opt.value ? 'border-ink' : 'border-ink-light group-hover:border-ink/50'}`}>
                        <motion.div
                          className="w-2.5 h-2.5 rounded-full bg-ink"
                          animate={{ scale: attendance === opt.value ? 1 : 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    </div>
                    <span className="text-ink font-serif text-lg group-hover:text-gold-accent transition-colors">{opt.label}</span>
                  </label>
                ))}
              </motion.div>

              <motion.div
                className="w-full pt-2"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Lời chúc thân thương gửi đến Cô Dâu Chú Rể..."
                  rows={4}
                  className="w-full bg-transparent border border-ink-light/30 p-6 text-center text-ink placeholder-ink-light/60 focus:outline-none focus:border-ink transition-colors font-serif resize-none text-lg"
                  disabled={isSubmitting}
                />
              </motion.div>

              {error && <p className="text-red-500 font-medium text-sm font-serif italic">{error}</p>}

              <motion.div
                className="pt-6 w-full flex justify-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-14 py-4 bg-ink text-paper uppercase tracking-widest text-xs hover:bg-ink-light transition-colors duration-500 rounded-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {isSubmitting ? 'Đang gửi...' : 'Gửi Phúc Đáp'}
                </motion.button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
