import { useState } from 'react';
import ChildComponent from './ChildComponent';
import BackButton from './BackButton';

function ParentComponent() {
  const [dataFromChild, setDataFromChild] = useState('');

  const handleData = (data: string) => {
    setDataFromChild(data);
  };

  return (
    <section className='text-amber-500 min-h-screen flex flex-col justify-center items-center text-xl'>
      <h2 className='text-2xl text-amber-200'>The PARENT is up here.</h2>
      <p>There is no escape, the parent needs to listen to this:</p>
      <p className='min-h-20 flex items-center text-teal-100 '>
        {dataFromChild}
      </p>
      <ChildComponent sendDataToParent={handleData} />
      <BackButton />
    </section>
  );
}

export default ParentComponent;
