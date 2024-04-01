import serverFetch from '@/api/serverFetch';
import type { IDetailData } from '@/api/serverFetch/types/detailType';

export async function getDetailServer(storename?: string) {
  if (storename === undefined) return null;
  try {
    const data = await serverFetch.get<IDetailData>(`/detail/${storename}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return data;
  } catch (err: unknown) {
    throw err;
  }
}
