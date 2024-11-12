export interface Song {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  previewUrl: string | null;
  tags: string[];
}