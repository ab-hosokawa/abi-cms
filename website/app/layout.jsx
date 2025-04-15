import './global.scss';
import Html from '@/components/organisms/layout/Html';
import { API_PATHS } from '@/lib/utils/const';
import { fetchServerSide } from '@/lib/utils/api.js';
export const metadata = {
  title: 'MVP SITE',
  description: '必要最低限の新着ページです',
};

async function getData() {
  // サイト共通データを取得する
  return fetchServerSide(API_PATHS.common);
}

export default async function RootLayout({ children }) {
  const data = await getData();
  return <Html {...(data && { data: data })} child={children} />;
}
