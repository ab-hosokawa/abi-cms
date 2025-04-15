import { fetchServerSide } from '@/lib/utils/api';
import { API_PATHS } from '@/lib/utils/const';
import Step2 from '@/components/organisms/templates/Step2.jsx';

export const metadata = {
  title: 'ステップ2 | MVP SITE',
  description: 'ステップ2のページです',
};

async function getStep2Data() {
  // step2専用のエンドポイントからデータを取得
  return fetchServerSide(API_PATHS.news);
}

export default async function Page() {
  const data = await getStep2Data();
  return <Step2 data={data} />;
}
