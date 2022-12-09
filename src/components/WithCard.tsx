import { WithCardProps } from "../shared/Props";

const WithCard = ({ id, title, time, place, preferredGenres }: WithCardProps) => {
  return (
    <div className="with-card__container">
      <div className="with-title__container">{title}</div>
      <div className="flex">
        <div className="with-time__container">{time}</div>
        <div className="with-place__container">{place}</div>
      </div>
      <div className="with-preferred-genres__container">{preferredGenres}</div>
    </div>
  );
};

export default WithCard;
