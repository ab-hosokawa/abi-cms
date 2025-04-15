import { fetchServerSide } from '@/lib/utils/api';
import { API_PATHS } from '@/lib/utils/const';
import Step1 from '@/components/organisms/templates/Step1.jsx';

export const metadata = {
  title: 'ステップ1 | MVP SITE',
  description: 'ステップ1のページです',
};

async function getStep1Data() {
  // step1専用のエンドポイントからデータを取得
  return fetchServerSide(API_PATHS.step1);
}

export default async function Page() {
  const data = await getStep1Data();
  return <Step1 data={data} />;
}
