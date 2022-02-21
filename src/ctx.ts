import { createContext, useContext } from 'react';

export const GlobalContext = createContext<{
  theme?: string;
  setTheme?: (value: string) => void;
}>({});

export const GlobalContextProvide = GlobalContext.Provider;

export const useGlobalContext = () => useContext(GlobalContext);
