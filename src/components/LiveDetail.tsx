import { useLocation } from "react-router-dom";
import { LiveProps } from "../shared/Props";

const LiveDetail = () => {
  const { id, author, video, song, title, content } = useLocation().state as LiveProps;

  return (
    <div className="live-detail__container">
      <div className="live-video__container">{/* 비디오 재생 컴포넌트 */}</div>
      <div className="live-front-info__container">
        <div className="live-title--front">{title}</div>
        <div className="live-author__container">
          <div className="live-author">{author}</div>
        </div>
      </div>
      <div className="tools__container">
        <div className="live-content__container">{/* 클릭 시 라이브 비하인드 정보 컴포넌트 */}</div>
        <div className="live-song__container">
          <img src={song.albumImage} alt="live-song" />
          {/* 클릭 시 자세한 노래 정보 컴포넌트 */}
        </div>
      </div>
    </div>
  );
};

export default LiveDetail;
