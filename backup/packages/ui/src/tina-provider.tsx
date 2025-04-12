import React, { createContext, useContext } from 'react';
import { client } from '../tina/client';

// Create a context for the TinaCMS client
const TinaCMSContext = createContext<any>(null);

// Custom hook to use the TinaCMS client
export function useTina() {
  const context = useContext(TinaCMSContext);
  if (context === null) {
    throw new Error('useTina must be used within a TinaCMSProvider');
  }
  return context;
}

interface TinaCMSProviderProps {
  children: React.ReactNode;
}

// Provider component that makes the TinaCMS client available to any child component
export function TinaCMSProvider({ children }: TinaCMSProviderProps) {
  return <TinaCMSContext.Provider value={{ client }}>{children}</TinaCMSContext.Provider>;
}
