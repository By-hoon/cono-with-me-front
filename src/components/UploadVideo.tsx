import { useCallback, useRef, useState } from "react";

interface uploadVideoProps {
  videoFile: {};
  setVideoFile: React.Dispatch<React.SetStateAction<{}>>;
}

const UploadVideo = ({ videoFile, setVideoFile }: uploadVideoProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onChangeVideo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setVideoFile(e.target.files[0]);
  }, []);
  const onUploadImageButtonClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);
  return (
    <div className="video-upload__container">
      <input
        type="file"
        className="display-none"
        ref={inputRef}
        accept="video/mp4,video/mkv, video/x-m4v,video/*"
        onChange={onChangeVideo}
      />
      <button onClick={onUploadImageButtonClick}>비디오 선택</button>
    </div>
  );
};

export default UploadVideo;
