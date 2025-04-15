import { fetchServerSide } from '@/lib/utils/api';
import DynamicPageStep2 from '@/components/organisms/templates/DynamicPageStep2.jsx';
import { API_PATHS } from '@/lib/utils/const.js';

export async function generateMetadata({ params }) {
  const { slug } = params;
  // メタデータ用のデータを取得することも可能
  const data = await getDynamicPageData();
  console.log(data);
  let d = null;
  if (data && data.contents) {
    data.contents.forEach((item) => {
      if (parseInt(item.id) === parseInt(slug)) {
        d = item;
      }
    });
  }
  return {
    title: d.title ? d.title : 'title',
    description: d.title ? d.title : 'description',
  };
}

async function getDynamicPageData() {
  // スラグを使って動的にエンドポイントを構築
  return fetchServerSide(API_PATHS.news);
}

export default async function Page({ params }) {
  const { slug } = params;
  const data = await getDynamicPageData();
  const dataDetail = () => {
    if (data && data.contents) {
      let d = null;
      data.contents.forEach((item) => {
        if (parseInt(item.id) === parseInt(slug)) {
          d = item;
        }
      });
      return d;
    } else {
      return null;
    }
  };
  return <DynamicPageStep2 slug={slug} data={dataDetail()} />;
}
