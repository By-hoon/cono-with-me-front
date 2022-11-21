import { Icon } from "@iconify/react";
import { useState } from "react";
import { SongProps } from "../shared/Props";

const Song = ({ id, title, artist, albumImage }: SongProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <div className="song-image__container">
        {loading ? (
          <div className="song-image-loading">
            <Icon icon="eos-icons:loading" />
          </div>
        ) : (
          <img
            src={albumImage}
            alt={title}
            className="song__image"
            onLoad={() => {
              setLoading(false);
            }}
          />
        )}
      </div>
      <div className="song-title__container">
        <span className="song-title__span">{title}</span>
      </div>
      <div className="song-artist__container">
        <span className="song-artist__span">{artist}</span>
      </div>
    </>
  );
};

export default Song;
