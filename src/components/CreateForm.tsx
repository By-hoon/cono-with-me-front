import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { headcounts, genres } from "../shared/Constants";
import UploadVideo from "./UploadVideo";
import SearchSong from "./SearchSong";
import { SongProps } from "../shared/Props";
import Title from "./Title";
import mainApi from "../apis/mainApi";

export const CreateWithForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [withTime, setWithTime] = useState(
    new Date(Date.now() - new Date().getTimezoneOffset() * 60200).toISOString().slice(11, 16)
  );
  const [expireTime, setExpireTime] = useState(
    new Date(Date.now() - new Date().getTimezoneOffset() * 60100).toISOString().slice(11, 16)
  );
  const [place, setPlace] = useState("");
  const [headcount, setHeadcount] = useState(1);
  const [preferredGenre, setPreferredGenre] = useState("BALLAD");

  const navigate = useNavigate();
  const withTimeFocus = useRef<HTMLInputElement>(null);
  const expireTimeFocus = useRef<HTMLInputElement>(null);

  const changeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);
  const changeContent = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);
  const changeWithTime = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setWithTime(e.target.value);
  }, []);
  const changeExpireTime = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setExpireTime(e.target.value);
  }, []);
  const changePlace = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(e.target.value);
  }, []);
  const changeHeadcount = (option: number) => {
    setHeadcount(option);
  };
  const selectPreferredGenre = (option: string) => {
    setPreferredGenre(option);
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
    const convertWithTime = convertTime(withTime);
    const convertExpireTime = convertTime(expireTime);
    if (convertCurrentTime >= convertWithTime) {
      withTimeFocus.current?.focus();
      alert(`윗미 시간은 현재 시간보다 빠르거나 같을 수 없습니다. 현재시간: ${currentTime}`);
      return false;
    } else if (convertWithTime <= convertExpireTime) {
      expireTimeFocus.current?.focus();
      alert(`만료 시간은 윗미 시간보다 늦거나 같을 수 없습니다.`);
      return false;
    } else if (convertCurrentTime >= convertExpireTime) {
      expireTimeFocus.current?.focus();
      alert(`만료 시간은 현재 시간보다 빠르거나 같을 수 없습니다.`);
      return false;
    } else return true;
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidTime()) {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const date = today.getDate().toString().padStart(2, "0");
      mainApi
        .post(`/recruitments`, {
          title,
          content,
          startedAt: `${year}-${month}-${date}T${withTime}`,
          expiredAt: `${year}-${month}-${date}T${expireTime}`,
          place,
          participant: headcount,
          genre: preferredGenre,
        })
        .then((res) => {
          alert("윗미가 생성되었습니다.");
          navigate("/with");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="create-with__container">
      <Title title={"윗미 생성"} />
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
            <div className="input-title__container">윗미 시간</div>
            <input type="time" value={withTime} onChange={changeWithTime} required ref={withTimeFocus} />
          </div>
          <div className="flex">
            <div className="input-title__container">만료 시간</div>
            <input
              type="time"
              value={expireTime}
              onChange={changeExpireTime}
              required
              ref={expireTimeFocus}
            />
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
              {genres.map((genre) => (
                <button
                  key={genre}
                  className={`${
                    preferredGenre === genre ? "create-option__button--clicked" : "create-option__button"
                  }`}
                  type="button"
                  onClick={() => selectPreferredGenre(genre)}
                >
                  {genre}
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
  const [step, setStep] = useState("content");
  const [videoFile, setVideoFile] = useState({});
  const [selectedSong, setSelectedSong] = useState<SongProps>({
    id: "",
    title: "",
    artist: "",
    albumImage: "",
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showNext, setShowNext] = useState(false);

  const titleFocus = useRef<HTMLInputElement>(null);
  const contentFocus = useRef<HTMLTextAreaElement>(null);

  const navigate = useNavigate();

  const changeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);
  const changeContent = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);
  const createLive = () => {
    if (title && content) {
      //axios 이용한 post
      console.log(videoFile, selectedSong, title, content);
      navigate("/");
    }
    if (!content) contentFocus.current?.focus();
    if (!title) titleFocus.current?.focus();
  };
  const goBackStep = () => {
    if (step === "song") setStep("video");
    else if (step === "content") setStep("song");
  };
  const goNextStep = () => {
    if (step === "video") setStep("song");
    else if (step === "song") setStep("content");
    setShowNext(false);
  };

  useEffect(() => {
    if (step === "video") {
      for (let attribute in videoFile) {
        setShowNext(true);
        break;
      }
    }
    if (step === "song") {
      setShowNext(selectedSong["id"] ? true : false);
    }
  }, [step, videoFile, selectedSong]);

  const stepRender = () => {
    switch (step) {
      case "video": {
        return <UploadVideo videoFile={videoFile} setVideoFile={setVideoFile} />;
      }
      case "song": {
        return <SearchSong selectedSong={selectedSong} setSelectedSong={setSelectedSong} />;
      }
      case "content": {
        return (
          <div className="live-content-input__container">
            <div className="title-input__container">
              <div className="flex">
                <div className="input-title__container">제목</div>
                <input
                  type="text"
                  value={title}
                  placeholder="제목을 입력해 주세요."
                  onChange={changeTitle}
                  ref={titleFocus}
                  required
                />
              </div>
            </div>
            <div className="content-input__container">
              <div className="flex">
                <div className="input-title__container">내용</div>
                <textarea
                  placeholder="내용을 입력해 주세요."
                  value={content}
                  onChange={changeContent}
                  ref={contentFocus}
                  required
                />
              </div>
            </div>
          </div>
        );
      }
    }
    return null;
  };
  const subTitleRender = () => {
    switch (step) {
      case "video": {
        return <div className="create-sub-title">비디오 입력</div>;
      }
      case "song": {
        return <div className="create-sub-title">노래 선택</div>;
      }
      case "content": {
        return <div className="create-sub-title">내용 입력</div>;
      }
    }
    return null;
  };
  return (
    <div className="create-live__container">
      <div className="create-live-header__container">
        <div className="flex">
          <Title title={"라이브 생성"} />
          {subTitleRender()}
          <div className="interaction-buttons__container flex">
            {step !== "video" ? (
              <div className="interaction-button__container">
                <button className="interaction__button" onClick={goBackStep}>
                  이전
                </button>
              </div>
            ) : null}
            {step !== "content" ? (
              <div className={`interaction-button__container ${showNext ? null : "display-none"}`}>
                <button className="interaction__button" onClick={goNextStep}>
                  다음
                </button>
              </div>
            ) : (
              <div className="interaction-button__container">
                <button className="interaction__button" onClick={createLive}>
                  라이브 생성
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="step__container">{stepRender()}</div>
    </div>
  );
};
