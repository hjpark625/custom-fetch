import { Suspense } from 'react';
import DetailView from '@/components/Detail/View';
import { getDetailServer } from '@/api/detail/server';

export default async function DetailPage({ params }: { params: { storename: string } }) {
  try {
    // const data = await getDetailServer(params.storename);
    // const data = await getDetailFetch(params.storename);
    // const { storename } = params;
    return (
      <Suspense fallback={<div>data loading....</div>}>
        <DetailView data={null} storename={params.storename} />
      </Suspense>
    );
  } catch (err) {
    // console.log(err);
    throw err;
  }
}
