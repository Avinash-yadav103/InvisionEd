import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://localhost:5000/reading-status', {
      method: 'GET',
      cache: 'no-store' // Ensure we don't cache the response
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.error }, { status: response.status });
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error checking reading status:', error);
    return NextResponse.json({ error: 'Failed to check reading status' }, { status: 500 });
  }
}