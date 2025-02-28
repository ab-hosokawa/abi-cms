'use client';
import { useContext } from 'react';
import { StoreContext } from '@/lib/context/StoreContext';

export default function Page() {
  const { siteState } = useContext(StoreContext);
  return (
    <>
      <article>
        <h1 className={'text-7xl mb-3'}>{siteState.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: siteState.body }} />
      </article>
    </>
  );
}
