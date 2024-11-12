import React from 'react';
import { Song } from '../types';
import { PlayIcon, PauseIcon, HeartIcon, XIcon } from 'lucide-react';

interface MusicCardProps {
  song: Song;
  index: number;
  onSwipe: (id: string, direction: 'left' | 'right') => void;
}

export default function MusicCard({ song, index, onSwipe }: MusicCardProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  React.useEffect(() => {
    audioRef.current = new Audio(song.previewUrl!);
    audioRef.current.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', () => setIsPlaying(false));
      }
    };
  }, [song.previewUrl]);

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: index === 0 ? 1 : 0,
      }}
      className="transition-all duration-300"
    >
      <div className="w-full h-full bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="relative h-3/4">
          <img
            src={song.albumArt}
            alt={`${song.title} by ${song.artist}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4 flex gap-3">
            <button
              onClick={() => onSwipe(song.id, 'left')}
              className="bg-red-500/90 hover:bg-red-600 p-3 rounded-full shadow-lg transition-colors"
            >
              <XIcon className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => onSwipe(song.id, 'right')}
              className="bg-green-500/90 hover:bg-green-600 p-3 rounded-full shadow-lg transition-colors"
            >
              <HeartIcon className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={togglePlay}
              className="bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-colors"
            >
              {isPlaying ? (
                <PauseIcon className="w-6 h-6 text-gray-900" />
              ) : (
                <PlayIcon className="w-6 h-6 text-gray-900" />
              )}
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold truncate">{song.title}</h3>
          <p className="text-gray-400 truncate">{song.artist}</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {song.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}