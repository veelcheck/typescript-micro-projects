import { useState, useEffect } from 'react';

const getSavedValue = <Type>(key: string, initialValue: Type): Type => {
  // In case there is no room in localStorage or some version of browser doesn't support localStorage we try and catch any errors.
  try {
    const savedValue = localStorage.getItem(key);

    if (savedValue) return JSON.parse(savedValue);
  } catch (error) {
    console.error('Error accesing localStorage', error);
  }

  if (initialValue instanceof Function) return initialValue();
  return initialValue;
};

export const useLocalStorage = <Type>(key: string, initialValue: Type): [Type, (value: Type) => void] => {
  const [storedValue, setStoredValue] = useState<Type>(() => {
    // function version because we don't always want to  call JSON.parse (performance), we want it only once when the component loads.
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error setting localStorage', error);
    }
  }, [storedValue, key]);

  return [storedValue, setStoredValue];
};
