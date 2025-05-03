import { ExtendedUserPreferences } from '@ub-ecosystem/config';
import { ReactNode } from 'react';
interface ExtendedUserPreferencesContextType {
    preferences: ExtendedUserPreferences;
    updatePreferences: (preferences: Partial<ExtendedUserPreferences>) => void;
    resetPreferences: () => void;
}
/**
 * Hook to access extended user preferences
 */
export declare function useExtendedUserPreferences(): ExtendedUserPreferencesContextType;
interface ExtendedUserPreferencesProviderProps {
    children: ReactNode;
}
/**
 * Provider component for extended user preferences
 */
export declare function ExtendedUserPreferencesProvider({ children, }: ExtendedUserPreferencesProviderProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=ExtendedUserPreferencesContext.d.ts.map