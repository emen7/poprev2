'use client';

import React, { useState } from 'react';
import { PullupProvider } from '../../components/pullup/PullupContext';
import { PullupDemoContent } from './PullupDemoContent';

/**
 * Pullup Demo Page
 * 
 * This page demonstrates the enhanced Google Maps-style pullup component
 * with snap points, swipe gestures, and search functionality.
 */
export default function PullupDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Enhanced Pullup Demo
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            This page demonstrates the enhanced Google Maps-style pullup component with the following features:
          </p>
          
          <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
            <li className="mb-2">Snap points (collapsed, half-expanded, fully-expanded)</li>
            <li className="mb-2">Swipe gestures for tab navigation</li>
            <li className="mb-2">Double-tap to cycle through snap points</li>
            <li className="mb-2">Tab content transitions</li>
            <li className="mb-2">Search functionality with "second reader" mode</li>
            <li className="mb-2">State persistence between sessions</li>
            <li className="mb-2">Visual indicators for snap points</li>
          </ul>
          
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-md">
            <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">
              Instructions
            </h3>
            <p className="text-blue-700 dark:text-blue-200">
              Interact with the pullup panel at the bottom of the screen. Try swiping between tabs,
              double-tapping the handle to cycle through snap points, and using the search functionality.
            </p>
          </div>
        </div>
        
        {/* Wrap the demo content in the PullupProvider */}
        <PullupProvider>
          <PullupDemoContent />
        </PullupProvider>
      </div>
    </div>
  );
}
