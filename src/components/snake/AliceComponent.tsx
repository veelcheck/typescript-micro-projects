import { useEffect, useState, useRef } from 'react';

function AliceComponent() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [revealedText, setRevealedText] = useState('');

  const textToReveal = 'Ssssssss...';
  const timeoutRef = useRef<number | null>(null);

  const handleButtonClick = () => {
    setShowParagraph((prevState) => !prevState);
    setRevealedText('');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    if (showParagraph) {
      let currentIndex = 0;

      const revealText = () => {
        if (currentIndex < textToReveal.length) {
          currentIndex += 1;
          setRevealedText(
            (prevText) => prevText + textToReveal[currentIndex - 1]
          );

          timeoutRef.current = window.setTimeout(revealText, 200);
        } else {
          clearTimeout(timeoutRef.current as number);
          timeoutRef.current = null;
        }
      };

      // Initial delay to start revealing the text
      timeoutRef.current = window.setTimeout(revealText, 200);
    } else {
      setRevealedText('');
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [showParagraph]);

  return (
    <div className=''>
      <p className='text-xs  md:text-2xl flex flex-col  md:flex-row gap-4 items-center'>
        If you are THE Alice in question, click the button.
        <button
          className='bg-gradient-to-r from-green-400 to-blue-500 p-2 md:px-4 rounded-sm text-fuchsia-950 font-bold hover:px-3 md:hover:px-5'
          onClick={handleButtonClick}>
          This one
        </button>
      </p>
      {showParagraph && (
        <p className='text-green-200 md:text-3xl md:my-4 md:pb-4 mt-20'>
          Dworcowa robi więża.{' '}
          <span className='text-red-200'>{revealedText}</span>
        </p>
      )}
    </div>
  );
}

export default AliceComponent;
