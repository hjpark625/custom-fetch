import { useState, useCallback } from 'react';

function useToggle(initialState: boolean = false): [boolean, () => void] {
  const [isToggle, setIsToggle] = useState(initialState);
  const toggle = useCallback(() => setTimeout(() => setIsToggle((prev) => !prev), 1000), []);
  return [isToggle, toggle];
}

export { useToggle };
