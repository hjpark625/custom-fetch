import serverFetch from '@/api/serverFetch';
import type { IDetailData } from '@/api/serverFetch/types/detailType';

export async function getDetailServer(storename?: string) {
  if (storename === undefined) return null;
  try {
    const data = await serverFetch.get<{ data: IDetailData }>(`/detail/${storename}`, {
      next: { revalidate: 0 }
    });
    return data.data;
  } catch (err: unknown) {
    throw err;
  }
}

export async function getError() {
  try {
    await serverFetch.get('/test', {
      next: { revalidate: 0 }
    });
  } catch (err) {
    throw err;
  }
}
