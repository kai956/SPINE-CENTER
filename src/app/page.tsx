'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import useLocomotiveScroll from '@/hooks/useLocomotiveScroll';
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

// Loading component
const LoadingSection = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

export default function Home() {
  useLocomotiveScroll();

  return (
    <main data-scroll-container>
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
