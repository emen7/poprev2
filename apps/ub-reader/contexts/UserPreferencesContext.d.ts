import { UserPreferences } from '@ub-ecosystem/config';
import { ReactNode } from 'react';
interface UserPreferencesContextType {
    preferences: UserPreferences;
    updatePreferences: (preferences: Partial<UserPreferences>) => void;
    resetPreferences: () => void;
}
/**
 * Hook to access user preferences
 */
export declare function useUserPreferences(): UserPreferencesContextType;
interface UserPreferencesProviderProps {
    children: ReactNode;
}
/**
 * Provider component for user preferences
 */
export declare function UserPreferencesProvider({ children }: UserPreferencesProviderProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=UserPreferencesContext.d.ts.map