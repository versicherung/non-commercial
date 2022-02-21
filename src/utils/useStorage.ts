import { useEffect, useState } from 'react';
import { isSSR } from './is';

const getDefaultStorage = (key: string) => {
  if (!isSSR) {
    return localStorage.getItem(key);
  } else {
    return undefined;
  }
};

const useStorage = (
  key: string,
  defaultValue?: string
): [string | undefined, (s: string) => void, () => void] => {
  const [storedValue, setStoredValue] = useState(
    getDefaultStorage(key) || defaultValue
  );

  const setStorageValue = (value: string) => {
    if (!isSSR) {
      localStorage.setItem(key, value);
      if (value !== storedValue) {
        setStoredValue(value);
      }
    }
  };

  const removeStorage = () => {
    if (!isSSR) {
      localStorage.removeItem(key);
    }
  };

  useEffect(() => {
    const storageValue = localStorage.getItem(key);
    if (storageValue) {
      setStoredValue(storageValue);
    }
  }, []);

  return [storedValue, setStorageValue, removeStorage];
};

export default useStorage;
