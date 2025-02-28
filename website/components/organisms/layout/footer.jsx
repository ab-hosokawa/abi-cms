'use client';
import React from 'react';
import { useTheme } from '@/lib/context/ThemeContext';

export default function Footer() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  //html
  return (
    <footer className={isDarkMode ? 'bg-gray-700 text-white py-4' : 'bg-gray-200 py-4'}>
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} MVP SITE.</p>
      </div>
    </footer>
  );
}
