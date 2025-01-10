'use client';

import React, { useState } from 'react';

export default function Treatments() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const conditions = [
    { id: 1, name: 'НАРУШЕНИЕ ОСАНКИ (СУТУЛОСТЬ)' },
    { id: 2, name: 'ОСТЕОХОНДРОЗ' },
    { id: 3, name: 'ПРОТРУЗИИ' },
    { id: 4, name: 'ГРЫЖИ МПД' },
    { id: 5, name: 'СКОЛИОЗ (ВСЕ ВИДЫ)' },
    { id: 6, name: 'ПЕРЕКОС ТАЗА' },
    { id: 7, name: 'ВАЛЬГУСНЫЕ, ВАРУСНЫЕ НОГИ' },
    { id: 8, name: 'Х-, О- ОБРАЗНЫЕ НОГИ' },
  ];

  return (
    <section 
      className="min-h-screen py-32 relative overflow-hidden"
    >
      {/* Soft dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/90 to-indigo-900/90" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-medium mb-12 text-white">
              С чем мы работаем
            </h2>
            
            <div className="space-y-6">
              {conditions.map((condition, index) => (
                <div 
                  key={condition.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  className={`
                    flex items-center gap-4 border-b pb-4 transition-all duration-300 cursor-pointer
                    ${activeIndex === index 
                      ? 'border-blue-400 bg-gradient-to-r from-blue-500/20 to-transparent' 
                      : 'border-gray-700 hover:border-blue-400/50'
                    }
                    ${activeIndex !== null && activeIndex !== index ? 'opacity-50' : 'opacity-100'}
                  `}
                >
                  <div className={`
                    w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300
                    ${activeIndex === index 
                      ? 'border-blue-400 bg-blue-400 text-white' 
                      : 'border-gray-400 text-gray-400'
                    }
                  `}>
                    {condition.id}
                  </div>
                  <span className={`
                    text-lg transition-all duration-300
                    ${activeIndex === index 
                      ? 'text-blue-400 transform translate-x-2' 
                      : 'text-gray-300'
                    }
                  `}>
                    {condition.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="aspect-square rounded-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-700 relative">
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              Placeholder for treatment image
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 