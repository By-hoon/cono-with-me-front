import { Icon } from "@iconify/react";
import { useState } from "react";
import { SongProps } from "../shared/Props";

const Song = ({ id, title, artist, albumImage }: SongProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="song__container">
      <div className="song-image__container">
        <div className={`${loading ? "song-image-loading flex" : "display-none"}`}>
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
      <div className="song-info__container flex">
        <div className="song-title">{title}</div>
        <div className="song-artist">{artist}</div>
      </div>
    </div>
  );
};

export default Song;
