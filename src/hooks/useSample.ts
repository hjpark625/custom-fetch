import { useState } from 'react';

export function useSample() {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    setIsOpen
  };
}
