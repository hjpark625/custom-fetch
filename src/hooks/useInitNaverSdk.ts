'use client';
import { useEffect, useState } from 'react';

const useInitNaverSdk = () => {
  const [isLoadScript, setIsLoadScript] = useState(false);

  useEffect(() => {
    if (window.naver) {
      setIsLoadScript(true);
      return;
    }
    const naverScript = document.createElement('script');
    naverScript.async = true;
    naverScript.type = 'text/javascript';
    naverScript.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAPS_KEY}&submodules=geocoder`;

    document.head.appendChild(naverScript);

    naverScript.onload = () => {
      if (window.naver) {
        setIsLoadScript(true);
        return;
      } else {
        setIsLoadScript(false);
        throw new Error('스크립트 초기화 실패');
      }
    };
  }, []);

  return { isLoadScript };
};

export { useInitNaverSdk };
