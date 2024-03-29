import { renderHook, render } from '@testing-library/react';
import { useInitNaverSdk } from '@/hooks/useInitNaverSdk';
import NaverMap from '@/components/NaverMap/NaverMap';

// jest.mock('@/hooks/useInitNaverSdk', () => {
//   return {
//     useInitNaverSdk: jest.fn(() => ({ isLoadScript: true }))
//   };
// });

describe('네이버지도', () => {
  // it('네이버지도 sdk 초기화', () => {
  //   renderHook(() => useInitNaverSdk());
  //   expect(useInitNaverSdk).toBeCalled();
  // });
  // it('네이버지도 생성 확인', () => {
  //   const {asFragment, getByText} = render(<NaverMap/>)
  // });
});
