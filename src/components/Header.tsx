'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import SplitType from 'split-type';
import AnimatedButton from './AnimatedButton';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedButtonProps {
  primaryText: string;
  secondaryText: string;
  onButtonClick?: () => void;
  className?: string;
}

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Create refs for each section that needs different colored header
  const [heroRef, heroInView] = useInView();
  const [aboutRef, aboutInView] = useInView();
  const [missionRef, missionInView] = useInView();
  const [sessionsRef, sessionsInView] = useInView();

  // Determine text color based on scroll position
  useEffect(() => {
    const handleScroll = (e: any) => {
      // Only run color detection on mobile
      if (isMobile) {
        const scrollPosition = window.scrollY;
        const sections = document.querySelectorAll('section');
        let shouldBeDark = false;

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          const sectionBottom = sectionTop + rect.height;
          
          if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionBottom - 100) {
            if (
              section.querySelector('.text-gray-900') || // About section
              section.querySelector('.text-gray-800') || // Methods section
              section.querySelector('.text-gray-600')    // Mission section
            ) {
              shouldBeDark = true;
            }
          }
        });

        setIsDark(shouldBeDark);
      } else {
        // On desktop, always set to dark
        setIsDark(true);
      }
    };

    // Only add scroll listener for mobile
    if (isMobile) {
      window.addEventListener('scroll', handleScroll);
    } else {
      // For desktop, just set dark mode
      setIsDark(true);
    }

    // Initial check
    handleScroll({});

    return () => {
      if (isMobile) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isMobile]);

  const setNumberRef = (index: number) => (el: HTMLSpanElement | null) => {
    numbersRef.current[index] = el;
  };

  const setMenuItemRef = (index: number) => (el: HTMLDivElement | null) => {
    menuItemsRef.current[index] = el;
  };

  useEffect(() => {
    if (isMenuOpen) {
      // Initialize SplitType for each menu item
      const splitTexts = menuItemsRef.current.map(item => {
        if (item) {
          return new SplitType(item, {
            types: 'words',
            tagName: 'span'
          });
        }
        return null;
      });

      // Set initial states
      gsap.set([
        ...splitTexts.map(split => split?.words || []),
        ...numbersRef.current
      ], {
        y: 50,
        opacity: 0
      });

      // Animate numbers and words
      gsap.to(numbersRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        delay: 0.3
      });

      splitTexts.forEach((split, index) => {
        gsap.to(split?.words || [], {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.08,
          delay: 0.6 + (index * 0.1)
        });
      });
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-6' : 'py-10'
    }`}>
      <nav className="px-2 md:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className={`relative transition-all duration-300 ${
            isScrolled || isMobile ? 'w-40 h-16 -ml-1 md:ml-0' : 'w-56 h-20'
          }`}>
            <Image
              src="/images/logo.png"
              alt="Spine Center Logo"
              fill
              style={{ objectFit: 'contain' }}
              className={`transition-all duration-300 ${isDark ? '' : 'brightness-0 invert'}`}
            />
          </Link>

          {/* Cascading Sliding Layers */}
          <div className="fixed inset-y-0 right-0 flex">
            {/* First sliding layer - White */}
            <div 
              className={`fixed top-0 right-0 w-full md:w-[400px] h-full bg-white transform transition-transform duration-300 ease-in-out z-[51]
                ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            />

            {/* Second sliding layer - Gray */}
            <div 
              className={`fixed top-0 right-0 w-full md:w-[400px] h-full bg-gray-800 transform transition-transform duration-300 ease-in-out delay-150 z-[52]
                ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            />

            {/* Main Menu - Black */}
            <div 
              className={`fixed top-0 right-0 w-full md:w-[400px] h-full bg-black transform transition-transform duration-300 ease-in-out delay-300 z-[53]
                ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
              <div className="h-full flex flex-col justify-center px-6 md:px-12">
                <nav className="space-y-8">
                  {[
                    { href: '/temp-home', text: 'ГЛАВНАЯ', number: '01' },
                    { href: '/temp-about', text: 'О НАС', number: '02' },
                    { href: '/temp-services', text: 'УСЛУГИ', number: '03' },
                    { href: '/temp-results', text: 'РЕЗУЛЬТАТЫ', number: '04' },
                    { href: '/temp-contact', text: 'КОНТАКТЫ', number: '05' },
                  ].map((item, index) => (
                    <Link
                      key={item.text}
                      href={item.href}
                      className="group block transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="overflow-hidden">
                        <span 
                          ref={setNumberRef(index)}
                          className="text-sm text-gray-500 block mb-1"
                        >
                          {item.number}
                        </span>
                        <div className="relative">
                          <div 
                            ref={setMenuItemRef(index)}
                            className={`text-2xl font-light relative inline-block ${
                              pathname === item.href ? 'text-blue-400' : 'text-white group-hover:text-blue-400'
                            }`}
                          >
                            {item.text}
                            {/* Active underline */}
                            {pathname === item.href && (
                              <span 
                                className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-400"
                              />
                            )}
                            {/* Hover underline */}
                            {pathname !== item.href && (
                              <span 
                                className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-400 transform origin-left transition-transform duration-300 ease-out scale-x-0 group-hover:scale-x-100"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                  
                  <AnimatedButton
                    primaryText="ЗАПИСАТЬСЯ"
                    secondaryText="ОСТАВИТЬ ЗАЯВКУ"
                    onButtonClick={() => setIsMenuOpen(false)}
                    className="mt-12 w-full"
                  />
                </nav>
              </div>
            </div>
          </div>

          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`fixed right-8 top-8 w-16 h-16 focus:outline-none z-[60] transition-colors duration-300 ${
              isMenuOpen ? 'text-white' : isDark ? 'text-blue-600' : 'text-white'
            }`}
          >
            <span className={`absolute left-1/2 top-1/2 block w-8 h-[2px] bg-current transform -translate-x-1/2 transition-transform duration-300 ease-in-out
              ${isMenuOpen ? 'rotate-45' : '-translate-y-2.5'}`} />
            
            <span className={`absolute left-1/2 top-1/2 block w-8 h-[2px] bg-current transform -translate-x-1/2 transition-opacity duration-300 ease-in-out
              ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            
            <span className={`absolute left-1/2 top-1/2 block w-8 h-[2px] bg-current transform -translate-x-1/2 transition-transform duration-300 ease-in-out
              ${isMenuOpen ? '-rotate-45' : 'translate-y-2.5'}`} />
          </button>
        </div>
      </nav>
    </header>
  );
} 