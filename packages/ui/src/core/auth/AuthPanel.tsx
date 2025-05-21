/**
 * UB Ecosystem Authentication Panel
 * 
 * This component provides a user interface for authentication.
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../server/auth/AuthContext';
import { useStorage } from '../../../../server/storage/StorageContext';
import { AuthProvider } from '../../../../server/auth/types';
import { IconButton } from '../buttons/IconButton';
import './AuthPanel.css';

/**
 * Authentication panel props
 */
export interface AuthPanelProps {
  /**
   * Whether to show the panel
   */
  isOpen?: boolean;
  
  /**
   * Callback when the panel is closed
   */
  onClose?: () => void;
  
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Authentication panel component
 */
export const AuthPanel: React.FC<AuthPanelProps> = ({
  isOpen = false,
  onClose,
  className = '',
}) => {
  // Get auth context
  const { 
    authMode, 
    user, 
    isAuthenticated, 
    isLoading: authLoading,
    error: authError,
    signInWithProvider,
    signInWithEmailPassword,
    signInWithBiometric,
    signOut,
    registerWithEmailPassword,
    switchToLocalMode,
    isBiometricAvailable,
    clearError: clearAuthError,
  } = useAuth();
  
  // Get storage context
  const {
    syncLocalToCloud,
    isLoading: storageLoading,
    error: storageError,
    clearError: clearStorageError,
  } = useStorage();
  
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  
  // Check if biometric authentication is available
  useEffect(() => {
    const checkBiometric = async () => {
      const available = await isBiometricAvailable();
      setBiometricAvailable(available);
    };
    
    checkBiometric();
  }, [isBiometricAvailable]);
  
  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      clearAuthError();
      clearStorageError();
    };
  }, [clearAuthError, clearStorageError]);
  
  // Handle sign in with provider
  const handleSignInWithProvider = async (provider: AuthProvider) => {
    try {
      await signInWithProvider(provider);
      await syncLocalToCloud();
      onClose?.();
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
    }
  };
  
  // Handle sign in with email and password
  const handleSignInWithEmailPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await signInWithEmailPassword(email, password);
      await syncLocalToCloud();
      onClose?.();
    } catch (error) {
      console.error('Error signing in with email/password:', error);
    }
  };
  
  // Handle sign in with biometric
  const handleSignInWithBiometric = async () => {
    try {
      await signInWithBiometric();
      await syncLocalToCloud();
      onClose?.();
    } catch (error) {
      console.error('Error signing in with biometric:', error);
    }
  };
  
  // Handle register with email and password
  const handleRegisterWithEmailPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await registerWithEmailPassword(email, password, displayName);
      await syncLocalToCloud();
      onClose?.();
    } catch (error) {
      console.error('Error registering with email/password:', error);
    }
  };
  
  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut();
      onClose?.();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  // Handle switch to local mode
  const handleSwitchToLocalMode = async () => {
    try {
      await switchToLocalMode();
      onClose?.();
    } catch (error) {
      console.error('Error switching to local mode:', error);
    }
  };
  
  // Toggle between sign in and register forms
  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    clearAuthError();
  };
  
  // Render loading state
  if (authLoading || storageLoading) {
    return (
      <div className={`auth-panel ${isOpen ? 'auth-panel--open' : ''} ${className}`}>
        <div className="auth-panel__content">
          <h2 className="auth-panel__title">Loading...</h2>
          <div className="auth-panel__loading">
            <div className="auth-panel__spinner"></div>
          </div>
        </div>
      </div>
    );
  }
  
  // Render authenticated state
  if (isAuthenticated) {
    return (
      <div className={`auth-panel ${isOpen ? 'auth-panel--open' : ''} ${className}`}>
        <div className="auth-panel__content">
          <h2 className="auth-panel__title">Welcome, {user?.displayName}</h2>
          
          <div className="auth-panel__user-info">
            <p>You are signed in with {user?.provider}</p>
            <p>Email: {user?.email}</p>
          </div>
          
          <div className="auth-panel__actions">
            <button 
              className="auth-panel__button auth-panel__button--primary"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
            
            <button 
              className="auth-panel__button auth-panel__button--secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Render local mode state
  if (authMode === 'local') {
    return (
      <div className={`auth-panel ${isOpen ? 'auth-panel--open' : ''} ${className}`}>
        <div className="auth-panel__content">
          <h2 className="auth-panel__title">You're in Local Mode</h2>
          
          <div className="auth-panel__info">
            <p>
              You're currently using the UB Ecosystem in local mode. Your data is stored only on this device.
            </p>
            <p>
              Sign in to sync your data across devices and access additional features.
            </p>
          </div>
          
          <div className="auth-panel__provider-buttons">
            <button 
              className="auth-panel__provider-button auth-panel__provider-button--google"
              onClick={() => handleSignInWithProvider('google')}
            >
              Sign in with Google
            </button>
            
            <button 
              className="auth-panel__provider-button auth-panel__provider-button--apple"
              onClick={() => handleSignInWithProvider('apple')}
            >
              Sign in with Apple
            </button>
            
            <button 
              className="auth-panel__provider-button auth-panel__provider-button--facebook"
              onClick={() => handleSignInWithProvider('facebook')}
            >
              Sign in with Facebook
            </button>
            
            {biometricAvailable && (
              <button 
                className="auth-panel__provider-button auth-panel__provider-button--biometric"
                onClick={handleSignInWithBiometric}
              >
                Sign in with Fingerprint
              </button>
            )}
          </div>
          
          <div className="auth-panel__divider">
            <span>or</span>
          </div>
          
          {isRegistering ? (
            <form className="auth-panel__form" onSubmit={handleRegisterWithEmailPassword}>
              <h3 className="auth-panel__form-title">Create an Account</h3>
              
              <div className="auth-panel__form-group">
                <label htmlFor="displayName">Name</label>
                <input
                  type="text"
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>
              
              <div className="auth-panel__form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="auth-panel__form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              
              {authError && (
                <div className="auth-panel__error">
                  {authError.message}
                </div>
              )}
              
              <button 
                type="submit" 
                className="auth-panel__button auth-panel__button--primary"
              >
                Create Account
              </button>
              
              <button 
                type="button"
                className="auth-panel__button auth-panel__button--link"
                onClick={toggleForm}
              >
                Already have an account? Sign in
              </button>
            </form>
          ) : (
            <form className="auth-panel__form" onSubmit={handleSignInWithEmailPassword}>
              <h3 className="auth-panel__form-title">Sign In</h3>
              
              <div className="auth-panel__form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="auth-panel__form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {authError && (
                <div className="auth-panel__error">
                  {authError.message}
                </div>
              )}
              
              <button 
                type="submit" 
                className="auth-panel__button auth-panel__button--primary"
              >
                Sign In
              </button>
              
              <button 
                type="button"
                className="auth-panel__button auth-panel__button--link"
                onClick={toggleForm}
              >
                Don't have an account? Create one
              </button>
            </form>
          )}
          
          <div className="auth-panel__actions">
            <button 
              className="auth-panel__button auth-panel__button--secondary"
              onClick={onClose}
            >
              Continue in Local Mode
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Fallback (should not happen)
  return null;
};

export default AuthPanel;
