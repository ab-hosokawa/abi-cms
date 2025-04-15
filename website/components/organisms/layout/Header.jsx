'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/lib/context/ThemeContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const router = useRouter();

  return (
    <header className={isDarkMode ? 'bg-gray-700 text-white shadow-md' : 'bg-gray-200 shadow-md'}>
      <div className="container mx-auto flex items-center justify-between py-4 max-md:px-5 max-md:relative">
        {/* ロゴ */}
        <div className="text-2xl font-bold">
          <a
            onClick={() => {
              router.push('/');
            }}
            aria-label="ホームページへ移動"
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            MVP SITE
          </a>
        </div>
        {/* ハンバーガーメニュー（モバイル用） */}
        <button
            className="md:hidden focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="メニューボタン"
            onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
          ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
          )}
        </button>
        {/* ナビゲーション */}
        <nav className={`${isOpen ? 'block max-md:absolute max-md:top-full max-md:left-0 max-md:w-full max-md:bg-gray-700' : 'hidden'} md:block`} aria-label="メインナビゲーション">
          <ul className="flex flex-col md:flex-row md:space-x-6 max-md:[&>li>a]:block max-md:[&>li>a]:px-5 max-md:[&>li>a]:py-2 max-md:[&>li>a]:border-t-1">
            <li>
              <a
                onClick={() => {
                  router.push('/');
                }}
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                home
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  router.push('/step1/');
                }}
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                step1
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  router.push('/news/');
                }}
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                news
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
