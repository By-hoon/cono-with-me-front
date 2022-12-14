import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { sortOptions } from "../shared/Constants";
import { LiveCardProps } from "../shared/Props";
import { LivesData } from "../test/data";
import LiveCard from "./LiveCard";
import Title from "./Title";

const Lives = () => {
  const [lives, setLives] = useState<Array<LiveCardProps>>();
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
    setLives(LivesData);
  }, []);
  return (
    <div className="lives__container flex">
      <div className="lives-header__container flex">
        <Title title={"라이브 목록"} />
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
      {lives?.map((live) => (
        <LiveCard key={live.id} id={live.id} title={live.title} thumbnail={live.thumbnail} />
      ))}
    </div>
  );
};

export default Lives;
