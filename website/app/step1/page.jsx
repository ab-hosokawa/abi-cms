'use client';
import { useContext } from 'react';
import { StoreContext } from '@/lib/context/StoreContext';
import Link from 'next/link';

export default function Page() {
  const { siteState } = useContext(StoreContext);
  console.log(siteState);
  const articles = siteState || []; // articlesが存在しない場合は空配列を使用

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">MVP記事一覧</h1>
        <div className="space-y-4">
          {Object.keys(siteState).map((article, index) => {
            return (
              <div key={index} className="p-4 border rounded hover:bg-gray-50">
                <Link href={`/step1/${article.slug}`} className="text-xl text-blue-600 hover:text-blue-800">
                  {article.title}
                </Link>
              </div>
            );
          })}
        </div>

        {articles.length === 0 && <p className="text-gray-500 text-center py-4">記事がまだありません。</p>}
      </div>
    </>
  );
}
