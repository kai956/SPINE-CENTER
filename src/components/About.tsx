'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import SplitType from 'split-type';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GhostText } from './GhostText';

gsap.registerPlugin(ScrollTrigger);

interface AboutItem {
  id: number;
  title: string;
  content: string;
  emoji: string;
}

const aboutData: AboutItem[] = [
  {
    id: 1,
    title: 'Широкий спектр услуг',
    content: 'К нам обращаются с широким спектром жалоб и диагнозов, от безобидного остеохондроза до грыжи МПД и сколиоза 1-4 степени разного типа, и за короткий срок обретают новые силы для качественной жизни',
    emoji: '🏥'
  },
  {
    id: 2,
    title: 'Международное признание',
    content: 'Методика на международном рынке завоевала доверие клиентов и экспертную оценку многих деятелей медицины РФ, Казахстана и др стран',
    emoji: '🌍'
  },
  {
    id: 3,
    title: 'Наши достижения',
    content: 'Компания динамично развивается благодаря качественной работе наших сотрудников и профессионально собранному руководящему составу. За время существования компании мы оздоровили более 8 тысяч человек!',
    emoji: '🏆'
  }
];

export default function About() {
  const [activeId, setActiveId] = useState<number>(1);
  const [height, setHeight] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(false);

  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, height], [height * 0.2, 0]);

  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    setHeaderVisible(true);
  }, []);

  const handleItemClick = (id: number) => {
    setActiveId(id);
  };

  const activeItem = aboutData.find(item => item.id === activeId) || aboutData[0];

  return (
    <motion.section 
      className="min-h-screen py-32 bg-gradient-to-b from-white via-gray-50 to-white transition-colors duration-700"
      style={{ y }}
      initial={{ y: height * 0.2 }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-gray-50/50 to-white/80 transition-opacity duration-700" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Emoji Display */}
          <div 
            className="relative h-[500px] md:h-[700px] rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50"
            data-scroll
            data-scroll-speed="1"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span 
                key={activeItem.id}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-9xl"
              >
                {activeItem.emoji}
              </motion.span>
            </div>
          </div>

          {/* Content Section */}
          <div className="h-full flex flex-col relative z-20">
            <div className="col-span-2">
              <GhostText 
                text="О компании"
                className="text-5xl font-light text-gray-900 mb-16"
                duration={0.8}
                delay={0.2}
                blurAmount={3}
                brightness={1.2}
                isVisible={headerVisible}
              />
            </div>
            
            <div className="space-y-0 flex-grow">
              {aboutData.map((item) => (
                <div key={item.id} className="relative border-t border-blue-200/50">
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className="w-full py-8 text-left flex justify-between items-center group"
                  >
                    <span className={`text-2xl font-light tracking-wide transition-colors duration-300
                      ${activeId === item.id ? 'text-blue-600' : 'text-gray-800 group-hover:text-blue-600'}`}>
                      {item.title}
                    </span>
                    <span className={`text-2xl transform transition-transform duration-300 text-blue-600
                      ${activeId === item.id ? 'rotate-180' : ''}`}>
                      ↓
                    </span>
                  </button>
                  
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[1px] bg-blue-600"
                    initial={{ width: "0%" }}
                    animate={{ 
                      width: activeId === item.id ? "100%" : "0%",
                    }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.65, 0, 0.35, 1],
                      delay: activeId === item.id ? 0 : 0 
                    }}
                  />

                  <motion.div
                    initial={false}
                    animate={{ 
                      height: activeId === item.id ? 'auto' : 0,
                      opacity: activeId === item.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <GhostText
                      text={item.content}
                      className="pb-8 text-lg text-gray-600 leading-relaxed font-light tracking-wide whitespace-pre-wrap"
                      duration={0.6}
                      delay={0.2}
                      blurAmount={3}
                      brightness={1.2}
                      isVisible={activeId === item.id}
                    />
                  </motion.div>
                </div>
              ))}
              <div className="border-t border-blue-200/50" />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}