export interface SongProps {
  id?: string;
  title?: string;
  artist?: string;
  albumImage?: string;
}

export interface WithProps {
  id: number;
  userId: number;
  title: string;
  content: string;
  startedAt: string;
  expiredAt: string;
  place: string;
  participant: number;
  genre: string;
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
