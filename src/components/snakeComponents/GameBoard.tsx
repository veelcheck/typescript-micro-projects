import React, { useEffect, useRef, useState } from 'react';
import DirectionButton from './DirectionButton';

type GameBoardProps = {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  onGameOver: (reason: string) => void;
};

const GameBoard: React.FC<GameBoardProps> = ({
  score,
  setScore,
  onGameOver,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const speed = 10;
  const [apple, setApple] = useState({ x: 100, y: 100 });
  const [snake, setSnake] = useState([
    { x: 100, y: 50 },
    { x: 95, y: 50 },
  ]);
  const [direction, setDirection] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext('2d');

    const drawSnake = () => {
      if (ctx) {
        snake.forEach((snakePart) => {
          ctx.beginPath();
          ctx.rect(snakePart.x, snakePart.y, 14, 14);
          ctx.fillStyle = '#254336';
          ctx.fill();
          ctx.closePath();
        });
      }
    };

    const drawApple = () => {
      if (ctx) {
        ctx.beginPath();
        ctx.rect(apple.x, apple.y, 14, 14);
        ctx.fillStyle = '#FF0000';
        ctx.fill();
        ctx.closePath();
      }
    };

    const moveSnake = () => {
      if (direction) {
        setSnake((prevSnake) => {
          const newSnake = [...prevSnake];
          const snakeHead = { x: newSnake[0].x, y: newSnake[0].y };

          for (let i = newSnake.length - 1; i > 0; i--) {
            newSnake[i].x = newSnake[i - 1].x;
            newSnake[i].y = newSnake[i - 1].y;
          }

          switch (direction) {
            case 'right':
              snakeHead.x += speed;
              break;
            case 'left':
              snakeHead.x -= speed;
              break;
            case 'up':
              snakeHead.y -= speed;
              break;
            case 'down':
              snakeHead.y += speed;
              break;
            default:
              break;
          }

          newSnake[0] = snakeHead;
          handleAppleCollision(newSnake);
          handleWallCollision(snakeHead);
          handleBodyCollision(newSnake);

          return newSnake;
        });
      }
    };

    const handleAppleCollision = (newSnake: typeof snake) => {
      const snakeHead = newSnake[0];

      if (snakeHead.x === apple.x && snakeHead.y === apple.y) {
        setScore((prevScore) => prevScore + 1);
        setApple({
          x: Math.floor((Math.random() * canvas!.width) / speed) * speed,
          y: Math.floor((Math.random() * canvas!.height) / speed) * speed,
        });

        const newSegment = {
          x: newSnake[newSnake.length - 1].x,
          y: newSnake[newSnake.length - 1].y,
        };

        newSnake.push(newSegment);
      }
    };

    const handleWallCollision = (snakeHead: (typeof snake)[0]) => {
      if (
        snakeHead.x >= canvas!.width ||
        snakeHead.x < 0 ||
        snakeHead.y >= canvas!.height ||
        snakeHead.y < 0
      ) {
        onGameOver('wall');
      }
    };

    const handleBodyCollision = (newSnake: typeof snake) => {
      const snakeHead = newSnake[0];
      for (let i = 1; i < newSnake.length; i++) {
        if (snakeHead.x === newSnake[i].x && snakeHead.y === newSnake[i].y) {
          onGameOver('self');
        }
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          setDirection('right');
          break;
        case 'ArrowLeft':
          setDirection('left');
          break;
        case 'ArrowUp':
          setDirection('up');
          break;
        case 'ArrowDown':
          setDirection('down');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    const interval = setInterval(() => {
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        moveSnake();
        drawSnake();
        drawApple();
      }
    }, 100);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      clearInterval(interval);
    };
  }, [snake, direction, apple, score, setScore, onGameOver]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className='bg-amber-50 mt-4'
      />
      <div className='flex flex-col gap-2 mx-auto w-60 mt-6'>
        <div className='flex gap-6'>
          <DirectionButton
            direction='left'
            setDirection={setDirection}>
            L
          </DirectionButton>
          <DirectionButton
            direction='up'
            setDirection={setDirection}>
            U
          </DirectionButton>
        </div>
        <div className='flex gap-6 justify-end'>
          <DirectionButton
            direction='down'
            setDirection={setDirection}>
            D
          </DirectionButton>
          <DirectionButton
            direction='right'
            setDirection={setDirection}>
            R
          </DirectionButton>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
