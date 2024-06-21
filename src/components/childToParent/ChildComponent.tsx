type ChildComponentProps = {
  sendDataToParent: (data: string) => void;
};

function ChildComponent({ sendDataToParent }: ChildComponentProps) {
  return (
    <div className='pt-4 border-t  border-dashed border-t-teal-100 flex flex-col py-8'>
      <h2 className='text-2xl '>This is the CHILD (component) talking back!</h2>
      <input
        placeholder='Type something...'
        className='bg-mint text-black placeholder:text-violet  mt-4 py-2 px-4 rounded-sm'
        onChange={({ target }) => sendDataToParent(target.value)}></input>
    </div>
  );
}

export default ChildComponent;
