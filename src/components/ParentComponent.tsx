import { useState } from 'react';
import ChildComponent from './ChildComponent';
import HomeButton from './HomeButton';

function ParentComponent() {
  const [dataFromChild, setDataFromChild] = useState('');

  const handleData = (data: string) => {
    setDataFromChild(data);
  };

  return (
    <section className='text-amber-500 container mx-auto p-2 min-h-screen flex flex-col justify-evenly md:justify-center items-center text-xl text-center'>
      <h2 className='text-2xl text-amber-200 text-center'>
        The PARENT is up here.
      </h2>
      <p>There is no escape, the parent needs to listen to this:</p>
      <p className='min-h-20 flex items-center text-teal-100 '>
        {dataFromChild}
      </p>
      <ChildComponent sendDataToParent={handleData} />
      <HomeButton />
    </section>
  );
}

export default ParentComponent;
