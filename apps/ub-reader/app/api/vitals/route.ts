import { NextResponse } from 'next/server';

/**
 * API route to collect Web Vitals metrics
 *
 * This endpoint receives Web Vitals data sent from the client
 * and can process it for analytics purposes
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Log the metrics in development
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('Web Vitals:', body);
    }

    // In production, you would typically:
    // 1. Store the metrics in a database
    // 2. Send them to an analytics service
    // 3. Process them for performance monitoring

    // Example: You could send to Google Analytics, Datadog, etc.

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing Web Vitals:', error);
    return NextResponse.json({ error: 'Failed to process Web Vitals data' }, { status: 500 });
  }
}
