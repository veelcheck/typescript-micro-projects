import { useState } from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
  const [dataFromChild, setDataFromChild] = useState('');

  const handleData = (data: string) => {
    setDataFromChild(data);
  };

  return (
    <div className='text-white min-h-screen flex flex-col justify-center items-center text-xl'>
      <h2 className='text-2xl '>The PARENT is up here.</h2>
      <p>Pleasent or not, the parent hears this:</p>
      <p className='min-h-20 flex items-center'>{dataFromChild}</p>
      <ChildComponent sendDataToParent={handleData} />
    </div>
  );
}

export default ParentComponent;
