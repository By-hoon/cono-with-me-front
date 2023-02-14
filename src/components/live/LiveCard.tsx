import { useNavigate } from "react-router-dom";
import { LiveCardProps } from "../../shared/Props";

const LiveCard = ({ id, title, thumbnail }: LiveCardProps) => {
  const navigate = useNavigate();
  const playLive = () => {
    navigate("/live/play", { state: id });
  };
  return (
    <div className="live-card__container" onClick={playLive}>
      <img className="live-card-thumbnail__img" src={thumbnail} alt="live-thumbnail" />
      <div className="live-card-title">{title}</div>
    </div>
  );
};

export default LiveCard;
