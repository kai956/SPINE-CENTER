'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-400 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            {/* Logo and description */}
            <div className="md:col-span-5 space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-3xl font-light text-white">SPINE CENTER</span>
              </motion.div>
              <p className="text-gray-400 leading-relaxed">
                Центр здорового позвоночника в Бишкеке. Мы помогаем людям избавиться от боли и вернуться к полноценной жизни.
              </p>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3">
              <h3 className="text-white font-medium mb-4">Навигация</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#methods" className="hover:text-white transition-colors">Методика</a></li>
                <li><a href="#results" className="hover:text-white transition-colors">Результаты</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>

            {/* Contact info */}
            <div className="md:col-span-4">
              <h3 className="text-white font-medium mb-4">Контакты</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <span className="text-blue-400">📍</span>
                  <span>г. Бишкек, ул. XXXXX</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-blue-400">📱</span>
                  <a href="tel:+996XXX" className="hover:text-white transition-colors">
                    +996 XXX XXX XXX
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-blue-400">✉️</span>
                  <a href="mailto:info@spinecenter.kg" className="hover:text-white transition-colors">
                    info@spinecenter.kg
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social links and copyright */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© {new Date().getFullYear()} SPINE CENTER. Все права защищены.</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 