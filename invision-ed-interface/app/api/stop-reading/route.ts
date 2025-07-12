import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://localhost:5000/stop-reading', {
      method: 'GET',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.error }, { status: response.status });
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error stopping text reading:', error);
    return NextResponse.json({ error: 'Failed to stop reading' }, { status: 500 });
  }
}