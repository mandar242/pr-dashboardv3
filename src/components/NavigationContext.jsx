import React, { createContext, useState, useContext } from 'react';

const NavigationContext = createContext();

export const useNavigationContext = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [activeCollection, setActiveCollection] = useState('amazon.aws');

  const setCollection = (collection) => {
    setActiveCollection(collection);
  };

  return (
    <NavigationContext.Provider value={{ activeCollection, setCollection }}>
      {children}
    </NavigationContext.Provider>
  );
};
