import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // Get the path parameter from the query string
    const searchParams = request.nextUrl.searchParams;
    const contentPath = searchParams.get('path');

    if (!contentPath) {
      return NextResponse.json(
        { error: 'Path parameter is required' },
        { status: 400 }
      );
    }

    // Construct the full path to the content file
    const filePath = path.join(process.cwd(), 'content', contentPath);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `File not found: ${contentPath}` },
        { status: 404 }
      );
    }

    // Read the file content
    const content = fs.readFileSync(filePath, 'utf-8');

    // Return the content
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/markdown',
      },
    });
  } catch (error) {
    console.error('Error reading content file:', error);
    return NextResponse.json(
      { error: 'Failed to read content file' },
      { status: 500 }
    );
  }
}