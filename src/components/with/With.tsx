import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mainApi from "../../apis/mainApi";
import { WithProps } from "../../shared/Props";

const With = () => {
  const [w, setW] = useState<WithProps>();

  const withId = useLocation().state.withId as string;
  const navigate = useNavigate();

  const formattingTime = (order: string, time: string) => {
    if (order === "fullTime") {
      const timeSplit = time.split("T");
      const targetDate = timeSplit[0].split("-");
      const targetTime = timeSplit[1].split(":").map((string) => Number(string));
      const year = targetDate[0].split("").slice(2, 4).join("");
      const month = targetDate[1];
      const date = targetDate[2];
      const hour = targetTime[0] > 12 ? `오후 ${targetTime[0] - 12}` : `오전 ${targetTime[0]}`;
      const minute = targetTime[1];
      return `${year}년 ${month}월 ${date}일 ${hour}시 ${minute}분`;
    }
    if (order === "remainTime") {
      const remainTime = Math.floor(moment(time).diff(moment()) / 60000);
      const remainHour = Math.floor(remainTime / 60);
      const remainMinute = remainTime % 60;
      return `${remainHour}시간 ${remainMinute}분`;
    }
    return null;
  };

  useEffect(() => {
    mainApi
      .get(`/recruitments/${withId}`, {})
      .then((res) => {
        const response: WithProps = res.data;
        setW(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="with__container">
      <div className="with-title__container">
        <div className="with-title">{w?.title}</div>
      </div>
      <div className="with-time__container">
        <div className="with-start-time">{w ? formattingTime("fullTime", w.startedAt) : null}</div>
      </div>
      <div className="with-place__container">
        <div className="with-place">{w?.place}</div>
      </div>
      <div className="with-participant__container">
        <div className="with-participant">{w?.participant}</div>
      </div>
      <div className="with-genre__container">
        <div className="with-genre">{w?.genre}</div>
      </div>
      <div className="with-content__container">
        <div className="with-content">{w?.content}</div>
      </div>
      <div className="remain-time__container">
        <div className="with-start-time">마감 {w ? formattingTime("remainTime", w.expiredAt) : null}전</div>
      </div>
      <div className="with-request__container">
        <button
          className="with-request__button"
          onClick={() => {
            navigate("/with/request", { state: { withId: withId } });
          }}
        >
          신청
        </button>
        <button
          className="with-cancel__button"
          onClick={() => {
            navigate(-1);
          }}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default With;
