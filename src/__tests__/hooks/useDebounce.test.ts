import { useEffect, useState } from 'react';
import { renderHook } from '@testing-library/react';
import { useDebounce } from '@/hooks/useDebounce';

describe('custom hooks test', () => {
  it('should return debounced value', () => {
    const value = 'test';
    const value2 = 'test2';
    const delay = 1000;
    const { result, unmount, rerender } = renderHook(() => useDebounce(value, delay));

    rerender(() => useDebounce(value2, delay));

    const debouncedValue = result.current;
    expect(debouncedValue).toBe(value);
  });

  it('should return state value', () => {
    const { result } = renderHook(() => {
      const [name, setName] = useState('');
      useEffect(() => {
        setName('Alice');
      }, []);
      return name;
    });
    const name = result.current;
    expect(name).toBe('Alice');
  });
});
