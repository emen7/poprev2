'use client';

import React from 'react';
import { AppStateProvider } from '@ub-ecosystem/state-management';

/**
 * Example page demonstrating the use of the state management package
 */
export default function StateManagementExamplePage() {
  return (
    <div className="state-management-example-page">
      <h1 className="text-3xl font-bold mb-8 text-center">State Management Examples</h1>

      <AppStateProvider documentId="example-document">
        <div className="grid grid-cols-1 gap-8 max-w-6xl mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Navigation Example</h2>
            <p>
              The navigation example has been moved to the{' '}
              <a href="/navigation-example" className="text-blue-500 hover:underline">
                navigation example page
              </a>
              .
            </p>
          </div>
        </div>
      </AppStateProvider>
    </div>
  );
}
