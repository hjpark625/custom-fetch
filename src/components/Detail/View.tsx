'use client';
import React from 'react';
import { useGetRoot } from '@/hooks/useGetRoot';
import { IDetailData } from '@/utils/fetch_axios';

interface DetailViewProps {
  // storename?: string;
  data: IDetailData;
}

export default function DetailView(props: DetailViewProps) {
  const { data } = props;

  // const data = useGetRoot({ storename: storename ?? '' });

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
      ) : null}
    </div>
  );
}
