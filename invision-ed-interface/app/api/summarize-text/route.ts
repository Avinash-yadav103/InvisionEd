import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Forward the request to Flask backend
    const response = await fetch('http://localhost:5000/summarize-text', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // Get response body as JSON
    const data = await response.json();
    
    // If Flask returned an error code, handle it
    if (!response.ok) {
      console.error('Backend error:', data);
      return NextResponse.json(
        { error: data.error || 'Failed to summarize text' },
        { status: response.status }
      );
    }
    
    // Return the successful response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error connecting to backend:', error);
    return NextResponse.json(
      { error: 'Failed to connect to summarization service' },
      { status: 500 }
    );
  }
}