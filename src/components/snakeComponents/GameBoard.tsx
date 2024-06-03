import { useEffect, useRef, useState } from 'react';

function GameBoard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const speed = 10;
  const [apple, setApple] = useState({ x: 100, y: 100 });
  const [snake, setSnake] = useState([
    { x: 100, y: 50 },
    { x: 95, y: 50 },
  ]);
  const [direction, setDirection] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    const drawSnake = () => {
      snake.forEach((snakePart) => {
        ctx.beginPath();
        ctx.rect(snakePart.x, snakePart.y, 14, 14);
        ctx.fillStyle = '#254336';
        ctx.fill();
        ctx.closePath();
      });
    };

    const drawApple = () => {
      ctx.beginPath();
      ctx.rect(apple.x, apple.y, 14, 14);
      ctx.fillStyle = '#FF0000';
      ctx.fill();
      ctx.closePath();
    };

    const moveSnake = () => {
      if (direction) {
        setSanake(prevSnake => {
          const newSnake = [...prevSnake];
          const snakeHead = { x: newSnake[0].x, y: newSnake[0].y };
        })
      }
    }

    const interval = setInterval(() => {
      ctx.clearRect(0,0, canvas.width, canvas.height)
      drawSnake()
      drawApple()
    }, 100)

    return () => {clearInterval(interval)}
  }, [snake, direction]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={750}
        height={420}
        className='bg-amber-50'
      />
    </div>
  );
}

export default GameBoard;
