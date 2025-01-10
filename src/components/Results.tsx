'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Results() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  
  const results = [
    { id: 1, title: 'После 50 занятий', description: 'Сколиоз' },
    { id: 2, title: 'После 30 занятий', description: 'Нарушение осанки' },
    { id: 3, title: 'После 40 занятий', description: 'Остеохондроз' },
    { id: 4, title: 'После 25 занятий', description: 'Протрузии' },
    { id: 5, title: 'После 35 занятий', description: 'Грыжи МПД' },
    { id: 6, title: 'После 45 занятий', description: 'Сколиоз' },
    { id: 7, title: 'После 20 занятий', description: 'Перекос таза' },
    { id: 8, title: 'После 55 занятий', description: 'Сутулость' },
  ];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex((prev) => (prev + newDirection + results.length) % results.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="min-h-screen py-32 bg-gradient-to-b from-gray-900 via-black to-gray-900 transition-colors duration-700">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-gray-900/70 to-black/90 transition-opacity duration-700" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <h2 className="text-4xl font-medium mb-20 text-white text-center">
          Результаты наших клиентов
        </h2>

        {/* Full-screen carousel */}
        <div className="relative h-[70vh] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute w-full max-w-5xl"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <div className="grid grid-cols-2 gap-8 bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm">
                {/* Before image */}
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg overflow-hidden relative group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-400 text-xl">До</span>
                  </div>
                </div>

                {/* After image */}
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg overflow-hidden relative group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-400 text-xl">После</span>
                  </div>
                </div>

                {/* Info overlay */}
                <div className="col-span-2 text-center">
                  <h3 className="text-2xl text-white mb-2">{results[activeIndex].title}</h3>
                  <p className="text-gray-300">{results[activeIndex].description}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows - only visible on desktop and only within Results section */}
          <div className="hidden md:block absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="container mx-auto px-4 relative">
              <button
                onClick={() => paginate(-1)}
                className="pointer-events-auto absolute left-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => paginate(1)}
                className="pointer-events-auto absolute right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Dots navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {results.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === activeIndex ? 'bg-blue-500' : 'bg-gray-600'
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Swipe helpers
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
}; 