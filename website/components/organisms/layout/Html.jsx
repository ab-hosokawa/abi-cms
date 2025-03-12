'use client';
import Header from '@/components/organisms/layout/Header';
import Footer from '@/components/organisms/layout/footer';
import { StoreProvider } from '@/lib/context/StoreContext';
import { ThemeProvider } from '@/lib/context/ThemeContext';

export default function Html({ data, child }) {
  return (
    <html lang="ja">
      <StoreProvider data={data}>
        <body>
          <ThemeProvider>
            <Header />
            <main className="container mx-auto my-7">{child}</main>
            <Footer />
          </ThemeProvider>
        </body>
      </StoreProvider>
    </html>
  );
}
