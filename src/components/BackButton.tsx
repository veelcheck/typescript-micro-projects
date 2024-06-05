import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  return (
    <div className='px-2 text-amber-50 border rounded-md'>
      <button
        onClick={goBack}
        aria-label='Go Back'>
        Back
      </button>
    </div>
  );
}

export default BackButton;
