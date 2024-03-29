import { useEffect, useState } from 'react';
import * as ngeohash from 'ngeohash';
import { getDetail } from '@/utils/fetch_axios';

import type { IDetailData } from '@/utils/fetch_axios';

export function useGetRoot(props: { storename?: string }) {
  const [data, setData] = useState<IDetailData | null>(null);
  const [geohash, setGeohash] = useState<string | null>(null);

  async function getRootMessage() {
    if (!props.storename) return;
    const response = await getDetail(props.storename);
    const { coord } = response.data;
    const geohash = ngeohash.encode(coord.lat, coord.lng, 6);
    setGeohash(geohash);
    setData(response.data);
  }
  useEffect(() => {
    getRootMessage();
  }, []);

  return { data, geohash };
}
