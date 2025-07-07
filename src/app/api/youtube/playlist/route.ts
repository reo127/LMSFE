import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { playlistUrl } = await req.json();

    if (!playlistUrl) {
      return NextResponse.json({ error: 'Playlist URL is required' }, { status: 400 });
    }

    // Extract playlist ID from the URL
    const url = new URL(playlistUrl);
    const playlistId = url.searchParams.get('list');

    if (!playlistId) {
      return NextResponse.json({ error: 'Invalid YouTube playlist URL' }, { status: 400 });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'YouTube API key is not configured' }, { status: 500 });
    }

    const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${apiKey}`;

    const youtubeResponse = await fetch(youtubeApiUrl);
    
    if (!youtubeResponse.ok) {
      const errorData = await youtubeResponse.json();
      console.error('YouTube API error:', errorData);
      return NextResponse.json({ error: 'Failed to fetch playlist items from YouTube API' }, { status: youtubeResponse.status });
    }

    const data = await youtubeResponse.json();

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('Error processing playlist URL or fetching from YouTube API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}