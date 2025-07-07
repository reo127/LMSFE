"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddCommunityCourseForm() {
  const [playlistUrl, setPlaylistUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement logic to fetch playlist data and add the course

    try {
      const response = await fetch('/api/youtube/playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playlistUrl }),
      });
      const data = await response.json();
      console.log('API Response:', data);
    } catch (error) {
      console.error('Error submitting playlist URL:', error);
    }
    // Reset form
    setPlaylistUrl('');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add Community Course</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="playlistUrl">YouTube Playlist URL</Label>
            <Input
              id="playlistUrl"
              type="url"
              placeholder="Enter YouTube playlist URL"
              value={playlistUrl}
              onChange={(e) => setPlaylistUrl(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Add Course</Button>
        </form>
      </CardContent>
    </Card>
  );
}