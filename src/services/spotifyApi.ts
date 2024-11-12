export class SpotifyService {
  private token: string;
  private BASE_URL = 'https://api.spotify.com/v1';

  constructor(token: string) {
    this.token = token;
  }

  private async fetch(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getRecommendations(seed_tracks: string[] = []): Promise<any[]> {
    const params = new URLSearchParams({
      limit: '50', // Increased limit to ensure we have enough songs with previews
      seed_tracks: seed_tracks.join(','),
      seed_genres: seed_tracks.length ? '' : 'pop,rock,indie,electronic',
    });

    const data = await this.fetch(`/recommendations?${params}`);

    // Filter tracks with preview URLs and map to our Song type
    const tracksWithPreviews = data.tracks
      .filter((track: any) => track.preview_url)
      .map((track: any) => ({
        id: track.id,
        title: track.name,
        artist: track.artists[0].name,
        albumArt: track.album.images[0]?.url,
        previewUrl: track.preview_url,
        tags: [
          track.album.album_type,
          ...track.artists.map((a: any) => a.name),
        ].slice(0, 3),
      }));

    // If we don't have enough tracks with previews, fetch more
    if (tracksWithPreviews.length < 20) {
      const additionalParams = new URLSearchParams({
        limit: '50',
        seed_genres: 'pop,rock,indie,electronic,alternative',
      });

      const additionalData = await this.fetch(
        `/recommendations?${additionalParams}`
      );
      const additionalTracksWithPreviews = additionalData.tracks
        .filter((track: any) => track.preview_url)
        .map((track: any) => ({
          id: track.id,
          title: track.name,
          artist: track.artists[0].name,
          albumArt: track.album.images[0]?.url,
          previewUrl: track.preview_url,
          tags: [
            track.album.album_type,
            ...track.artists.map((a: any) => a.name),
          ].slice(0, 3),
        }));

      // Combine and remove duplicates
      const allTracks = [
        ...tracksWithPreviews,
        ...additionalTracksWithPreviews,
      ];
      const uniqueTracks = Array.from(
        new Map(allTracks.map((track) => [track.id, track])).values()
      );

      return uniqueTracks.slice(0, 20); // Return only first 20 unique tracks
    }

    return tracksWithPreviews.slice(0, 20); // Return only first 20 tracks
  }

  async saveSong(trackId: string): Promise<void> {
    // await this.fetch(`/me/tracks`, {
    //   method: 'PUT',
    //   body: JSON.stringify({ ids: [trackId] })
    // });
  }
}
