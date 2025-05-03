'use client';

import { useHighlight } from '@ub/highlighting';
import React, { useState } from &apos;react';

import { useUserPreferences } from '../contexts/UserPreferencesContext';

/**
 * Component for displaying and managing user preferences
 */
export const PreferencesPanel: React.FC = () => {
  const { preferences, updatePreferences, resetPreferences } = useUserPreferences();
  const { _showHighlights, setShowHighlights } = useHighlight();
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleParagraphNumbers = () => {
    updatePreferences({
      reader: {
        ...preferences.reader,
        showParagraphNumbers: !preferences.reader.showParagraphNumbers,
      },
    });
  };

  const handleFontSizeChange = (size: &apos;small' | &apos;medium' | &apos;large') => {
    updatePreferences({
      reader: {
        ...preferences.reader,
        fontSize: size,
      },
    });
  };

  const handleThemeChange = (theme: &apos;light' | &apos;dark' | &apos;system') => {
    updatePreferences({
      reader: {
        ...preferences.reader,
        theme: theme,
      },
    });
  };

  const handleResetPreferences = () => {
    resetPreferences();
  };

  return (
    <div className="preferences-panel">
      <button
        onClick={togglePanel}
        className="fixed bottom-4 right-4 rounded-full bg-blue-500 p-2 text-white shadow-lg hover:bg-blue-600"
        aria-label="Preferences"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Reader Preferences</h2>
              <button
                onClick={togglePanel}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={preferences.reader.showParagraphNumbers}
                    onChange={handleToggleParagraphNumbers}
                    className="form-checkbox size-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Show paragraph numbers</span>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={_showHighlights}
                    onChange={e => setShowHighlights(e.target.checked)}
                    className="form-checkbox size-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Show highlights</span>
                </label>
              </div>

              <div>
                <label className="mb-2 block text-gray-700">Font Size</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleFontSizeChange('small')}
                    className={`rounded px-4 py-2 ${
                      preferences.reader.fontSize === &apos;small'
                        ? &apos;bg-blue-500 text-white'
                        : &apos;bg-gray-200 text-gray-700'
                    }`}
                  >
                    Small
                  </button>
                  <button
                    onClick={() => handleFontSizeChange('medium')}
                    className={`rounded px-4 py-2 ${
                      preferences.reader.fontSize === &apos;medium'
                        ? &apos;bg-blue-500 text-white'
                        : &apos;bg-gray-200 text-gray-700'
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => handleFontSizeChange('large')}
                    className={`rounded px-4 py-2 ${
                      preferences.reader.fontSize === &apos;large'
                        ? &apos;bg-blue-500 text-white'
                        : &apos;bg-gray-200 text-gray-700'
                    }`}
                  >
                    Large
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-gray-700">Theme</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleThemeChange('light')}
                    className={`rounded px-4 py-2 ${
                      preferences.reader.theme === &apos;light'
                        ? &apos;bg-blue-500 text-white'
                        : &apos;bg-gray-200 text-gray-700'
                    }`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => handleThemeChange('dark')}
                    className={`rounded px-4 py-2 ${
                      preferences.reader.theme === &apos;dark'
                        ? &apos;bg-blue-500 text-white'
                        : &apos;bg-gray-200 text-gray-700'
                    }`}
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => handleThemeChange('system')}
                    className={`rounded px-4 py-2 ${
                      preferences.reader.theme === &apos;system'
                        ? &apos;bg-blue-500 text-white'
                        : &apos;bg-gray-200 text-gray-700'
                    }`}
                  >
                    System
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={handleResetPreferences}
                  className="text-red-500 hover:text-red-700"
                >
                  Reset to defaults
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreferencesPanel;
