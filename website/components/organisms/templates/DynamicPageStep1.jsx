'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CustomButton from '@/components/atoms/CustomButton.jsx';
import { SlArrowRight } from 'react-icons/sl';

export default function DynamicPageStep2({ slug, data }) {
  // URLパラメータとルーターの取得
  const router = useRouter();

  // 記事データの取得
  const article = data || null;

  // 記事が存在しない場合
  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">記事が見つかりませんでした</h1>
          <Link href="/website/public" className="text-blue-600 hover:text-blue-800 underline">
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
        <h1 className="text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: article.title }} />
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
      <div className="mt-12 pt-6 border-t text-center">
        <CustomButton
          color={'gray'}
          size={'sm'}
          text={'記事一覧に戻る'}
          icon={
            <span className="text-[.7rem] ms-1">
              <SlArrowRight />
            </span>
          }
          onClick={() => {
            router.push('/step1/');
          }}
          className="inline-block"
        />
      </div>
    </div>
  );
}
