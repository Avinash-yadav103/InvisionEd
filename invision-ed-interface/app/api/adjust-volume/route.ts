import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const volume = searchParams.get('volume');
    
    if (!volume) {
      return NextResponse.json({ error: 'Volume parameter is required' }, { status: 400 });
    }
    
    const response = await fetch(`http://localhost:5000/adjust-volume?volume=${volume}`, {
      method: 'GET',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.error }, { status: response.status });
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error adjusting volume:', error);
    return NextResponse.json({ error: 'Failed to adjust volume' }, { status: 500 });
  }
}