'use client';

import React from 'react';

import { useUserPreferences } from '../../contexts/UserPreferencesContext';

/**
 * Test page for user preferences
 */
export default function TestPreferencesPage() {
  const { preferences, updatePreferences, resetPreferences } = useUserPreferences();

  const toggleParagraphNumbers = () => {
    updatePreferences({
      reader: {
        ...preferences.reader,
        showParagraphNumbers: !preferences.reader.showParagraphNumbers,
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Preferences Test</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Preferences</h2>

        <div className="mb-4">
          <div className="font-medium">Show Paragraph Numbers:</div>
          <div className="ml-4">{preferences.reader.showParagraphNumbers ? 'Yes' : 'No'}</div>
        </div>

        <div className="mb-4">
          <div className="font-medium">Font Size:</div>
          <div className="ml-4">{preferences.reader.fontSize}</div>
        </div>

        <div className="mb-4">
          <div className="font-medium">Theme:</div>
          <div className="ml-4">{preferences.reader.theme}</div>
        </div>

        <div className="mb-4">
          <div className="font-medium">TTS Settings:</div>
          <div className="ml-4">
            <div>Voice ID: {preferences.reader.tts.voiceId || 'Default'}</div>
            <div>Rate: {preferences.reader.tts.rate}</div>
            <div>Pitch: {preferences.reader.tts.pitch}</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Test Controls</h2>

        <div className="flex flex-col space-y-4">
          <button
            onClick={toggleParagraphNumbers}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Toggle Paragraph Numbers
          </button>

          <button
            onClick={resetPreferences}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Reset All Preferences
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Sample Paragraphs</h2>

        <div className="ub-paragraph mb-4">
          {preferences.reader.showParagraphNumbers && (
            <span className="ub-paragraph-number">1</span>
          )}
          <span className="ub-paragraph-text">
            This is a sample paragraph. The paragraph number should be visible or hidden based on
            your preference setting.
          </span>
        </div>

        <div className="ub-paragraph mb-4">
          {preferences.reader.showParagraphNumbers && (
            <span className="ub-paragraph-number">2</span>
          )}
          <span className="ub-paragraph-text">
            This is another sample paragraph. Try toggling the paragraph numbers to see the effect.
          </span>
        </div>
      </div>
    </div>
  );
}
