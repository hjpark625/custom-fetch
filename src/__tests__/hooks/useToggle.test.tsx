import { renderHook, act, waitFor } from '@testing-library/react';

import { useToggle } from '@/hooks/useToggle';

it('isToggle', () => {
  const { result } = renderHook(() => useToggle());
  expect(result.current[0]).toBe(false);

  act(() => result.current[1]());

  waitFor(() => {
    expect(result.current[0]).toBe(true);
  });
});
