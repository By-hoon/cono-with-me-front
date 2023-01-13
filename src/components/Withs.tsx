import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { isBrowser } from "react-device-detect";
import mainApi from "../apis/mainApi";
import { sortOptions, withsSize } from "../shared/Constants";
import { WithProps } from "../shared/Props";
import Title from "./Title";
import WithCard from "./WithCard";

const Withs = () => {
  const [withs, setWiths] = useState<Array<WithProps>>([]);
  const [page, setPage] = useState(0);
  const [selectedSortOption, setSelectedSortOption] = useState("정렬 없음");
  const [showSortOption, setShowSortOption] = useState(false);

  const sortOptionRef = useRef<HTMLInputElement>(null);

  const changeSortOption = (option: string) => {
    setSelectedSortOption(option);
  };

  const onClickSortOption = () => {
    setShowSortOption((show) => !show);
  };
  const onClickOutSide = (e: any) => {
    if (showSortOption && sortOptionRef.current && !sortOptionRef.current.contains(e.target)) {
      setShowSortOption(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", onClickOutSide);
    return () => {
      document.removeEventListener("click", onClickOutSide);
    };
  });

  useEffect(() => {
    mainApi
      .get(`/recruitments?page=${page}&size=${isBrowser ? withsSize.browser : withsSize.mobile}`, {})
      .then((res) => {
        const response = res.data;
        setWiths(withs.concat(response.recruitmentDto));
      });
  }, [page]);

  return (
    <div className="withs__container flex">
      <Title title={"윗미 목록"} />
      <div className="withs-header__container">
        <div className="selected-sort-option flex" onClick={onClickSortOption} ref={sortOptionRef}>
          {selectedSortOption}
          <Icon icon="material-symbols:keyboard-arrow-down-rounded" />
        </div>
        {showSortOption ? (
          <div className="sort-options__container">
            {sortOptions.map((option) => (
              <div key={option} className="sort-option" onClick={() => changeSortOption(option)}>
                {option}
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {withs.map((w) => (
        <WithCard key={w.id} w={w} />
      ))}
    </div>
  );
};

export default Withs;
