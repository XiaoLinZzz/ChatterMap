import React, { createContext, useState, useContext } from 'react';

const HideTabContext = createContext();

export const useHideTab = () => {
  return useContext(HideTabContext);
};

export const HideTabProvider = ({ children }) => {
  const [hideTab, setHideTab] = useState('flex');

  return (
    <HideTabContext.Provider value={{ hideTab, setHideTab }}>
      {children}
    </HideTabContext.Provider>
  );
};