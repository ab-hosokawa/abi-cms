import './global.scss';
import Html from '@/components/organisms/layout/Html';
import { API_ENDPOINT } from '@/lib/utils/const';
export const metadata = {
  title: 'MVP SITE',
  description: '必要最低限の新着ページです',
};

async function getData() {
  try {
    const res = await fetch(API_ENDPOINT);
    if (res.status !== 200) {
      console.error(`API応答エラー: ${res.status} ${res.statusText}`);
      // エラー時のフォールバックデータを返すか、エラーを適切に処理
      return { error: true, message: `APIエラー: ${res.statusText}` };
    }
    return await res.json();
  } catch (error) {
    console.error('API接続エラー:', error);
    // ネットワークエラーなどのフォールバック処理
    return { error: true, message: 'APIに接続できません' };
  }
}

export default async function RootLayout({ children }) {
  const data = await getData();
  return <Html data={data} child={children} />;
}
