'use client';
import { useContext } from 'react';
import { StoreContext } from '@/lib/context/StoreContext';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ArticleDetailPage() {
  // URLパラメータとルーターの取得
  const params = useParams();
  const router = useRouter();
  const { siteState } = useContext(StoreContext);

  // 記事データの取得
  const article = siteState?.[params.slug] || null;

  // 記事が存在しない場合
  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">記事が見つかりませんでした</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
            記事一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  /**
   * 日付を日本語フォーマットに変換する関数
   */
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 記事ヘッダー */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {article.created_at && <div>作成日: {formatDate(article.created_at)}</div>}
          {article.updated_at && <div>更新日: {formatDate(article.updated_at)}</div>}
        </div>
      </div>

      {/* 記事本文 */}
      <article className="prose prose-lg max-w-none">
        {/* 記事の説明文（存在する場合） */}
        {article.description && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-gray-700">{article.description}</p>
          </div>
        )}

        {/* 記事の本文 */}
        <div className="mt-6" dangerouslySetInnerHTML={{ __html: article.body }} />
      </article>

      {/* フッター */}
      <div className="mt-12 pt-6 border-t">
        <Link href="/step1/" className="text-gray-100 hover:text-gray-400 flex items-center justify-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          記事一覧に戻る
        </Link>
      </div>
    </div>
  );
}
