import { Suspense } from 'react';
import DetailView from '@/components/Detail/View';
import { getDetailServer } from '@/api/detail/server';

export default async function DetailPage({ params }: { params: { storename: string } }) {
  try {
    const data = await getDetailServer(params.storename);
    console.log(data);
    // const data = await getDetailFetch(params.storename);
    // const { storename } = params;
    return (
      <Suspense fallback={<div>data loading....</div>}>
        <DetailView data={data} storename={params.storename} />
      </Suspense>
    );
  } catch (err) {
    // console.log(err);
    throw err;
  }
}
