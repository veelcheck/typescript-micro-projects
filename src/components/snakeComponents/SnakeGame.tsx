import { useState } from 'react';
import { useLocalStorage } from '../../lib/hooks';
import GameBoard from './GameBoard';

function SnakeGame() {
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useLocalStorage<number>(
    'highestScore',
    0
  );
  const [gameOver, setGameOver] = useState(false);
  const [collision, setCollision] = useState('');

  return (
    <section className='text-white'>
      <h1>This is for Alice because she had birthday. Again.</h1>
      <h2>Dworcowa robi węża.</h2>
      <div>
        <p>Score: {score}</p>
        <p>Highest score: {highestScore}</p>
        {gameOver && (
          <p>
            Game over! $
            {collision === 'wall'
              ? 'You hit the wall, dummy.'
              : 'You were trying to eat your own flesh, yuk.'}
          </p>
        )}{' '}
        {!gameOver && <GameBoard />}
      </div>
    </section>
  );
}

export default SnakeGame;
