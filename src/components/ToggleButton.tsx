'use client';
import { useToggle } from '@/hooks/useToggle';

function ToggleButton({ initial = false }: { initial: boolean }) {
  const [isToggle, toggle] = useToggle(initial);

  return (
    <button type="button" onClick={toggle}>
      {isToggle ? 'ON' : 'OFF'}
    </button>
  );
}

export default ToggleButton;
