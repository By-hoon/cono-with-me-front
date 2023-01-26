import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { WithProps } from "../shared/Props";

interface WithCardProps {
  w: WithProps;
  // w === with
  setLastWith: Dispatch<SetStateAction<HTMLAnchorElement | null | undefined>>;
}

const WithCard = ({ w, setLastWith }: WithCardProps) => {
  return (
    <Link
      to="/with/detail"
      state={{
        withId: w.id,
      }}
      ref={setLastWith}
      className="with__link"
    >
      <div className="with-card__container flex">
        <div className="with-title__container">{w.title}</div>
        <div className="flex">
          <div className="with-time__container">{w.expiredAt}</div>
          <div className="with-place__container">{w.place}</div>
        </div>
        <div className="with-preferred-genres__container">{w.genre}</div>
      </div>
    </Link>
  );
};

export default WithCard;
