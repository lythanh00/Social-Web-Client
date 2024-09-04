import React, { createContext, ReactNode, useContext } from 'react';

// Define the type of the context value
interface ValueContextType {
  value: string;
}

// Create the context with a default value
const ValueContext = createContext<ValueContextType | undefined>(undefined);

interface ValueProviderProps {
  children: ReactNode;
  value: string;
}

// Create the provider component
export const ValueProvider: React.FC<ValueProviderProps> = ({ children, value }) => {
  return (
    <ValueContext.Provider value={{ value }}>
      {children}
    </ValueContext.Provider>
  );
};

// Custom hook to use the ValueContext
export const useValueContext = () => {
  const context = useContext(ValueContext);
  if (!context) {
    throw new Error('useValueContext must be used within a ValueProvider');
  }
  return context;
};