// Import directly from web-vitals package
import { ReportHandler, getCLS, getFID, getFCP, getLCP, getTTFB, Metric } from 'web-vitals';

// Use the Metric type from web-vitals package
export type WebVitalMetric = Metric;

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
    // Only report web-vitals when in the browser and we have a reporting function
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
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

/**
 * Function to report Web Vitals metrics from Next.js
 * This is exported and used in the app layout
 */
export function reportWebVitalsMetrics(metric: WebVitalMetric): void {
  analyticsReporter(metric);
}
