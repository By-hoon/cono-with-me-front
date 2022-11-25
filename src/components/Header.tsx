import { Icon } from "@iconify/react";
import { isBrowser } from "react-device-detect";
import { Link } from "react-router-dom";

interface DetailHeaderProps {
  title: string;
  closeFunction: () => void;
}

export const Header = () => {
  const onSubmitSearch = () => {
    //검색 로직
  };

  return (
    <>
      {isBrowser ? (
        <div className="header__container">
          <div className="logo__container">
            <Link to="/">코노윗미</Link>
          </div>
          <div className="header-category__container">
            <div className="header-category">윗미</div>
            <div className="header-category">라이브</div>
          </div>
          <div className="header-search__container">
            <form onSubmit={onSubmitSearch}>
              <Icon icon="ic:baseline-search" />
              <input
                className="header-search__input"
                type="text"
                name="header-search"
                placeholder="통합 검색"
              />
            </form>
          </div>
          <div className="header-tool__container">
            <div className="profile-link__container">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/myplaylist-783c8.appspot.com/o/KakaoTalk_20210927_025101163.jpg?alt=media&token=4f3c0769-6a1b-40ee-a787-a4fd7e11487f"
                alt="profile-link"
              />
            </div>
            <div className="create-button__container">
              <Icon icon="material-symbols:add-box-rounded" />
              <div className="create-option__container">
                <div className="create-link__container">윗미 생성</div>
                <div className="create-link__container">라이브 생성</div>
              </div>
            </div>
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
