import { useEffect, useRef } from 'react';

export function useNaverMap(isLoadScript: boolean) {
  const mapRef = useRef<naver.maps.Map | null>(null);

  useEffect(() => {
    if (!isLoadScript) return;
    const map = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 15
    });
    const initialMarker = new naver.maps.Marker({
      position: new naver.maps.LatLng(37.3595704, 127.105399),
      map
    });
    mapRef.current = map;
  }, [isLoadScript]);
}
