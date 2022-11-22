import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { LiveProps } from "../shared/Props";
import { LiveData } from "../test/data";
import { DetailHeader } from "./Header";
import PlayVideo from "./PlayVideo";
import Song from "./Song";

const Live = () => {
  const [live, setLive] = useState<LiveProps>();
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
  useEffect(() => {
    // LiveDetail 데이터 요청 api
    setLive(LiveData);
  }, []);
  return (
    <div className="live-detail__container">
      <div className="live-video__container">
        <PlayVideo video={live?.video} />
      </div>
      {<>{console.log("run")}</>}
      <div className="live-info__container">
        <div className="live-title--simple">{live?.title}</div>
        <div className="live-author__container">
          <div className="live-author">{live?.author}</div>
        </div>
      </div>
      {showDetailInfo ? (
        <div className="live-detail-info__container">
          <DetailHeader title="설명" closeFunction={disappearDetailInfo} />
          <div className="live-title">{live?.title}</div>
          <div className="live-more-info__container">
            {/* 좋아요, 조회수, 게시 날짜 등 부가적인 주요 정보 추가 */}
          </div>
          <div className="live-content">{live?.content}</div>
        </div>
      ) : null}
      <div className="live-tools__container flex">
        <div className="live-tool__container" onClick={appearMoreOption}>
          <Icon icon="material-symbols:more-horiz" />
        </div>
        <div className="live-tool__container">
          <img src={live?.song.albumImage} alt="live-song" onClick={() => setShowSongDetail(true)} />
          {showSongDetail ? (
            <div className="song-detail__container">
              <DetailHeader title="노래 정보" closeFunction={disappearSongDetail} />
              <Song
                id={live?.song.id}
                title={live?.song.title}
                artist={live?.song.artist}
                albumImage={live?.song.albumImage}
              />
            </div>
          ) : null}
        </div>
      </div>
      {showMoreOption ? (
        <div className="live-more-options__container flex">
          <div className="live-more-option" onClick={appearDetailInfo}>
            설명
          </div>
        </div>
      ) : null}
      <div
        className={`${showDetailInfo || showMoreOption || showSongDetail ? "shadow" : "display-none"}`}
        onClick={clickShadow}
      />
    </div>
  );
};

export default Live;
