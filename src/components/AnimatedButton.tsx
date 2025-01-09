'use client';

import React, { useState } from 'react';

interface AnimatedButtonProps {
  primaryText: string;
  secondaryText: string;
  onButtonClick?: () => void;
  className?: string;
}

export default function AnimatedButton({ primaryText, secondaryText, className = '' }: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative inline-block perspective-1000 ${className}`}
    >
      {/* 3D shadow effect */}
      <div className="absolute inset-0 transform translate-y-2 translate-x-2 bg-black/20 blur-sm rounded-sm transition-transform duration-300 group-hover:translate-y-3 group-hover:translate-x-3" />

      {/* Glowing background effect */}
      <div className="absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-80">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600" />
      </div>

      {/* Main button content with 3D flip */}
      <div className="relative transform-style-3d transition-transform duration-500 shadow-lg">
        {/* Front side */}
        <div className={`relative px-10 py-4 overflow-hidden backface-hidden transition-transform duration-500 bg-gradient-to-br from-white/10 to-white/5 ${
          isHovered ? 'rotate-x-180' : ''
        }`}>
          <span className="text-white text-lg font-light tracking-wider relative z-10 [text-shadow:_0_1px_1px_rgb(0_0_0_/_40%)]">
            {primaryText}
          </span>
        </div>

        {/* Back side */}
        <div className={`absolute inset-0 px-10 py-4 overflow-hidden backface-hidden rotate-x-180 transition-transform duration-500 bg-gradient-to-br from-white/10 to-white/5 ${
          isHovered ? 'rotate-x-0' : ''
        }`}>
          <span className="text-white text-lg font-light tracking-wider relative z-10 [text-shadow:_0_1px_1px_rgb(0_0_0_/_40%)]">
            {secondaryText}
          </span>
        </div>
      </div>

      {/* Border animation */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top border */}
        <div className={`absolute top-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-200 ease-in-out
          ${isHovered ? 'w-full' : 'w-0'}`} />
        
        {/* Right border */}
        <div className={`absolute top-0 right-0 w-[2px] bg-gradient-to-b from-purple-400 to-indigo-400 transition-all duration-200 ease-in-out
          ${isHovered ? 'h-full delay-[150ms]' : 'h-0'}`} />
        
        {/* Bottom border */}
        <div className={`absolute bottom-0 right-0 h-[2px] bg-gradient-to-l from-indigo-400 to-blue-400 transition-all duration-200 ease-in-out
          ${isHovered ? 'w-full delay-[300ms]' : 'w-0'}`} />
        
        {/* Left border */}
        <div className={`absolute bottom-0 left-0 w-[2px] bg-gradient-to-t from-blue-400 to-purple-400 transition-all duration-200 ease-in-out
          ${isHovered ? 'h-full delay-[450ms]' : 'h-0'}`} />
      </div>

      {/* Very subtle glass effect */}
      <div className="absolute inset-0 bg-white/5 pointer-events-none" />
    </button>
  );
} 