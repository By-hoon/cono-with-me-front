import { Icon } from "@iconify/react";
import { useState } from "react";
import { SearchSongProps, SongProps } from "./SearchSong";

interface SongComponentProps extends SongProps, SearchSongProps {}

const Song = ({ id, title, artist, albumImage, selectedSong, setSelectedSong }: SongComponentProps) => {
  const [loading, setLoading] = useState(true);

  const selectSong = () => {
    if (selectedSong?.id === id) {
      setSelectedSong({
        id: "",
        title: "",
        artist: "",
        albumImage: "",
      });
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
        <div className={`${loading ? "song-image-loading" : "display-none"}`}>
          <Icon icon="eos-icons:loading" />
        </div>
        <img
          src={albumImage}
          alt={title}
          className={`${loading ? "display-none" : "song__image"}`}
          onLoad={() => {
            setLoading(false);
          }}
        />
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
