'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import AnimatedButton from './AnimatedButton';
import { motion, useTransform, useScroll } from 'framer-motion';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [height, setHeight] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, height], [0, height * 0.3]);

  // Set window height after mount
  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (buttonRef.current) {
        const scrollPosition = window.scrollY;
        setIsVisible(scrollPosition < 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Wait for DOM to be ready
    if (!titleRef.current || !subtitleRef.current) return;

    // Initialize SplitType for both texts
    const titleSplit = new SplitType(titleRef.current, {
      types: 'words',
      tagName: 'span'
    });

    const subtitleSplit = new SplitType(subtitleRef.current, {
      types: 'words',
      tagName: 'span'
    });

    // Ensure we have elements to animate
    if (!titleSplit.words?.length || !subtitleSplit.words?.length) return;

    // Create timeline
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' }});

    // Set initial states
    gsap.set([titleSplit.words, subtitleSplit.words], {
      y: 50,
      opacity: 0
    });

    // Animate all text
    tl.to(titleSplit.words, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.03,
      delay: 0.2
    })
    .to(subtitleSplit.words, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.03
    }, "-=0.4");

    // Cleanup function
    return () => {
      tl.kill();
      titleSplit.revert();
      subtitleSplit.revert();
    };
  }, []);

  return (
    <section className="relative h-screen bg-gradient-to-b from-[#080A0F] via-[#0A1A2F] to-[#080A0F] transition-colors duration-700">
      {height > 0 && (
        <motion.div 
          className="relative h-full"
          style={{ y }}
        >
          {/* Background Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl space-y-4">
                <h1 
                  ref={titleRef}
                  className="text-3xl sm:text-4xl md:text-7xl font-light text-white"
                >
                  SPINE CENTER
                </h1>
                <h2
                  ref={subtitleRef}
                  className="text-2xl sm:text-3xl md:text-7xl font-light text-white"
                >
                  - ЦЕНТР ЗДОРОВОГО ПОЗВОНОЧНИКА В БИШКЕКЕ
                </h2>
                <div 
                  ref={buttonRef} 
                  className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                  <AnimatedButton
                    primaryText="ЗАПИСАТЬСЯ НА ПРИЕМ"
                    secondaryText="ОСТАВИТЬ ЗАЯВКУ"
                    className="w-full md:w-auto mt-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
} 