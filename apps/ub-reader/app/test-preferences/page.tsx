'use client';

import React from &apos;react';

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
      <h1 className="mb-6 text-3xl font-bold">User Preferences Test</h1>

      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Current Preferences</h2>

        <div className="mb-4">
          <div className="font-medium">Show Paragraph Numbers:</div>
          <div className="ml-4">{preferences.reader.showParagraphNumbers ? &apos;Yes' : &apos;No'}</div>
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
            <div>Voice ID: {preferences.reader.tts.voiceId || &apos;Default'}</div>
            <div>Rate: {preferences.reader.tts.rate}</div>
            <div>Pitch: {preferences.reader.tts.pitch}</div>
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Test Controls</h2>

        <div className="flex flex-col space-y-4">
          <button
            onClick={toggleParagraphNumbers}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Toggle Paragraph Numbers
          </button>

          <button
            onClick={resetPreferences}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Reset All Preferences
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Sample Paragraphs</h2>

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
