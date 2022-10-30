import { SearchSongProps, SongProps } from "./SearchSong";

interface SongComponentProps extends SongProps, SearchSongProps {}

const Song = ({ id, title, artist, albumImage, selectedSong, setSelectedSong }: SongComponentProps) => {
  const selectSong = () => {
    if (selectedSong?.id === id) {
      setSelectedSong(undefined);
    } else {
      setSelectedSong({
        id,
        title,
        artist,
        albumImage,
      });
    }
  };
  return (
    <div
      className={`"song__container" ${selectedSong?.id === id ? "selected-song" : null}`}
      onClick={selectSong}
    >
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
