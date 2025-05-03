// Using type definition only to avoid direct import
type ReportHandler = (metric: {
  name: string;
  value: number;
  delta: number;
  id: string;
  navigationType: string;
}) => void;

/**
 * Web Vitals reporting function
 *
 * This function reports Core Web Vitals metrics to the specified handler
 * Metrics include:
 * - CLS (Cumulative Layout Shift)
 * - FID (First Input Delay)
 * - LCP (Largest Contentful Paint)
 * - FCP (First Contentful Paint)
 * - TTFB (Time to First Byte)
 *
 * @param onPerfEntry - The handler function to report metrics to
 */
export const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
  if (onPerfEntry && typeof onPerfEntry === 'function' && typeof window !== 'undefined') {
    // Only load web-vitals when in the browser and we have a reporting function
    // Dynamic import of web-vitals is handled at runtime
    // The module will be loaded from node_modules
    Promise.all([
      import('web-vitals').then(({ onCLS }) => onCLS(onPerfEntry)),
      import('web-vitals').then(({ onFID }) => onFID(onPerfEntry)),
      import('web-vitals').then(({ onFCP }) => onFCP(onPerfEntry)),
      import('web-vitals').then(({ onLCP }) => onLCP(onPerfEntry)),
      import('web-vitals').then(({ onTTFB }) => onTTFB(onPerfEntry)),
    ]).catch(error => {
      // eslint-disable-next-line no-console
      console.error('Error loading web-vitals:', error);
    });
  }
};

/**
 * Analytics reporter for Web Vitals
 *
 * This function sends Web Vitals metrics to an analytics endpoint
 * It can be customized to send data to any analytics service
 *
 * @param metric - The Web Vitals metric to report
 */
export const analyticsReporter: ReportHandler = metric => {
  // Log metrics to console in development
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(metric);
  }

  // In production, you would send these metrics to your analytics service
  // Example implementation for sending to a custom endpoint:
  if (process.env.NODE_ENV === 'production') {
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      id: metric.id,
      delta: metric.delta,
      navigationType: metric.navigationType,
    });

    // Use sendBeacon if available, falling back to fetch
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/vitals', body);
    } else {
      fetch('/api/vitals', {
        body,
        method: 'POST',
        keepalive: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch(() => {
        // Silent catch - we don't want to break the user experience if analytics fails
      });
    }
  }
};
