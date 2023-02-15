import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LiveData } from "../test/data";
import UploadVideo from "./UploadVideo";
import SearchSong from "./live/SearchSong";
import { SongProps } from "../shared/Props";
import Title from "./common/Title";
import { ERROR, genres, headcounts, HELP, SUCCESS } from "../shared/Constants";
import mainApi from "../apis/mainApi";
import Help from "./common/Help";
import { isValidTime } from "../utils/Util";

export const EditWithForm = () => {
  const withId = useLocation().state.withId;

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidTime(withTime, expireTime)) {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const date = today.getDate().toString().padStart(2, "0");
      mainApi
        .put(`/recruitments/${withId}`, {
          title,
          content,
          startedAt: `${year}-${month}-${date}T${withTime}`,
          expiredAt: `${year}-${month}-${date}T${expireTime}`,
          place,
          participant: headcount,
          genre: preferredGenre,
        })
        .then((res) => {
          alert(SUCCESS.EDITWITH);
          navigate("/with");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="edit__container">
      <div className="edit-with-header__container flex">
        <Title title={"윗미 수정"} />
      </div>
      <form onSubmit={onSubmit}>
        <div className="title-input__container">
          <div className="input-title">제목</div>
          <input
            className="title__input"
            type="text"
            value={title}
            placeholder="제목을 입력해 주세요."
            onChange={changeTitle}
            required
          />
        </div>
        <div className="content-input__container">
          <div className="input-title">내용</div>
          <textarea
            className="content__input"
            placeholder="내용을 입력해 주세요."
            value={content}
            onChange={changeContent}
            required
          />
        </div>
        <div className="time-input__container flex">
          <div className="flex">
            <div className="input-title flex">
              윗미 시간 <Help>{HELP.WITHTiME}</Help>
            </div>
            <input
              className="time__input"
              type="time"
              value={withTime}
              onChange={changeWithTime}
              required
              onClick={(e) => {
                e.currentTarget.showPicker();
              }}
            />
          </div>
          <div className="flex">
            <div className="input-title flex">
              만료 시간 <Help>{HELP.EXPIRETIME}</Help>
            </div>
            <input
              className="time__input"
              type="time"
              value={expireTime}
              onChange={changeExpireTime}
              required
              onClick={(e) => {
                e.currentTarget.showPicker();
              }}
            />
          </div>
        </div>
        <div className="place-input__container">
          <div className="input-title">장소</div>
          <input
            className="place__input"
            type="text"
            value={place}
            placeholder="장소를 입력해 주세요."
            onChange={changePlace}
            required
          />
        </div>
        <div className="headcount-input__container">
          <div className="input-title">구할 인원</div>
          <div className="headcount-option__container">
            {headcounts.map((headcountOption) => (
              <button
                key={headcountOption}
                className={`${
                  headcount === headcountOption ? "headcount__button--clicked" : "headcount__button"
                }`}
                type="button"
                onClick={() => changeHeadcount(headcountOption)}
              >
                {headcountOption}명
              </button>
            ))}
          </div>
        </div>
        <div className="preferred-genre-input__container">
          <div className="input-title">선호 장르</div>
          <div className="preferred-genre-option__container">
            {genres.map((genre) => (
              <button
                key={genre}
                className={`${
                  preferredGenre === genre ? "preferred-genre__button--clicked" : "preferred-genre__button"
                }`}
                type="button"
                onClick={() => selectPreferredGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
        <div className="submit__container">
          <input type="submit" value="등록하기" />
        </div>
      </form>
    </div>
  );
};

export const EditLiveForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [videoFile, setVideoFile] = useState({});
  const [selectedSong, setSelectedSong] = useState<SongProps>({
    id: "",
    title: "",
    artist: "",
    albumImage: "",
  });
  const [previousSong, setPreviousSong] = useState<SongProps>({
    id: "",
    title: "",
    artist: "",
    albumImage: "",
  });
  const titleFocus = useRef<HTMLInputElement>(null);
  const contentFocus = useRef<HTMLTextAreaElement>(null);

  const navigate = useNavigate();

  const changeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);
  const changeContent = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);

  const goPreviousPage = () => {
    navigate(-1);
  };
  const checkInputValues = () => {
    if (!content) {
      contentFocus.current?.focus();
      return false;
    }
    if (!title) {
      titleFocus.current?.focus();
      return false;
    }
    return true;
  };
  const editLive = () => {
    const song = selectedSong.id ? selectedSong : previousSong;
    if (checkInputValues()) {
      //수정 api 호출
      console.log(videoFile, song, title, content);
      // navigate("/");
    }
  };

  useEffect(() => {
    setVideoFile(LiveData.video);
    setTitle(LiveData.title);
    setContent(LiveData.content);
    setSelectedSong(LiveData.song);
    setPreviousSong(LiveData.song);
  }, []);

  return (
    <div className="edit__container">
      <Title title={"라이브 수정"} />
      <div className="edit-upload-video__container">
        <div className="edit-header">
          <span className="edit__span">동영상 수정</span>
        </div>
        <UploadVideo videoFile={videoFile} setVideoFile={setVideoFile} />
      </div>
      <div className="edit-song__container">
        <div className="edit-header">
          <span className="edit__span">노래 수정</span>
        </div>
        <SearchSong selectedSong={selectedSong} setSelectedSong={setSelectedSong} />
      </div>
      <div className="edit-content__container">
        <div className="edit-header">
          <span className="edit__span">내용 수정</span>
        </div>
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
      </div>
      <div className="button__container">
        <button className="cancle__button" onClick={goPreviousPage}>
          취소
        </button>
        <button className="submit__button" onClick={editLive}>
          수정
        </button>
      </div>
    </div>
  );
};
