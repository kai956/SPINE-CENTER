'use client';

import React, { useState } from 'react';
import AnimatedButton from './AnimatedButton';

export default function Methods() {
  const [activeMethod, setActiveMethod] = useState<number | null>(null);
  
  const methods = [
    { 
      id: '01',
      name: 'Айкуне',
      description: 'Оздоровительная система, позволяющая улучшить состояние человека при заболеваниях остеохондроза, грыжи и протрузии МПД, искривление позвоночника, заболевания суставов'
    },
    { 
      id: '02',
      name: 'Растяжки',
      description: 'Представленные упражнения, направлены на работу костно-мышечной системы, в частности мышц позвоночника, суставов и их связок.'
    },
    { 
      id: '03',
      name: 'ЛФК',
      description: 'Эффективность и безопасность основаны на статико-динамических движениях, способствующие укреплению мышц и связок с сохранением долгосрочного результата'
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white transition-colors duration-700">
      {/* Methods overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-white/50 to-gray-50/80 transition-opacity duration-700" />

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-5xl font-light mb-16 text-gray-800"
            data-scroll
            data-scroll-speed="1"
          >
            Методика в<br />
            <span className="font-normal">SPINE CENTER</span>
          </h2>

          <div className="space-y-12">
            {methods.map((method, index) => (
              <div 
                key={method.id}
                onMouseEnter={() => setActiveMethod(index)}
                onMouseLeave={() => setActiveMethod(null)}
                className="group relative"
                data-scroll
                data-scroll-speed={0.2 * (index + 1)}
              >
                <div className={`
                  border-l-2 pl-8 py-6 transition-all duration-500 ease-out
                  ${activeMethod === index ? 'border-blue-500' : 'border-gray-200'}
                  ${activeMethod !== null && activeMethod !== index ? 'opacity-50' : 'opacity-100'}
                `}>
                  <div className="flex items-center gap-6 mb-4">
                    <span className={`text-sm transition-colors duration-300
                      ${activeMethod === index ? 'text-blue-500' : 'text-gray-400'}`}>
                      {method.id}.
                    </span>
                    <span className={`text-3xl font-light tracking-wide transition-colors duration-300
                      ${activeMethod === index ? 'text-blue-500' : 'text-gray-700'}`}>
                      {method.name}
                    </span>
                  </div>
                  
                  <div className={`transition-all duration-500 ease-out max-h-0 overflow-hidden
                    ${activeMethod === index ? 'max-h-96' : ''}`}>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                      {method.description}
                    </p>
                    
                    {/* Placeholder for image */}
                    <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <span className="text-4xl text-gray-300">😊</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16" data-scroll data-scroll-speed="1">
            <AnimatedButton
              primaryText="ЗАКАЗАТЬ ЗВОНОК"
              secondaryText="ЗАПИСАТЬСЯ"
              className="text-gray-800"
            />
          </div>
        </div>
      </div>
    </section>
  );
} 