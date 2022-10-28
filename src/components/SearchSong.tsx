import axios from "axios";
import { useCallback, useState } from "react";
import { maniadbBaseUrl, xmlToJson } from "../shared/Constants";

interface SongProps {
  id: string;
  title: string;
  artist: string;
  albumImage: string;
}

const SearchSong = () => {
  const [keyword, setKeyword] = useState("");
  const [songs, setSongs] = useState<Array<SongProps>>([]);

  const getSongs = async () => {
    const reqURL = maniadbBaseUrl(keyword, "song");
    await axios(reqURL).then((response) => {
      const dataSet = response.data;
      let XmlNode = new DOMParser().parseFromString(dataSet, "text/xml");
      filterResponse(xmlToJson(XmlNode).rss.channel.item);
    });
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
    getSongs();
  };

  const onChangeKeyword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }, []);
  return (
    <div className="search-song__container">
      <form onSubmit={onSubmit}>
        <input
          placeholder="노래 제목을 입력하세요"
          name="keyword"
          className="search-song__input"
          value={keyword}
          onChange={onChangeKeyword}
        />
      </form>
      {<>{songs.length ? console.log(songs) : null}</>}
    </div>
  );
};

export default SearchSong;
