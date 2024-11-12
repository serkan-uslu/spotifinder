import { useState, useEffect } from 'react';
import { SpotifyService } from '../services/spotifyApi';
import { getAccessTokenFromUrl } from '../services/spotifyAuth';
import { Song } from '../types';

export const useSpotify = () => {
  const [spotifyService, setSpotifyService] = useState<SpotifyService | null>(
    null
  );
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getAccessTokenFromUrl();
    if (token) {
      setSpotifyService(new SpotifyService(token));
    }
  }, []);

  useEffect(() => {
    const fetchSongs = async () => {
      if (!spotifyService) return;

      try {
        setLoading(true);
        const recommendations = await spotifyService.getRecommendations();
        setSongs(recommendations);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch songs');
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [spotifyService]);

  const likeSong = async (songId: string) => {
    if (!spotifyService) return;
    try {
      await spotifyService.saveSong(songId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to like song');
    }
  };

  return { songs, loading, error, likeSong };
};
