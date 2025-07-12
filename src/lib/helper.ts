import axios from 'axios';
import type { Lesson } from './mock-data';

export async function fetchYoutubePlaylist(playlistId: string): Promise<Lesson[]> {
    const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
    );

    return response.data.items.map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        duration: '', // YouTube API v3 doesn't provide duration in playlistItems
        videoId: item.snippet.resourceId.videoId
    }));
}
