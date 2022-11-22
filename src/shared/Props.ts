export interface SongProps {
  id?: string;
  title?: string;
  artist?: string;
  albumImage?: string;
}

export interface LiveProps {
  id: string;
  author: string;
  video: { [key: string]: string };
  song: SongProps;
  title: string;
  content: string;
}
