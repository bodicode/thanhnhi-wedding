'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Scroll mượt siêu cấp với Lenis để tạo cảm giác sang trọng
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      // Disable smooth scroll on touch devices to avoid conflicts with native behavior
      // @ts-ignore
      smoothTouch: false,
    });
    
    lenisRef.current = lenis;
    
    // Đảm bảo cập nhật lại chiều cao khi nội dung bên trong thay đổi (quan trọng sau khi mở phong bì)
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize(); // Kích hoạt tính toán lại chiều cao trang
    });
    
    // Quan sát toàn bộ body để cập nhật chiều cao trang
    resizeObserver.observe(document.body);

    function raf(time: number) {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
      }
      requestAnimationFrame(raf);
    }

    const animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
}
