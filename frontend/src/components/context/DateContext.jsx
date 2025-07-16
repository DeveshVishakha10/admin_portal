import React, { createContext, useContext, useState } from 'react';

const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDate2, setSelectedDate2] = useState('');

  return (
    <DateContext.Provider value={{
      selectedDate,
      setSelectedDate,
      selectedDate2,
      setSelectedDate2,
    }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDate = () => useContext(DateContext);
