import { Icon } from "@iconify/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { LiveProps } from "../shared/Props";
import PlayVideo from "./PlayVideo";

const LiveDetail = () => {
  const { id, author, video, song, title, content } = useLocation().state as LiveProps;

  const [showBehindInfo, setShowBehindInfo] = useState(false);
  const [showMoreOption, setShowMoreOption] = useState(false);

  const appearMoreOption = () => {
    setShowMoreOption(true);
  };
  const disAppearMoreOption = () => {
    setShowMoreOption(false);
  };

  const appearBehindInfo = () => {
    setShowBehindInfo(true);
  };
  const disappearBehindInfo = () => {
    setShowBehindInfo(false);
  };

  const clickShadow = () => {
    if (showMoreOption) disAppearMoreOption();
    if (showBehindInfo) disappearBehindInfo();
  };

  return (
    <div className="live-detail__container">
      <div className="live-video__container">
        <PlayVideo video={video} />
      </div>
      <div className="live-front-info__container">
        <div className="live-title--front">{title}</div>
        <div className="live-author__container">
          <div className="live-author">{author}</div>
        </div>
      </div>
      <div className={`${showBehindInfo ? "live-behind-info__container" : "display-none"}`}>
        <div className="flex">
          <div className="live-behind-title">설명</div>
          <div className="cancel-icon__container" onClick={disappearBehindInfo}>
            <Icon icon="material-symbols:close" />
          </div>
        </div>
        <div className="live-title--behind">{title}</div>
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
          <img src={song.albumImage} alt="live-song" />
          {/* 클릭 시 자세한 노래 정보 컴포넌트 */}
        </div>
      </div>
      <div className={`${showMoreOption ? "live-more-options__container flex" : "display-none"}`}>
        <div className="live-more-option" onClick={appearBehindInfo}>
          설명
        </div>
      </div>
      <div
        className={`${showBehindInfo || showMoreOption ? "shadow" : "display-none"}`}
        onClick={clickShadow}
      />
    </div>
  );
};

export default LiveDetail;
