'use client';
import { useContext, useState } from 'react';
import { StoreContext } from '@/lib/context/StoreContext';
import Link from 'next/link';

export default function Page() {
  const { siteState } = useContext(StoreContext);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5; // 1ページあたりの表示件数

  // siteStateが未定義またはnullの場合は空オブジェクトを使用
  const articles = siteState || {};
  const hasArticles = Object.keys(articles).length > 0;

  // 記事を更新日時でソート
  const sortedArticles = Object.entries(articles).sort(([, a], [, b]) => {
    return new Date(b.updated_at) - new Date(a.updated_at);
  });

  // ページネーションの計算
  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = sortedArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  // 日付フォーマット用の関数
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

  // ページ変更ハンドラー
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // ページトップにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-5 py-12">
      <h1 className="text-[32px] font-bold mb-12 text-center">記事一覧</h1>
      <div className="space-y-0">
        {hasArticles ? (
          <>
            {/* 記事一覧 */}
            <div className="border-t mb-16">
              {currentArticles.map(([key, article]) => (
                <Link
                  key={key}
                  href={`/step1/${encodeURIComponent(key)}`}
                  className="block border-b hover:bg-gray-950 transition-colors duration-200"
                >
                  <div className="py-8 px-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                          {/* 日付 */}
                          <div className="text-[15px] text-gray-600 font-normal">
                            {article.updated_at && formatDate(article.updated_at)}
                          </div>
                          {/* カテゴリー（必要に応じて） */}
                          {article.category && (
                            <span className="inline-block px-3 py-1 text-[13px] bg-gray-100 text-gray-700 rounded">{article.category}</span>
                          )}
                        </div>
                        {/* タイトル */}
                        <h2 className="text-[17px] font-medium line-clamp-2">{article.title || '(タイトルなし)'}</h2>
                        {/* 説明文 */}
                        {article.description && <p className="mt-2 text-[15px] text-gray-600 line-clamp-2">{article.description}</p>}
                      </div>
                      {/* 矢印アイコン */}
                      <div className="ml-4 flex items-center">
                        <svg
                          className="w-6 h-6 text-gray-400 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* ページネーション */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 text-[15px] rounded-md border ${
                    currentPage === 1 ? ' bg-gray-400 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  前へ
                </button>

                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`w-10 h-10 flex items-center justify-center rounded-md text-[15px] ${
                        currentPage === index + 1 ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 text-[15px] rounded-md border ${
                    currentPage === totalPages
                      ? ' bg-gray-400 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  次へ
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-600">記事がありません</p>
        )}
      </div>
    </div>
  );
}
