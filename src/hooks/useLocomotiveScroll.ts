'use client';

import { useEffect, useRef } from 'react';

export default function useLocomotiveScroll() {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initScroll = async () => {
      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;

        if (scrollRef.current) {
          scrollRef.current.destroy();
        }

        const container = document.querySelector('[data-scroll-container]');
        if (!container) return;

        scrollRef.current = new LocomotiveScroll({
          el: container as HTMLElement,
          smooth: true,
          multiplier: 0.5,
          class: 'is-revealed',
          reloadOnContextChange: true,
          touchMultiplier: 2,
          smoothMobile: false,
        });

        // Update Locomotive Scroll after a short delay
        setTimeout(() => {
          scrollRef.current?.update();
        }, 500);

      } catch (error) {
        console.error('Locomotive Scroll init error:', error);
      }
    };

    // Initialize after DOM content is loaded
    if (document.readyState === 'complete') {
      initScroll();
    } else {
      window.addEventListener('load', initScroll);
    }

    return () => {
      window.removeEventListener('load', initScroll);
      if (scrollRef.current) {
        scrollRef.current.destroy();
        scrollRef.current = null;
      }
    };
  }, []);

  return scrollRef;
} 