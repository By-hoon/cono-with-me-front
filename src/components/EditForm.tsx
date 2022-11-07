import { useNavigate } from "react-router-dom";

export const EditLiveForm = () => {
  const navigate = useNavigate();
  const goPreviousPage = () => {
    navigate(-1);
  };
  const editLive = () => {
    // 수정 api 호출
  };
  return (
    <div className="edit__container">
      <div className="edit-upload-video__container">
        <div className="edit-header">
          <span className="edit__span">동영상 수정</span>
        </div>
        {/* 동영상 업로드 컴포넌트 */}
      </div>
      <div className="edit-song__container">
        <div className="edit-header">
          <span className="edit__span">노래 수정</span>
        </div>
        {/* 노래 검색 컴포넌트 */}
      </div>
      <div className="edit-content__container">
        <div className="edit-header">
          <span className="edit__span">내용 수정</span>
        </div>
        {/* 내용 수정 요소 */}
      </div>
      <div className="button__container">
        <button className="cancle__button" onClick={goPreviousPage}>
          취소
        </button>
        <button className="submit__button" onClick={editLive}>
          수정
        </button>
      </div>
    </div>
  );
};
