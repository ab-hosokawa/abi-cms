'use client';
import Header from '@/components/organisms/layout/Header';
import Footer from '@/components/organisms/layout/footer';
import { Geist, Geist_Mono } from 'next/font/google';
import { StoreProvider } from '@/lib/context/StoreContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
export default function Html({ data, child }) {
  return (
    <html lang="ja">
      <StoreProvider data={data}>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Header />
          <main className="container mx-auto my-7">{child}</main>
          <Footer />
        </body>
      </StoreProvider>
    </html>
  );
}
