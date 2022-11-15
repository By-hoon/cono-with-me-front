import { Icon } from "@iconify/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { maniadbBaseUrl, xmlToJson } from "../shared/Constants";
import { SongProps } from "../shared/Props";
import Song from "./Song";

export interface SearchSongProps {
  selectedSong: SongProps;
  setSelectedSong: React.Dispatch<React.SetStateAction<SongProps>>;
}

const SearchSong = ({ selectedSong, setSelectedSong }: SearchSongProps) => {
  const [keyword, setKeyword] = useState("");
  const [songs, setSongs] = useState<Array<SongProps>>([]);
  const [loading, setLoading] = useState(false);

  const getSongs = async () => {
    const reqURL = maniadbBaseUrl(keyword, "song");
    await axios(reqURL)
      .then((response) => {
        const dataSet = response.data;
        let XmlNode = new DOMParser().parseFromString(dataSet, "text/xml");
        filterResponse(xmlToJson(XmlNode).rss.channel.item);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  const filterResponse = (response: Array<any>) => {
    const newResponse: Array<SongProps> = [];
    response.forEach((element) => {
      newResponse.push({
        id: element["@attributes"].id,
        title: element.title["#cdata-section"],
        artist: element["maniadb:artist"].name["#cdata-section"],
        albumImage: element["maniadb:album"].image["#cdata-section"],
      });
    });
    setSongs(newResponse);
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    getSongs();
  };
  const onChangeKeyword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }, []);

  return (
    <div className="search-song__container">
      {selectedSong["id"] ? (
        <div className="selected-song__container">
          <div className="song-image__container">
            <img src={selectedSong.albumImage} alt={selectedSong.title} className="song__image" />
          </div>
          <div className="song-title__container">
            <span className="song-title__span">{selectedSong.title}</span>
          </div>
          <div className="song-artist__container">
            <span className="song-artist__span">{selectedSong.artist}</span>
          </div>
        </div>
      ) : null}
      <form onSubmit={onSubmit}>
        <input
          placeholder="노래 제목을 입력하세요"
          name="keyword"
          className="search-song__input"
          value={keyword}
          onChange={onChangeKeyword}
        />
      </form>
      {loading ? (
        <div className="songs-loading__container">
          <Icon icon="eos-icons:loading" />
        </div>
      ) : null}
      <div className="songs__container">
        {songs.map((song) => (
          <Song
            key={song.id}
            id={song.id}
            title={song.title}
            artist={song.artist}
            albumImage={song.albumImage}
            selectedSong={selectedSong}
            setSelectedSong={setSelectedSong}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchSong;
