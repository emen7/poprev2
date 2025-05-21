/**
 * UB Ecosystem Authentication Context
 *
 * This context provides authentication state and methods to React components.
 * It supports publication-specific authentication configuration.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService, authService, createAuthService, AuthMode } from './AuthService';
import { User, AuthProvider as AuthProviderType, AuthError, AuthState } from './types';
import { AuthConfig, getAuthConfig } from './config';

/**
 * Authentication context interface
 */
interface AuthContextValue {
  // Auth state
  authMode: AuthMode;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;

  // Publication info
  publicationId: string;
  config: AuthConfig;

  // Auth methods
  signInWithProvider: (provider: AuthProviderType) => Promise<User>;
  signInWithEmailPassword: (email: string, password: string) => Promise<User>;
  signInWithBiometric: () => Promise<User>;
  signOut: () => Promise<void>;
  registerWithEmailPassword: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<User>;
  switchToLocalMode: () => Promise<void>;

  // Utility methods
  isBiometricAvailable: () => Promise<boolean>;
  clearError: () => void;

  // Cross-publication methods
  isProviderEnabled: (provider: AuthProviderType) => boolean;
  isEmailPasswordEnabled: () => boolean;
  isBiometricEnabled: () => boolean;
  isLocalModeEnabled: () => boolean;
  isSharedWithPublication: (publicationId: string) => boolean;
}

// Create the auth context
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Authentication provider props
 */
interface AuthProviderProps {
  children: React.ReactNode;
  service?: AuthService;
  publicationId?: string;
}

/**
 * Authentication provider component
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children, service, publicationId }) => {
  // Create service if not provided
  const authService = service || (publicationId ? createAuthService(publicationId) : authService);

  // Get publication ID and config
  const [currentPublicationId] = useState<string>(
    publicationId || (authService as any).publicationId || 'ub-reader'
  );
  const [config] = useState<AuthConfig>(getAuthConfig(currentPublicationId));

  // Auth state
  const [authMode, setAuthMode] = useState<AuthMode>(authService.getAuthMode());
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<AuthError | null>(null);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await authService.initialize();
        setAuthMode(authService.getAuthMode());
        setUser(authService.getCurrentUser());
      } catch (err) {
        console.error('Error initializing auth:', err);
        setError(err as AuthError);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [authService]);

  // Sign in with provider
  const signInWithProvider = async (provider: AuthProviderType): Promise<User> => {
    setIsLoading(true);
    setError(null);

    try {
      const user = await authService.signInWithProvider(provider);
      setAuthMode('authenticated');
      setUser(user);
      return user;
    } catch (err) {
      setError(err as AuthError);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in with email and password
  const signInWithEmailPassword = async (email: string, password: string): Promise<User> => {
    setIsLoading(true);
    setError(null);

    try {
      const user = await authService.signInWithEmailPassword(email, password);
      setAuthMode('authenticated');
      setUser(user);
      return user;
    } catch (err) {
      setError(err as AuthError);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in with biometric
  const signInWithBiometric = async (): Promise<User> => {
    setIsLoading(true);
    setError(null);

    try {
      const user = await authService.signInWithBiometric();
      setAuthMode('authenticated');
      setUser(user);
      return user;
    } catch (err) {
      setError(err as AuthError);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const signOut = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.signOut();
      setAuthMode('local');
      setUser(null);
    } catch (err) {
      setError(err as AuthError);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Register with email and password
  const registerWithEmailPassword = async (
    email: string,
    password: string,
    displayName: string
  ): Promise<User> => {
    setIsLoading(true);
    setError(null);

    try {
      const user = await authService.registerWithEmailPassword(email, password, displayName);
      setAuthMode('authenticated');
      setUser(user);
      return user;
    } catch (err) {
      setError(err as AuthError);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Switch to local mode
  const switchToLocalMode = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.switchToLocalMode();
      setAuthMode('local');
      setUser(null);
    } catch (err) {
      setError(err as AuthError);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Check if biometric authentication is available
  const isBiometricAvailable = async (): Promise<boolean> => {
    try {
      return await authService.isBiometricAvailable();
    } catch (err) {
      console.error('Error checking biometric availability:', err);
      return false;
    }
  };

  // Clear error
  const clearError = (): void => {
    setError(null);
  };

  // Cross-publication utility methods

  // Check if a provider is enabled
  const isProviderEnabled = (provider: AuthProviderType): boolean => {
    return config.enabledProviders.includes(provider);
  };

  // Check if email/password authentication is enabled
  const isEmailPasswordEnabled = (): boolean => {
    return config.enableEmailPassword;
  };

  // Check if biometric authentication is enabled
  const isBiometricEnabled = (): boolean => {
    return config.enableBiometric;
  };

  // Check if local mode is enabled
  const isLocalModeEnabled = (): boolean => {
    return config.enableLocalMode;
  };

  // Check if authentication is shared with another publication
  const isSharedWithPublication = (otherPublicationId: string): boolean => {
    return (
      config.mode === 'shared' &&
      config.crossPublication.enabled &&
      config.crossPublication.sharedPublications.includes(otherPublicationId)
    );
  };

  // Context value
  const value: AuthContextValue = {
    // Auth state
    authMode,
    user,
    isAuthenticated: authMode === 'authenticated' && user !== null,
    isLoading,
    error,

    // Publication info
    publicationId: currentPublicationId,
    config,

    // Auth methods
    signInWithProvider,
    signInWithEmailPassword,
    signInWithBiometric,
    signOut,
    registerWithEmailPassword,
    switchToLocalMode,

    // Utility methods
    isBiometricAvailable,
    clearError,

    // Cross-publication methods
    isProviderEnabled,
    isEmailPasswordEnabled,
    isBiometricEnabled,
    isLocalModeEnabled,
    isSharedWithPublication,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to use the auth context
 */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

/**
 * HOC to require authentication
 */
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  redirectToLogin: boolean = true
): React.FC<P> => {
  return (props: P) => {
    const { isAuthenticated, isLoading } = useAuth();

    // Show loading state
    if (isLoading) {
      return <div>Loading...</div>;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated && redirectToLogin) {
      // In a real implementation, this would use a router to redirect
      return <div>Please log in to access this page.</div>;
    }

    // Render the component if authenticated
    return <Component {...props} />;
  };
};
