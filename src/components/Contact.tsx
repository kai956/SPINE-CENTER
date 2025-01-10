'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#080A0F] via-[#0A1A2F] to-[#080A0F] relative overflow-hidden py-20" data-scroll-section>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl font-light text-center text-white mb-16"
        >
          ЗАПИШИТЕСЬ НА БЕСПЛАТНОЕ<br />ПРОБНОЕ ЗАНЯТИЕ
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="aspect-square bg-gray-800/50 rounded-lg overflow-hidden relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Placeholder {index}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl relative"
            style={{
              transform: 'perspective(1000px) rotateX(2deg)',
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl" />
            
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Введите ваше имя"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <span className="text-gray-400">🇰🇬</span>
                  <span className="text-gray-400">+996</span>
                </div>
                <input
                  type="tel"
                  placeholder="(999) 999-999"
                  className="w-full px-6 py-4 pl-24 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <textarea
                  placeholder="Беспокоящая вас боль"
                  rows={4}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(formData);
                  }}
                  className="w-full text-lg py-5 rounded-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 
                    hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 
                    text-white font-light transition-all duration-300"
                >
                  ЗАПИСАТЬСЯ
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 