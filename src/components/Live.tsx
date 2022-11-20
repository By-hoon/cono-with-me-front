import { Icon } from "@iconify/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { LiveProps } from "../shared/Props";
import { DetailHeader } from "./Header";
import PlayVideo from "./PlayVideo";
import Song from "./Song";

const Live = () => {
  const { id, author, video, song, title, content } = useLocation().state as LiveProps;

  const [showSongDetail, setShowSongDetail] = useState(false);
  const [showDetailInfo, setShowDetailInfo] = useState(false);
  const [showMoreOption, setShowMoreOption] = useState(false);

  const appearMoreOption = () => {
    setShowMoreOption(true);
  };
  const disAppearMoreOption = () => {
    setShowMoreOption(false);
  };

  const appearDetailInfo = () => {
    setShowDetailInfo(true);
  };
  const disappearDetailInfo = () => {
    setShowDetailInfo(false);
  };
  const disappearSongDetail = () => {
    setShowSongDetail(false);
  };

  const clickShadow = () => {
    if (showMoreOption) disAppearMoreOption();
    if (showDetailInfo) disappearDetailInfo();
    if (showSongDetail) disappearSongDetail();
  };

  return (
    <div className="live-detail__container">
      <div className="live-video__container">
        <PlayVideo video={video} />
      </div>
      <div className="live-info__container">
        <div className="live-title--simple">{title}</div>
        <div className="live-author__container">
          <div className="live-author">{author}</div>
        </div>
      </div>
      <div className={`${showDetailInfo ? "live-detail-info__container" : "display-none"}`}>
        <DetailHeader title="설명" closeFunction={disappearDetailInfo} />
        <div className="live-title">{title}</div>
        <div className="live-more-info__container">
          {/* 좋아요, 조회수, 게시 날짜 등 부가적인 주요 정보 추가 */}
        </div>
        <div className="live-content">{content}</div>
      </div>
      <div className="live-tools__container flex">
        <div className="live-tool__container" onClick={appearMoreOption}>
          <Icon icon="material-symbols:more-horiz" />
        </div>
        <div className="live-tool__container">
          <img src={song.albumImage} alt="live-song" onClick={() => setShowSongDetail(true)} />
          {showSongDetail ? (
            <div className="song-detail__container">
              <DetailHeader title="노래 정보" closeFunction={disappearSongDetail} />
              <Song id={song.id} title={song.title} artist={song.artist} albumImage={song.albumImage} />
            </div>
          ) : null}
        </div>
      </div>
      <div className={`${showMoreOption ? "live-more-options__container flex" : "display-none"}`}>
        <div className="live-more-option" onClick={appearDetailInfo}>
          설명
        </div>
      </div>
      <div
        className={`${showDetailInfo || showMoreOption || showSongDetail ? "shadow" : "display-none"}`}
        onClick={clickShadow}
      />
    </div>
  );
};

export default Live;
