// lib/utils/api.js
import { BASE_API_ENDPOINT } from '@/lib/utils/const';

/**
 * サーバーサイドでAPIからデータを取得するユーティリティ関数
 * @param {string} path - エンドポイントのパス
 * @param {object} options - fetchオプション（キャッシュ設定など）
 * @return {Promise<object|null>} 取得したデータ、エラー時はnull
 */
export async function fetchServerSide(path = '', options = {}) {
  const url = `${BASE_API_ENDPOINT}${path}`;

  try {
    // Next.jsのサーバーコンポーネントはfetchのキャッシュ動作をサポート
    const res = await fetch(url, {
      // デフォルトのキャッシュ設定
      next: { revalidate: 3600 }, // 1時間ごとに再検証
      ...options,
    });

    if (!res.ok) {
      // console.error(`API応答エラー: ${res.status} ${res.statusText}`);
      console.log(`API応答エラー: ${res.status} ${res.statusText}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    // console.error('API接続エラー:', error);
    console.log('API接続エラー:', error);
    return null;
  }
}
