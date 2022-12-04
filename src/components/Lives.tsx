import { useEffect, useState } from "react";
import { LiveCardProps } from "../shared/Props";
import { LivesData } from "../test/data";
import LiveCard from "./LiveCard";

const Lives = () => {
  const [lives, setLives] = useState<Array<LiveCardProps>>();
  useEffect(() => {
    setLives(LivesData);
  }, []);
  return (
    <div className="lives__container flex">
      {lives?.map((live) => (
        <LiveCard key={live.id} id={live.id} title={live.title} thumbnail={live.thumbnail} />
      ))}
    </div>
  );
};

export default Lives;
