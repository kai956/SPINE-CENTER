'use client';

import React from 'react';
import { motion } from 'framer-motion';

const missionText = [
  'В современном мире почти нет человека, которого не беспокоят боли в спине.',
  'И это напрямую сказывается на нашем образе жизни.',
  'Компания «Spine Center Bishkek» проявила смелую инициативу помочь как можно',
  'большему количеству людей обрести легкость в теле и изменить свою жизнь.'
];

export default function Mission() {
  return (
    <section 
      className="relative min-h-screen py-32 overflow-hidden"
      data-scroll-section
    >
      {/* Section-specific overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-blue-900/10" 
        style={{ mixBlendMode: 'multiply' }} 
      />

      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center w-full">
          {/* Left side - Text (moved from right) */}
          <div className="relative" data-scroll data-scroll-speed="0.5">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-medium text-blue-500 mb-12"
            >
              Миссия компании
            </motion.h2>

            <div className="space-y-8">
              {missionText.map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-xl md:text-2xl text-gray-600 leading-relaxed"
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Statistics or highlights */}
            <div className="grid grid-cols-2 gap-8 mt-16">
              {[
                { number: '8000+', label: 'Довольных клиентов' },
                { number: '5+', label: 'Лет опыта' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-center p-6 rounded-lg bg-white/50 backdrop-blur-sm shadow-lg"
                >
                  <div className="text-4xl font-medium text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-lg text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right side - Image Placeholder (moved from left) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] md:h-[700px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200"
            data-scroll
            data-scroll-speed="1"
          >
            {/* Placeholder content */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg">
              Изображение миссии компании
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 