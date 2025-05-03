'use client';

import React from &apos;react';

import { ReferenceExample } from '../../components/references';

/**
 * Reference Example Client Component
 *
 * This is a client component that renders the ReferenceExample.
 * It's separated from the page component because it uses client-side features.
 */
export default function ReferenceExampleClient() {
  return (
    <div className="reference-example-container">
      <ReferenceExample />
    </div>
  );
}
