'use client';

import { useEffect } from &apos;react';

import { analyticsReporter, reportWebVitals } from '../lib/web-vitals';

/**
 * Component that initializes Web Vitals reporting
 * This is a client component that can be used in the app layout
 */
export function WebVitalsReporter(): null {
  useEffect(() => {
    reportWebVitals(analyticsReporter);
  }, []);

  return null;
}
