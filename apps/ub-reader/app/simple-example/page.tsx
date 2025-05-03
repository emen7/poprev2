/**
 * Simple Example Page
 *
 * This page demonstrates a simple example without relying on the complex Reader component.
 */

&apos;use client';

import React from &apos;react';

export default function SimpleExamplePage() {
  return (
    <div className="simple-example">
      <h1>Simple Example</h1>
      <p>This is a simple example page that doesn&apos;t rely on the complex Reader component.</p>

      <div className="example-container">
        <div className="example-header">
          <button className="example-button">
            <span>☰</span> Menu
          </button>
          <h2>Example Header</h2>
          <button className="example-button">
            <span>⚙️</span> Settings
          </button>
        </div>

        <div className="example-content">
          <p>This example demonstrates the basic structure of the enhanced Reader component:</p>
          <ul>
            <li>A header with navigation and settings buttons</li>
            <li>A main content area</li>
            <li>Slide-in panels for navigation and settings</li>
          </ul>
        </div>
      </div>

      <style>{`
        .simple-example {
          padding: 2rem;
          font-family:
            system-ui,
            -apple-system,
            sans-serif;
        }

        .example-container {
          border: 1px solid #ccc;
          border-radius: 8px;
          overflow: hidden;
          margin-top: 2rem;
        }

        .example-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background-color: #f0f0f0;
          border-bottom: 1px solid #ccc;
        }

        .example-button {
          background: none;
          border: none;
          padding: 0.5rem;
          cursor: pointer;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .example-button:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }

        .example-content {
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}
