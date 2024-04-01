'use client';
import React, { useEffect, useState } from 'react';
// import { useGetRoot } from '@/hooks/useGetRoot';

import { getDetailClient } from '@/api/detail/client';
import type { IDetailData } from '@/api/serverFetch/types/detailType';

interface DetailViewProps {
  storename?: string;
  data: IDetailData | null;
}

export default function DetailView(props: DetailViewProps) {
  const [axiosData, setAxiosData] = useState<IDetailData | null>(null);
  const { data } = props;

  // const clientData = useGetRoot({ storename: props.storename ?? '' });
  useEffect(() => {
    const fetchData = async () => {
      if (props.storename) {
        const clientData = await getDetailClient(props.storename);
        setAxiosData(clientData.data);
      }
    };
    fetchData();
  }, [props.storename]);

  return (
    <div>
      {data ? (
        <div>
          <div>
            data is: <br /> {JSON.stringify(data)}
          </div>
          <br />
          <br />
          {/* <div>geoahsh is: {data.geohash}</div> */}
        </div>
      ) : axiosData ? (
        <div>
          <div>
            axiosData is: <br /> {JSON.stringify(axiosData)}
          </div>
          <br />
          <br />
          {/* <div>geoahsh is: {clientData.geohash}</div> */}
        </div>
      ) : (
        <div>loading....</div>
      )}
    </div>
  );
}
