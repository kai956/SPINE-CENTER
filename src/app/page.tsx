'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';

// Static imports for essential components
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';

// Dynamic imports for other components
const About = dynamic(() => import('@/components/About'));
const Methods = dynamic(() => import('@/components/Methods'));
const Treatments = dynamic(() => import('@/components/Treatments'));
const Sessions = dynamic(() => import('@/components/Sessions'));
const Results = dynamic(() => import('@/components/Results'));
const Contact = dynamic(() => import('@/components/Contact'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Mission />
      <Methods />
      <Treatments />
      <Sessions />
      <Results />
      <Contact />
      <Footer />
    </main>
  );
}
