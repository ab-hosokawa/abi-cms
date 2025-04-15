'use client';
import React, { useCallback, useContext, useState } from 'react';
import { StoreContext } from '@/lib/context/StoreContext.jsx';
import { Card, Pagination } from 'flowbite-react';
import Script from 'next/script.js';
import useRouterWithEvents from 'use-router-with-events';

export default function Step2({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPagesToShow = 5; // ページネーションの最大表示数
  const articlesPerPage = 5; // 1ページあたりの表示件数
  const router = useRouterWithEvents();

  // siteStateが未定義またはnullの場合は空オブジェクトを使用
  const articles = (data && data.contents && data.contents) || {};
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
  const formatDate = useCallback((dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  // ページ変更ハンドラー
  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    // ページトップにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleClick = useCallback((e) => {
    e.preventDefault();
    const target = e.currentTarget;
    if (target) {
      queueMicrotask(() => {
        router.push(target.getAttribute('href'));
      });
    }
  }, []);

  // JSON-LDコンポーネント
  const ArticleListJsonLd = ({ articles }) => {
    // 記事リストのJSONデータを作成
    const jsonLdData = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: articles.map(([key, article], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          headline: article.title || '(タイトルなし)',
          description: article.description || '',
          datePublished: article.created_at,
          dateModified: article.updated_at,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${process.env.NEXT_PUBLIC_BASE_URL}/step1/${encodeURIComponent(key)}`,
          },
        },
      })),
    };
    return (
      <Script id="article-list-jsonld" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(jsonLdData)}
      </Script>
    );
  };

  // 表示するページ番号の配列を生成する関数
  const getPageNumbers = useCallback(() => {
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pageNumbers = [];

    // 最初のページ
    if (startPage > 1) {
      pageNumbers.push(1);
      // 「...」を追加
      if (startPage > 2) {
        pageNumbers.push('ellipsis-start');
      }
    }

    // 中間のページ番号
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // 最後のページ
    if (endPage < totalPages) {
      // 「...」を追加
      if (endPage < totalPages - 1) {
        pageNumbers.push('ellipsis-end');
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  }, [currentPage, totalPages, maxPagesToShow]);

  return (
    <div className="container mx-auto px-5 py-12">
      <h2 className="text-[2rem] font-bold mb-12 text-center">記事一覧</h2>
      <div className="space-y-0">
        {hasArticles ? (
          <>
            {/* 記事一覧 */}
            <article className="mb-16" key={'articleList'}>
              <ArticleListJsonLd articles={currentArticles} />
              {currentArticles.map(([key, article], index) => (
                <React.Fragment key={index}>
                  <Card
                    href={`/news/${encodeURIComponent(article.id)}`}
                    onClick={(e) => {
                      handleClick(e);
                    }}
                    className={index > 0 ? 'block mt-8 max-md:mt-5' : 'block'}
                  >
                    <article className="py-4 px-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                            {/* 日付 */}
                            <div className="text-[15px] text-gray-600 font-normal">
                              {article.updated_at && formatDate(article.updated_at)}
                            </div>
                            {/* カテゴリー（必要に応じて） */}
                            {article.category && (
                              <span className="inline-block px-3 py-1 text-[13px] bg-gray-100 text-gray-700 rounded">
                                {article.category}
                              </span>
                            )}
                          </div>
                          {/* タイトル */}
                          <h3 className="text-[17px] font-medium line-clamp-2">{article['field.title'] || '(タイトルなし)'}</h3>
                        </div>
                        {/* 矢印アイコン */}
                        <span>
                          <svg
                            className="w-6 h-6 text-gray-400 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </article>
                  </Card>
                </React.Fragment>
              ))}
            </article>

            {/* ページネーション */}
            {totalPages > 1 ? (
              <nav>
                <ul className="flex justify-center items-center gap-2 mt-12">
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
                    {getPageNumbers().map((pageNumber, index) => {
                      if (pageNumber === 'ellipsis-start' || pageNumber === 'ellipsis-end') {
                        return (
                          <span key={pageNumber} className="w-10 h-10 flex items-center justify-center text-[15px] text-gray-600">
                            ...
                          </span>
                        );
                      }

                      return (
                        <button
                          key={index}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`w-10 h-10 flex items-center justify-center rounded-md text-[15px] ${
                            currentPage === pageNumber ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 text-[15px] rounded-md border ${
                      currentPage === totalPages
                        ? ' bg-gray-400 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    次へ
                  </button>
                </ul>
              </nav>
            ) : null}
          </>
        ) : (
          <p className="text-center text-gray-500">記事がありません</p>
        )}
      </div>
    </div>
  );
}
