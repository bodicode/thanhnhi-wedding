'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
      const { error } = await supabase
        .from('rsvps')
        .insert([{ name, attendance, message }]);

      if (error) throw error;
      
      setIsSuccess(true);
      // Phát ra event để Guestbook nhận biết và fetch lại dữ liệu ngay lập tức
      window.dispatchEvent(new CustomEvent('new-rsvp'));
    } catch (err: any) {
      console.error(err);
      setError('Đã có lỗi xảy ra. Hãy thử lại nhé!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-24 px-4 bg-paper flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl w-full flex flex-col items-center text-center"
      >
        <span className="font-script text-6xl md:text-7xl text-ink mb-6">Phản Hội Tham Dự</span>
        
        {isSuccess ? (
          <div className="w-full space-y-6 flex flex-col items-center px-4 py-12 border border-gold-accent/30 bg-[#FDFCF9] shadow-[0_4px_30px_rgba(0,0,0,0.02)] mt-8">
             <span className="text-4xl text-[#904C4C] font-serif">♥️</span>
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
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full space-y-10 flex flex-col items-center px-4 mt-8">
            <div className="w-full">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Quý danh (Tên và Danh xưng) *"
                className="w-full bg-transparent border-b-2 border-ink-light/20 py-3 text-center text-ink placeholder-ink-light/60 focus:outline-none focus:border-ink transition-colors font-serif text-xl"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-6 sm:gap-12 justify-center py-4">
              <label className="flex items-center justify-center space-x-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="radio" 
                    name="attendance" 
                    value="yes" 
                    checked={attendance === 'yes'}
                    onChange={() => setAttendance('yes')}
                    className="sr-only" 
                    disabled={isSubmitting}
                  />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors shadow-none ${attendance === 'yes' ? 'border-ink' : 'border-ink-light group-hover:border-ink/50'}`}>
                    <div className={`w-2.5 h-2.5 rounded-full bg-ink transition-transform duration-300 ${attendance === 'yes' ? 'scale-100' : 'scale-0'}`}></div>
                  </div>
                </div>
                <span className="text-ink font-serif text-lg group-hover:text-gold-accent transition-colors">Sẽ đến chung vui</span>
              </label>
              <label className="flex items-center justify-center space-x-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="radio" 
                    name="attendance" 
                    value="no" 
                    checked={attendance === 'no'}
                    onChange={() => setAttendance('no')}
                    className="sr-only" 
                    disabled={isSubmitting}
                  />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors shadow-none ${attendance === 'no' ? 'border-ink' : 'border-ink-light group-hover:border-ink/50'}`}>
                    <div className={`w-2.5 h-2.5 rounded-full bg-ink transition-transform duration-300 ${attendance === 'no' ? 'scale-100' : 'scale-0'}`}></div>
                  </div>
                </div>
                <span className="text-ink font-serif text-lg group-hover:text-gold-accent transition-colors">Xin phép vắng mặt</span>
              </label>
            </div>

            <div className="w-full pt-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Lời chúc thân thương gửi đến Cô Dâu Chú Rể..."
                rows={4}
                className="w-full bg-transparent border border-ink-light/30 p-6 text-center text-ink placeholder-ink-light/60 focus:outline-none focus:border-ink transition-colors font-serif resize-none text-lg"
                disabled={isSubmitting}
              ></textarea>
            </div>

            {error && (
              <p className="text-red-500 font-medium text-sm font-serif italic">{error}</p>
            )}

            <div className="pt-6 w-full flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-14 py-4 bg-ink text-paper uppercase tracking-widest text-xs hover:bg-ink-light transition-colors duration-500 rounded-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi Phúc Đáp'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </section>
  );
}
