'use client';

import { useEffect, useRef } from 'react';

export default function useLocomotiveScroll() {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const initScroll = async () => {
      try {
        // Dynamic import of locomotive-scroll
        const LocomotiveScroll = (await import('locomotive-scroll')).default;

        // Destroy existing instance if it exists
        if (scrollRef.current) {
          scrollRef.current.destroy();
        }

        const container = document.querySelector('[data-scroll-container]');
        if (!container) return;

        // Create new instance
        scrollRef.current = new LocomotiveScroll({
          el: container as HTMLElement,
          smooth: true,
          multiplier: 0.5,
          class: 'is-revealed',
          reloadOnContextChange: true,
          touchMultiplier: 2,
          smoothMobile: false,
        });

        // Update after a short delay to ensure all content is loaded
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

    // Cleanup
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