import { Icon } from "@iconify/react";
import { isBrowser } from "react-device-detect";
import { Link } from "react-router-dom";

interface DetailHeaderProps {
  title: string;
  closeFunction: () => void;
}

export const Header = () => {
  return (
    <>
      {isBrowser ? (
        <div className="header__container">
          <div className="logo__container">
            <Link to="/">코노윗미</Link>
          </div>
        </div>
      ) : (
        <div className="mobile-header__container">mobile</div>
      )}
    </>
  );
};

export const DetailHeader = ({ title, closeFunction }: DetailHeaderProps) => {
  return (
    <div className="flex">
      <div className="detail-title">{title}</div>
      <div className="cancel-icon__container" onClick={closeFunction}>
        <Icon icon="material-symbols:close" />
      </div>
    </div>
  );
};
