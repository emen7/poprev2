'use client';

import React from 'react';
import { AppStateProvider } from '@ub-ecosystem/state-management';
import { NavigationExample, PullupExample, SelectionExample } from '@ub-ecosystem/state-management';

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
            <NavigationExample />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <PullupExample />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <SelectionExample />
          </div>
        </div>
      </AppStateProvider>
    </div>
  );
}
