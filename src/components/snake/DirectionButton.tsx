import { ReactNode } from 'react';

type Direction = 'left' | 'up' | 'down' | 'right';

type DirectionButtonProps = {
  direction: Direction;
  setDirection: (direction: Direction) => void;
  children: ReactNode;
};

function DirectionButton({
  direction,
  setDirection,
  children,
}: DirectionButtonProps) {
  return (
    <button
      className='border-4 size-12 rounded-full '
      onClick={() => setDirection(direction)}>
      {children}
    </button>
  );
}

export default DirectionButton;
