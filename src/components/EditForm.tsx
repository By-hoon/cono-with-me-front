import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LiveData } from "../test/data";

export const EditLiveForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const titleFocus = useRef<HTMLInputElement>(null);
  const contentFocus = useRef<HTMLTextAreaElement>(null);

  const navigate = useNavigate();

  const changeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);
  const changeContent = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);

  const goPreviousPage = () => {
    navigate(-1);
  };
  const editLive = () => {
    // 수정 api 호출
    if (!content) contentFocus.current?.focus();
    if (!title) titleFocus.current?.focus();
  };

  useEffect(() => {
    setTitle(LiveData.title);
    setContent(LiveData.content);
  }, []);

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
        <div className="live-content-input__container">
          <div className="title-input__container">
            <div className="flex">
              <div className="input-title__container">제목</div>
              <input
                type="text"
                value={title}
                placeholder="제목을 입력해 주세요."
                onChange={changeTitle}
                ref={titleFocus}
                required
              />
            </div>
          </div>
          <div className="content-input__container">
            <div className="flex">
              <div className="input-title__container">내용</div>
              <textarea
                placeholder="내용을 입력해 주세요."
                value={content}
                onChange={changeContent}
                ref={contentFocus}
                required
              />
            </div>
          </div>
        </div>
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
