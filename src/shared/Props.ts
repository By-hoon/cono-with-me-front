export interface SongProps {
  id?: string;
  title?: string;
  artist?: string;
  albumImage?: string;
}

export interface WithCardProps {
  id: string;
  title: string;
  time: string;
  place: string;
  preferredGenres: Array<string>;
}

export interface LiveProps {
  id: string;
  author: string;
  video: { [key: string]: string };
  song: SongProps;
  title: string;
  content: string;
}

export interface LiveCardProps {
  id: string;
  title: string;
  thumbnail: string;
}
