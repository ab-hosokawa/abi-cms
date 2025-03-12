import './global.scss';
import Html from '@/components/organisms/layout/Html';
import { API_ENDPOINT } from '@/lib/utils/const';
export const metadata = {
  title: 'MVP SITE',
  description: '必要最低限の新着ページです',
};

async function getData() {
  const res = await fetch(API_ENDPOINT);
  if (res.status !== 200) throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
  return await res.json();
}

export default async function RootLayout({ children }) {
  const data = await getData();
  return <Html data={data} child={children} />;
}
