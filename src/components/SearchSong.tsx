import { useCallback, useState } from "react";

const SearchSong = () => {
  const [keyword, setKeyword] = useState("");
  const [songs, setSongs] = useState([]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
