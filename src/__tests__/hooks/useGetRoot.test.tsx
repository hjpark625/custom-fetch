import axios from 'axios';
import { render, renderHook, waitFor } from '@testing-library/react';
import DetailView from '@/components/Detail/View';
import { useGetRoot } from '@/hooks/useGetRoot';
import mood51_2 from '@/__mocks__/mood51-2.json';
import mockAxios from '@/__mocks__/axios';

describe('DetailView', () => {
  it('getRootMessage', async () => {
    const storename = { storename: 'mood51-2' };

    const { result, rerender, unmount } = renderHook(() => useGetRoot(storename));

    await waitFor(() => {
      console.log(result.current);
      expect(result.current.data).toBeDefined();
      expect(result.current.geohash).toBeDefined();
    });
  });
});

// describe('DetailView', () => {
//   const renderComponent = () => render(<DetailView storename="mood51-2" />);

//   it('renders with detail data', async () => {
//     const { getByText, getByRole } = renderComponent();

//     // mockAxios.get.mockResolvedValue({ data: mood51_2 });

//     await waitFor(() => {
//       expect(getByText('mood51-2')).toBeInTheDocument();
//       expect(getByRole('img')).toBeInTheDocument();
//     });
//   });
// });
