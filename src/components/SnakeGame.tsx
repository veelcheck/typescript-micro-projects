import { useEffect, useState } from 'react';
import { useLocalStorage } from '../lib/hooks';
import GameBoard from './GameBoard';
import AliceComponent from './AliceComponent';
import HomeButton from './HomeButton';

function SnakeGame() {
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useLocalStorage<number>(
    'highestScore',
    0
  );
  const [gameOver, setGameOver] = useState(false);
  const [collision, setCollision] = useState('');

  const handleGameOver = (type: string) => {
    setGameOver(true);

    if (score > highestScore) {
      setHighestScore(score);
    }

    setCollision(type);
  };

  const handleResetgame = () => {
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver && e.key === 'Enter') {
        handleResetgame();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
  }, [gameOver]);

  return (
    <section className='text-amber-50 md:min-h-screen md:justify-center container mx-auto p-2 flex flex-col items-center text-center gap-2 mt-6'>
      <HomeButton />
      <h1 className='text-2xl md:text-3xl text-green-200 font-bold uppercase'>
        This is for Alice because she had birthday.
        <span className='text-red-300'> Again.</span>
      </h1>
      <AliceComponent />
      <div className='md:flex md:flex-row-reverse md:gap-14'>
        <div className='flex flex-row mt-20 md:flex-col gap-4 justify-center md:justify-start md:text-xl md:mt-6'>
          <p>Score: {score}</p>
          <p>Highest: {highestScore}</p>
          <button
            className='border rounded-sm px-2'
            onClick={handleResetgame}
            type='reset'>
            RESET
          </button>
        </div>
        {gameOver && (
          <p className='mt-6 md:text-3xl text-red-300 border px-4 py-6 border-red-300'>
            Game over!
            <br />
            {collision === 'wall'
              ? ' You hit the wall, dummy.'
              : ' You were trying to eat your own flesh, yuk.'}
          </p>
        )}{' '}
        {!gameOver && (
          <GameBoard
            score={score}
            setScore={setScore}
            onGameOver={(type: string) => handleGameOver(type)}
          />
        )}
      </div>
    </section>
  );
}

export default SnakeGame;
