import clientAxios from '@/api/clientAxios';

export async function getDetailClient(storename?: string) {
  if (storename === undefined) return null;
  try {
    const response = await clientAxios.get(`/detail/${storename}`);
    return response.data;
  } catch (err: unknown) {
    throw err;
  }
}
