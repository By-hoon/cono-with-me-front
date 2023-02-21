import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mainApi from "../../apis/mainApi";
import { WithProps } from "../../shared/Props";

const With = () => {
  const [w, setW] = useState<WithProps>();

  const withId = useLocation().state.withId as string;
  const navigate = useNavigate();

  const openRequestForm = () => {};

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
        <div className="with-start-time">{w?.startedAt}</div>
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
          className="with-cancle__button"
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
