import { useSample } from '@/hooks/useSample';
import { render, renderHook } from '@testing-library/react';

it('isOpen의 초깃값은 false', () => {
  const { result } = renderHook(() => useSample());
  expect(result.current.isOpen).toBe(false);
});
