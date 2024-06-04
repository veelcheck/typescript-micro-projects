import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      <div className='text-white'>This will be a home page.</div>
      <Link
        className='text-white border'
        to='snake-for-alice'>
        snake
      </Link>
    </>
  );
}

export default App;
