import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mainApi from "../apis/mainApi";
import { SUCCESS } from "../shared/Constants";
import Title from "./common/Title";

const RequestForm = () => {
  const [comment, setComment] = useState("");
  console.log(useLocation().state);
  const withId = useLocation().state.withId as string;

  const navigate = useNavigate();

  const changeComment = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mainApi
      .post(`/recruitment/${withId}/requests`, {
        comment,
      })
      .then((res) => {
        alert(SUCCESS.REQUESTWITH);
        navigate("/with");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="request-form__container">
      <div className="request-with-header__container flex">
        <Title title={"윗미 신청"} />
      </div>
      <form onSubmit={onSubmit}>
        <div className="comment-input__container">
          <textarea
            className="comment__input"
            placeholder="신청 시 함께 보낼 내용을 작성해 주세요."
            value={comment}
            onChange={changeComment}
            required
          />
        </div>
        <div className="submit__container">
          <input type="submit" value="신청하기" />
        </div>
      </form>
    </div>
  );
};

export default RequestForm;
