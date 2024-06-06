import HomeButton from './HomeButton';

function PageNotFound() {
  return (
    <div className='text-amber-500 container mx-auto p-2 min-h-screen flex flex-col justify-center items-center'>
      <p className='py-4 text-center'>
        404 <br />
        There is no such page. <br />
        How did you even get here, huh?
      </p>
      <HomeButton />
    </div>
  );
}

export default PageNotFound;
