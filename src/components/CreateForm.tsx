import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { headcounts, PreferredGenre } from "../shared/Constants";

export const CreateWithForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
  const startTimeFocus = useRef<HTMLInputElement>(null);
  const endTimeFocus = useRef<HTMLInputElement>(null);

  const changeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);
  const changeContent = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);
  const changeStartTime = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  }, []);
  const changeEndTime = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  }, []);
  const changePlace = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(e.target.value);
  }, []);
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
  const convertTime = (time: string) => {
    const timeSplit = time.split(":");
    const hour = Number(timeSplit[0]);
    const minute = Number(timeSplit[1]);
    return hour * 60 + minute;
  };
  const isValidTime = () => {
    const currentTime = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .slice(11, 16);
    const convertCurrentTime = convertTime(currentTime);
    const convertStartTime = convertTime(startTime);
    const convertEndTime = convertTime(endTime);
    if (convertCurrentTime > convertStartTime) {
      startTimeFocus.current?.focus();
      alert(`시작 시간은 현재 시간보다 작을 수 없습니다. 현재시간: ${currentTime}`);
      return false;
    } else if (convertStartTime >= convertEndTime) {
      endTimeFocus.current?.focus();
      alert(`종료 시간은 시작 시간보다 작을 수 없습니다.`);
      return false;
    } else return true;
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidTime()) {
      //axios 이용한 post
      navigate("/");
    }
  };

  return (
    <div className="create-with__container">
      <form onSubmit={onSubmit}>
        <div className="title-input__container">
          <div className="flex">
            <div className="input-title__container">제목</div>
            <input
              type="text"
              value={title}
              placeholder="제목을 입력해 주세요."
              onChange={changeTitle}
              required
            />
          </div>
        </div>
        <div className="content-input__container">
          <div className="flex">
            <div className="input-title__container">내용</div>
            <textarea placeholder="내용을 입력해 주세요." value={content} onChange={changeContent} required />
          </div>
        </div>
        <div className="time-input__container">
          <div className="flex">
            <div className="input-title__container">시작 시간</div>
            <input type="time" value={startTime} onChange={changeStartTime} required ref={startTimeFocus} />
          </div>
          <div className="flex">
            <div className="input-title__container">종료 시간</div>
            <input type="time" value={endTime} onChange={changeEndTime} required ref={endTimeFocus} />
          </div>
        </div>
        <div className="place-input__container">
          <div className="flex">
            <div className="input-title__container">장소</div>
            <input
              type="text"
              value={place}
              placeholder="장소를 입력해 주세요."
              onChange={changePlace}
              required
            />
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
            <div className="create-option__container">
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

export const CreateLiveForm = () => {
  const [step, setStep] = useState("video");
  const navigate = useNavigate();
  const createLive = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //axios 이용한 post
    navigate("/");
  };
  const goBackStep = () => {
    if (step === "song") setStep("video");
    else if (step === "content") setStep("song");
  };
  const stepRender = () => {
    switch (step) {
      case "video": {
        return <>{/* 비디오 업로드 컴포넌트 */}</>;
      }
      case "song": {
        return <>{/* 노래 선택 컴포넌트 */}</>;
      }
      case "content": {
        return <>{/* 내용 입력 컴포넌트 */}</>;
      }
    }
    return null;
  };
  return (
    <div className="create-with__container">
      {step !== "video" ? (
        <div className="back-button__container">
          <button onClick={goBackStep}>
            <Icon icon="bx:arrow-back" />
          </button>
        </div>
      ) : null}
      <form onSubmit={createLive}>{stepRender()}</form>
    </div>
  );
};
