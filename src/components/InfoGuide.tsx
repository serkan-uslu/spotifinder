import React from 'react';
import { XIcon } from 'lucide-react';

interface InfoGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InfoGuide({ isOpen, onClose }: InfoGuideProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              How to Use Spotifinder
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-8">
            <section className="space-y-3">
              <h3 className="text-xl font-semibold text-green-400">Getting Started</h3>
              <p className="text-gray-300">
                Connect your Spotify account to start discovering new music tailored to your taste.
                All liked songs can be automatically saved to your Spotify library.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-semibold text-green-400">Discovering Music</h3>
              <div className="space-y-2 text-gray-300">
                <p>🎵 <strong>Like or Skip:</strong> Use the buttons on each song card:</p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>Heart Button: Like a song and save it</li>
                  <li>X Button: Skip to the next song</li>
                </ul>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-semibold text-green-400">Preview & Controls</h3>
              <div className="space-y-2 text-gray-300">
                <p>🎵 <strong>Music Preview:</strong></p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>Click the play button on any song card to hear a 30-second preview</li>
                  <li>Preview will automatically stop when you move to the next song</li>
                </ul>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-semibold text-green-400">Liked Songs</h3>
              <div className="space-y-2 text-gray-300">
                <p>❤️ <strong>Managing Your Likes:</strong></p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>View all your liked songs in the right panel</li>
                  <li>Click the heart icon next to any liked song to save it to your Spotify library</li>
                  <li>Play preview of liked songs anytime by clicking the play button</li>
                </ul>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-semibold text-green-400">Tips</h3>
              <div className="space-y-2 text-gray-300">
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>The more songs you interact with, the better the recommendations become</li>
                  <li>Use song previews to make better decisions</li>
                  <li>Check the tags under each song to discover similar artists</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}