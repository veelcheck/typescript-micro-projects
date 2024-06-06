import { useNavigate } from 'react-router-dom';

function HomeButton() {
  const navigate = useNavigate();

  const goHome = () => navigate('/');
  return (
    <button
      onClick={goHome}
      className='px-2 pb-1 text-amber-50 border rounded-md'
      aria-label='Go Home'>
      Home
    </button>
  );
}

export default HomeButton;
