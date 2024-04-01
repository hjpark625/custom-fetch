'use client';
import React from 'react';
import { useGetRoot } from '@/hooks/useGetRoot';

import { IDetailData, getDetail } from '@/utils/fetch_axios';

interface DetailViewProps {
  storename?: string;
  data: IDetailData;
}

export default function DetailView(props: DetailViewProps) {
  const { data } = props;

  // const clientData = useGetRoot({ storename: props.storename ?? '' });
  const clientData = getDetail(props.storename ?? '');

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
      ) : clientData ? (
        <div>
          <div>
            clientData is: <br /> {JSON.stringify(clientData)}
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
