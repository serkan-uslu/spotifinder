import React from 'react';
import { getSpotifyAuthUrl } from '../services/spotifyAuth';
import { Music2Icon } from 'lucide-react';

export default function LoginButton() {
  return (
    <a
      href={getSpotifyAuthUrl()}
      className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
    >
      <Music2Icon className="w-6 h-6" />
      Connect with Spotify
    </a>
  );
}