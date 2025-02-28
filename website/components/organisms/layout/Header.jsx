'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="bg-gray-700 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4">
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
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        {/* ナビゲーション */}
        <nav className={`${isOpen ? 'block' : 'hidden'} md:block`} aria-label="メインナビゲーション">
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <li>
              <a
                onClick={() => {
                  router.push('/');
                }}
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                ホーム
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  router.push('/step1/');
                }}
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                MVP記事一覧
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
