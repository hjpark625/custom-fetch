import { useState, useEffect } from 'react';

export function useAsyncCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(1);
    setCount(2);
    setCount(3);
  }, [setCount]);

  useEffect(() => {
    setTimeout(() => {
      setCount(1000);
    }, 1000);
  }, []);

  return {
    count
  };
}
