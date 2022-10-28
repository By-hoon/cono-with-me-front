import { SongProps } from "./SearchSong";

const Song = ({ id, title, artist, albumImage }: SongProps) => {
  return (
    <div className="song__container">
      <div className="song-image__container">
        <img src={albumImage} alt={title} className="song__image" />
      </div>
      <div className="song-title__container">
        <span className="song-title__span">{title}</span>
      </div>
      <div className="song-artist__container">
        <span className="song-artist__span">{artist}</span>
      </div>
    </div>
  );
};

export default Song;
