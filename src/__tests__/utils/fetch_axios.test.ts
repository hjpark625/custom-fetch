import { getDetail, getDetailFetch } from '@/utils/fetch_axios';
import { waitFor } from '@testing-library/react';
import mood51_2 from '../../__mocks__/mood51-2.json';
import braemar from '../../__mocks__/braemar.json';

jest.mock('../../utils/fetch_axios.ts', () => {
  return {
    getDetail: jest.fn().mockImplementation(() => ({ data: mood51_2 })),
    getDetailFetch: jest.fn().mockImplementation(() => ({ data: braemar }))
  };
});

describe('GetDetail', () => {
  //   it('should return detail Data', async () => {
  //     const detailData = await getDetail('mood51-2');
  //     await waitFor(() => {
  //       console.log(detailData);
  //       expect(detailData).toBeDefined();
  //     });
  //   });
  it('should return detail data by fetch API', async () => {
    const detailData = await getDetailFetch('mood51-2');

    await waitFor(() => {
      console.log(detailData);
      expect(detailData).toBeDefined();
    });
  });
});
