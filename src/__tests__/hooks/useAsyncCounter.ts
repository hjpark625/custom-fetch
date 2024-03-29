import { useAsyncCounter } from '@/hooks/useAsyncCounter';
import { renderHook, waitFor } from '@testing-library/react';

it('async testing', async () => {
  const { result } = renderHook(() => useAsyncCounter());

  await waitFor(() => {
    expect(result.current.count).toBe(1000);
  });
});
