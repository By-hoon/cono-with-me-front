import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { isBrowser } from "react-device-detect";
import { Link, useLocation } from "react-router-dom";
import useControlRenderingByClick from "../../hooks/useControlRenderingByClick";

interface DetailHeaderProps {
  title: string;
  closeFunction: () => void;
}

export const Header = () => {
  const [showBehindSearch, setShowBehindSearch] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const {
    show: showProfileMenu,
    ref: profileRef,
    onClickTarget: onClickProfileMenu,
  } = useControlRenderingByClick();
  const {
    show: showCreateMenu,
    ref: createRef,
    onClickTarget: onClickCreateMenu,
  } = useControlRenderingByClick();
  const { show: showSidebar, ref: sidebarRef, onClickTarget: onClickSidebar } = useControlRenderingByClick();

  const location = useLocation();

  const onSubmitSearch = () => {
    //검색 로직
  };

  const appearBehindSearch = () => {
    setShowBehindSearch(true);
  };
  const disappearBehindSearch = () => {
    setShowBehindSearch(false);
  };

  useEffect(() => {
    const locationSplit = location.pathname.split("/");
    const locationKeyword = locationSplit.pop() || "home";
    setCurrentLocation(locationKeyword);
  }, [location]);

  return (
    <div className="header">
      {isBrowser ? (
        <div className="header__container flex">
          <div className="header-left__container flex">
            <div className="logo__container">
              <Link to="/">코노윗미</Link>
            </div>
            <div className="header-category__container flex">
              <Link
                to="/with"
                className={` ${currentLocation === "with" ? "header-category--current" : "header-category"}`}
              >
                윗미
              </Link>
              <Link
                to="/live"
                className={` ${currentLocation === "live" ? "header-category--current" : "header-category"}`}
              >
                라이브
              </Link>
            </div>
          </div>
          <div className="header-right__container flex">
            <div className="header-search__container">
              <form onSubmit={onSubmitSearch} className="flex">
                <Icon icon="ic:baseline-search" />
                <input
                  className="header-search__input"
                  type="text"
                  name="header-search"
                  placeholder="통합 검색"
                  autoComplete="off"
                />
              </form>
            </div>
            <div className="header-tool__container flex">
              <div className="header-profile-image__container" ref={profileRef}>
                <img
                  className="header-profile__img"
                  src="https://firebasestorage.googleapis.com/v0/b/myplaylist-783c8.appspot.com/o/KakaoTalk_20210927_025101163.jpg?alt=media&token=4f3c0769-6a1b-40ee-a787-a4fd7e11487f"
                  alt="profile-link"
                  onClick={onClickProfileMenu}
                />
                {showProfileMenu ? (
                  <div className="header-profile-menu__container flex">
                    <Link to="/my" className="header-profile-menu">
                      마이페이지
                    </Link>
                    <div className="header-profile-menu">로그아웃</div>
                  </div>
                ) : null}
              </div>
              <div className="create-button__container" ref={createRef}>
                <button className="create__button" onClick={onClickCreateMenu}>
                  글쓰기 <Icon icon="material-symbols:keyboard-arrow-down-rounded" />
                </button>
                {showCreateMenu ? (
                  <div className="create-option__container flex">
                    <Link to="/with/create" className="create-link__container">
                      윗미 생성
                    </Link>
                    <Link to="/live/create" className="create-link__container">
                      라이브 생성
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="header__container flex">
          <div className="header-icon__container" onClick={onClickSidebar} ref={sidebarRef}>
            <Icon icon="material-symbols:menu-rounded" />
            {showSidebar ? (
              <div className="background">
                <div className="sidebar__container">
                  <div className="sidebar-header__container flex">
                    <div className="sidebar-logo__container">
                      <Link to="/">코노윗미</Link>
                    </div>
                    <div className="sidebar-profile-image__container">
                      <img
                        className="sidebar-profile__image"
                        src="https://firebasestorage.googleapis.com/v0/b/myplaylist-783c8.appspot.com/o/KakaoTalk_20210927_025101163.jpg?alt=media&token=4f3c0769-6a1b-40ee-a787-a4fd7e11487f"
                        alt="profile-link"
                      />
                    </div>
                  </div>
                  <div className="sidebar-profile-menu__container flex">
                    <Link to="/my" className="sidebar-profile-menu">
                      마이페이지
                    </Link>
                    <div className="sidebar-profile-menu">로그아웃</div>
                  </div>
                  <div className="sidebar-category__container flex">
                    <Link
                      to="/with"
                      className={` ${
                        currentLocation === "with" ? "sidebar-category--current" : "sidebar-category"
                      }`}
                    >
                      윗미
                    </Link>
                    <Link
                      to="/live"
                      className={` ${
                        currentLocation === "live" ? "sidebar-category--current" : "sidebar-category"
                      }`}
                    >
                      라이브
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="logo__container">
            <Link to="/">코노윗미</Link>
          </div>
          <div className="flex">
            <div className="header-search__foward">
              <div className="header-icon__container" onClick={appearBehindSearch}>
                <Icon icon="ic:baseline-search" />
              </div>
              {showBehindSearch ? (
                <div className="background">
                  <div className="header-search__container--behind flex">
                    <div className="header-search__container">
                      <form onSubmit={onSubmitSearch} className="flex">
                        <Icon icon="ic:baseline-search" />
                        <input
                          className="header-search__input"
                          type="text"
                          name="header-search"
                          placeholder="통합 검색"
                        />
                      </form>
                    </div>
                    <div className="header-search-cancel__container flex">
                      <span onClick={disappearBehindSearch}>취소</span>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="header-icon__container" ref={createRef}>
              <Icon icon="material-symbols:add-box-rounded" onClick={onClickCreateMenu} />
              {showCreateMenu ? (
                <div className="create-option__container flex">
                  <Link to="/with/create" className="create-link__container">
                    윗미 생성
                  </Link>
                  <Link to="/live/create" className="create-link__container">
                    라이브 생성
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const DetailHeader = ({ title, closeFunction }: DetailHeaderProps) => {
  return (
    <div className="">
      <div className="detail-title">{title}</div>
      <div className="cancel-icon__container" onClick={closeFunction}>
        <Icon icon="material-symbols:close" />
      </div>
    </div>
  );
};
