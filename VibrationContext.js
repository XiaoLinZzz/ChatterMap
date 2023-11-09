import React, { createContext, useState, useContext, useCallback } from 'react';

const VibrationContext = createContext();

export const useVibration = () => useContext(VibrationContext);

export const VibrationProvider = ({ children }) => {
  const [vibrationEnabled, setVibrationEnabled] = useState(false);

  const switchVibration = useCallback(() => {
    setVibrationEnabled(prevState => {
      const newState = !prevState;

      console.log("Vibration state changed to:", newState);

      return newState;
    });
  }, []);

  return (
    <VibrationContext.Provider value={{ vibrationEnabled, switchVibration }}>
      {children}
    </VibrationContext.Provider>
  );
};
