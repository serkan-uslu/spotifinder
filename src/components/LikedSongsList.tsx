import React from 'react';
import { Song } from '../types';
import { PlayIcon, PauseIcon, HeartIcon } from 'lucide-react';

interface LikedSongsListProps {
  songs: Song[];
}

export default function LikedSongsList({ songs }: LikedSongsListProps) {
  const [playingSongId, setPlayingSongId] = React.useState<string | null>(null);
  const [savingToSpotify, setSavingToSpotify] = React.useState<string | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const togglePlay = (song: Song) => {
    if (playingSongId === song.id) {
      audioRef.current?.pause();
      setPlayingSongId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(song.previewUrl!);
      audioRef.current.play();
      audioRef.current.addEventListener('ended', () => setPlayingSongId(null));
      setPlayingSongId(song.id);
    }
  };

  const saveSongToSpotify = async (songId: string) => {
    try {
      setSavingToSpotify(songId);
      const token = window.location.hash.substring(1).split('&')[0].split('=')[1];
      
      const response = await fetch(`https://api.spotify.com/v1/me/tracks`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: [songId] })
      });

      if (!response.ok) {
        throw new Error('Failed to save song to Spotify');
      }
    } catch (error) {
      console.error('Error saving song:', error);
    } finally {
      setSavingToSpotify(null);
    }
  };

  if (songs.length === 0) {
    return (
      <div className="bg-gray-800/50 rounded-lg p-8 text-center">
        <p className="text-gray-400">
          No liked songs yet. Start swiping to build your playlist!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
      {songs.map((song) => (
        <div
          key={song.id}
          className="bg-gray-800/50 rounded-lg overflow-hidden flex items-center gap-4 p-3 hover:bg-gray-800 transition-colors"
        >
          <div className="relative flex-shrink-0">
            <img
              src={song.albumArt}
              alt={song.title}
              className="w-16 h-16 rounded object-cover"
            />
            <button
              onClick={() => togglePlay(song)}
              className="absolute inset-0 bg-black/40 flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              {playingSongId === song.id ? (
                <PauseIcon className="w-6 h-6 text-white" />
              ) : (
                <PlayIcon className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold truncate">{song.title}</h3>
            <p className="text-gray-400 text-sm truncate">{song.artist}</p>
          </div>
          <button
            onClick={() => saveSongToSpotify(song.id)}
            disabled={savingToSpotify === song.id}
            className={`flex-shrink-0 p-2 rounded-full transition-colors ${
              savingToSpotify === song.id
                ? 'bg-green-500/20 text-green-500 cursor-not-allowed'
                : 'bg-green-500/10 hover:bg-green-500/20 text-green-500'
            }`}
          >
            <HeartIcon className={`w-5 h-5 ${savingToSpotify === song.id ? 'animate-pulse' : ''}`} />
          </button>
        </div>
      ))}
    </div>
  );
}