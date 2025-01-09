'use client';

import React, { useState } from 'react';
import AnimatedButton from './AnimatedButton';

export default function Sessions() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const sessionInfo = [
    {
      id: 1,
      title: 'Каждое занятие проходит под присмотром квалифицированного тренера',
      content: ''
    },
    {
      id: 2,
      title: 'Длительность 1 занятия — 45 минут, с дополнительной растяжкой',
      content: 'Оптимальное время для эффективной тренировки без переутомления'
    },
    {
      id: 3,
      title: 'Ощутимый эффект уже после первого занятия',
      content: 'Вы почувствуете улучшение подвижности и уменьшение дискомфорта'
    },
    {
      id: 4,
      title: 'Длительность курса тренер составляет каждому клиенту с учетом индивидуальных особенностей организма',
      content: 'Персональный подход к каждому клиенту для достижения максимальных результатов'
    },
    {
      id: 5,
      title: 'Эффект закрепляется через прохождение ежедневных тренировок в течение курса',
      content: 'Регулярные занятия обеспечивают стойкий результат и формирование правильных двигательных паттернов'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden" data-scroll-section>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-blue-50 to-purple-50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-medium mb-12 text-gray-900">
              Как проходят занятия
            </h2>
            
            <div className="space-y-8">
              {sessionInfo.map((info, index) => (
                <div 
                  key={info.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  className={`
                    transition-all duration-500 cursor-pointer
                    ${activeIndex === index ? 'transform translate-x-4' : ''}
                  `}
                >
                  <div className={`
                    p-6 rounded-lg transition-all duration-300
                    ${activeIndex === index 
                      ? 'bg-white shadow-xl' 
                      : 'hover:bg-white/50'
                    }
                  `}>
                    <h3 className={`
                      text-xl mb-2 transition-all duration-300
                      ${activeIndex === index ? 'text-blue-600' : 'text-gray-800'}
                    `}>
                      {info.title}
                    </h3>
                    {info.content && (
                      <p className={`
                        text-gray-600 transition-all duration-300 overflow-hidden
                        ${activeIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
                      `}>
                        {info.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <AnimatedButton
                primaryText="ЗАКАЗАТЬ ЗВОНОК"
                secondaryText="ЗАПИСАТЬСЯ"
              />
            </div>
          </div>

          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-100 relative">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              Placeholder for session image
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 