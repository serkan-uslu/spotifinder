import React, { useState } from 'react';
import { GithubIcon, Music2Icon, InfoIcon } from 'lucide-react';
import MusicCard from './components/MusicCard';
import LikedSongsList from './components/LikedSongsList';
import LoginButton from './components/LoginButton';
import InfoGuide from './components/InfoGuide';
import { useSpotify } from './hooks/useSpotify';
import { getAccessTokenFromUrl } from './services/spotifyAuth';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<string[]>([]);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [swipedCards, setSwipedCards] = useState<Set<string>>(new Set());
  const { songs, loading, error, likeSong } = useSpotify();
  const isAuthenticated = Boolean(getAccessTokenFromUrl());

  const handleSwipe = async (songId: string, direction: 'left' | 'right') => {
    if (direction === 'right') {
      setLiked((prev) => [...prev, songId]);
      await likeSong(songId);
    }
    setSwipedCards((prev) => new Set([...prev, songId]));
    setCurrentIndex((prev) => prev + 1);
  };

  const remainingSongs = songs.filter(song => !swipedCards.has(song.id));
  const canSwipe = remainingSongs.length > 0;
  const likedSongs = songs.filter((song) => liked.includes(song.id));

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white flex flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-bold text-center">
          Welcome to Spotifinder
        </h1>
        <p className="text-gray-400 text-center max-w-md">
          Discover new music by swiping through personalized recommendations.
          Connect with Spotify to get started.
        </p>
        <LoginButton />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Music2Icon className="w-8 h-8 text-green-400" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Spotifinder
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsGuideOpen(true)}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            aria-label="How to use"
          >
            <InfoIcon className="w-6 h-6 text-gray-400 hover:text-white" />
          </button>
          <a
            href="https://github.com"
            className="text-gray-400 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="w-6 h-6" />
          </a>
        </div>
      </header>

      <InfoGuide isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column: Music Cards */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold mb-2">Discover New Music</h2>
              <p className="text-gray-400">
                Like or skip songs to build your perfect playlist!
              </p>
            </div>

            <div className="relative h-[450px]">
              {canSwipe ? (
                remainingSongs
                  .slice(0, 2)
                  .map((song, index) => (
                    <MusicCard
                      key={song.id}
                      song={song}
                      index={index}
                      onSwipe={handleSwipe}
                    />
                  ))
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">No More Songs!</h3>
                    <p className="text-gray-400">
                      You've liked {liked.length} songs.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Liked Songs */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold mb-2">Your Liked Songs</h2>
              <p className="text-gray-400">
                Build your perfect playlist one song at a time
              </p>
            </div>
            <LikedSongsList songs={likedSongs} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;