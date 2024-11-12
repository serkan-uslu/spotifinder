export const SPOTIFY_CONFIG = {
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID || '',
  redirectUri: `${window.location.origin}/callback`,
  scopes: [
    'user-read-private',
    'user-read-email',
    'user-library-read',
    'user-library-modify',
    'playlist-modify-public',
    'playlist-modify-private',
  ].join(' '),
};

console.log(window.location.origin, 'window.location.origin');
