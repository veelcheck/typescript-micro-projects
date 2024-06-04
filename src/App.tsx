import { Link } from 'react-router-dom';

const linkStyle = 'bg-amber-50 px-4 py-1 ';
const listItemStyle = 'flex flex-col w-40 rounded-sm';

function App() {
  return (
    <section className='container p-2 mx-auto font-mono text-center mt-6'>
      <h1 className='text-amber-50 uppercase font-bold '>
        Small projects to practice TypeScript
      </h1>
      <ol className='flex flex-col gap-4 mt-4 items-center'>
        <li className={listItemStyle}>
          <Link
            className={linkStyle}
            to='todo'>
            Todo App
          </Link>
        </li>
        <li className={listItemStyle}>
          <Link
            className={linkStyle}
            to='snake-for-alice'>
            Snake Game
          </Link>
        </li>
      </ol>
    </section>
  );
}

export default App;
