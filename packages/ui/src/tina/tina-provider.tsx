import React, { createContext, useContext } from 'react';
// Note: This is a temporary solution until the proper import path is established
// We're creating a mock client to avoid import issues
const client = {
  // Mock implementation of the TinaCMS client
  request: async ({ query, variables }: any) => {
    console.warn(
      'Mock TinaCMS client is being used. This should be replaced with the actual client.'
    );
    return { data: {} };
  },
  queries: {
    post: {},
    scientific: {},
    lectionary: {},
    ubgems: {},
    ubcatechism: {},
    postConnection: {},
    scientificConnection: {},
    lectionaryConnection: {},
    ubgemsConnection: {},
    ubcatechismConnection: {},
  },
};

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
