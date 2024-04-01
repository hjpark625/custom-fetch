import { Suspense } from 'react';
import DetailView from '@/components/Detail/View';
import { getDetail } from '@/api/serverFetch';
import { getDetailFetch } from '@/utils/fetch_axios';

export default async function DetailPage({ params }: { params: { storename: string } }) {
  try {
    const data = await getDetail(params.storename);
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
