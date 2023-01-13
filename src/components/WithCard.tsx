import { WithProps } from "../shared/Props";

interface WithCardProps {
  w: WithProps;
  // w === with
}

const WithCard = ({ w }: WithCardProps) => {
  return (
    <div className="with-card__container">
      <div className="with-title__container">{w.title}</div>
      <div className="flex">
        <div className="with-time__container">{w.expiredAt}</div>
        <div className="with-place__container">{w.place}</div>
      </div>
      <div className="with-preferred-genres__container">{w.genre}</div>
    </div>
  );
};

export default WithCard;
