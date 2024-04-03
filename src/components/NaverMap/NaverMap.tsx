'use client';
import { useInitNaverSdk } from '@/hooks/useInitNaverSdk';
// import { useNaverMap } from '@/hooks/useNaverMap';
import React from 'react';

export default function NaverMap() {
  const { isLoadScript } = useInitNaverSdk();
  // const mapRef = useNaverMap(isLoadScript);

  return isLoadScript && <div id="map" style={{ width: '100%', height: '100vh' }} />;
}
