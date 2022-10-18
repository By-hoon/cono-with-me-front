import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { headcounts, PreferredGenre } from "../shared/Constants";

export const CreateWithForm = () => {
  const [startTime, setStartTime] = useState(
    new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(11, 16)
  );
  const [endTime, setEndTime] = useState(
    new Date(Date.now() - new Date().getTimezoneOffset() * 63350).toISOString().slice(11, 16)
  );
  const [place, setPlace] = useState("");
  const [headcount, setHeadcount] = useState(1);
  const [preferredGenre, setPreferredGenre] = useState(PreferredGenre);

  const navigate = useNavigate();

  const changeStartTime = (e: any) => {
    setStartTime(e.target.value);
  };
  const changeEndTime = (e: any) => {
    setEndTime(e.target.value);
  };
  const changePlace = (e: any) => {
    setPlace(e.target.value);
  };
  const changeHeadcount = (option: number) => {
    setHeadcount(option);
  };
  const selectPreferredGenre = (option: string) => {
    let newPreferredGenre = JSON.parse(JSON.stringify(preferredGenre));
    if (option !== "모든 장르") {
      newPreferredGenre["모든 장르"] = false;
      newPreferredGenre[option] = !newPreferredGenre[option];
      if (!newPreferredGenre[option]) {
        if (!Object.keys(newPreferredGenre).filter((key) => newPreferredGenre[key]).length)
          newPreferredGenre["모든 장르"] = true;
      }
    } else if (!newPreferredGenre["모든 장르"]) newPreferredGenre = PreferredGenre;
    setPreferredGenre(newPreferredGenre);
  };
  const onSubmit = () => {
    //axios 이용한 post
    navigate("/");
  };
  return (
    <div className="create-with__container">
      <form onSubmit={onSubmit}>
        <div className="time-input__container">
          <div className="flex">
            <div className="input-title__container">시작 시간</div>
            <input type="time" value={startTime} onChange={changeStartTime} required />
          </div>
          <div className="flex">
            <div className="input-title__container">종료 시간</div>
            <input type="time" value={endTime} onChange={changeEndTime} required />
          </div>
        </div>
        <div className="place-input__container">
          <div className="flex">
            <div className="input-title__container">장소</div>
            <input type="text" value={place} onChange={changePlace} required />
          </div>
        </div>
        <div className="headcount-input__container">
          <div className="flex">
            <div className="input-title__container">구할 인원</div>
            <div className="create-option__container">
              {headcounts.map((headcountOption) => (
                <button
                  key={headcountOption}
                  className={`${
                    headcount === headcountOption ? "create-option__button--clicked" : "create-option__button"
                  }`}
                  type="button"
                  onClick={() => changeHeadcount(headcountOption)}
                >
                  {headcountOption}명
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="preferred-genre-input__container">
          <div className="flex">
            <div className="input-title__container">선호 장르</div>
            <div className="create-option__container flex-wrap">
              {Object.keys(PreferredGenre).map((preferredGenreOption) => (
                <button
                  key={preferredGenreOption}
                  className={`${
                    preferredGenre[preferredGenreOption]
                      ? "create-option__button--clicked"
                      : "create-option__button"
                  }`}
                  type="button"
                  onClick={() => selectPreferredGenre(preferredGenreOption)}
                >
                  {preferredGenreOption}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="submit__container">
          <input type="submit" value="등록하기" />
        </div>
      </form>
    </div>
  );
};
