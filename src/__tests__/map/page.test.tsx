import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import NaverMap from '@/components/NaverMap/NaverMap';

describe('naverMap', () => {
  const { container } = render(<NaverMap />);
  it('renders naver map', () => {
    expect(container).toBeInTheDocument();
  });
});
