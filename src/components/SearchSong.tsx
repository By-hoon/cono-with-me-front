import axios from "axios";
import { useCallback, useState } from "react";
import { maniadbBaseUrl, xmlToJson } from "../shared/Constants";

const SearchSong = () => {
  const [keyword, setKeyword] = useState("");
  const [songs, setSongs] = useState([]);

  const getSongs = async () => {
    const reqURL = maniadbBaseUrl(keyword, "song");
    await axios(reqURL).then((response) => {
      const dataSet = response.data;
      let XmlNode = new DOMParser().parseFromString(dataSet, "text/xml");
      console.log(xmlToJson(XmlNode));
    });
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
    </div>
  );
};

export default SearchSong;
