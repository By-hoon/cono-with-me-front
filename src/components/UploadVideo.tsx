import { useCallback, useRef, useState } from "react";

interface uploadVideoProps {
  videoFile: {};
  setVideoFile: React.Dispatch<React.SetStateAction<{}>>;
}

const UploadVideo = ({ videoFile, setVideoFile }: uploadVideoProps) => {
  const [videoUrl, setVideoUrl] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const encodeFile = (fileBlob: Blob) => {
    setVideoUrl(URL.createObjectURL(fileBlob));
  };
  const onChangeVideo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const fileBlob = e.target.files[0];
    setVideoFile(fileBlob);
    encodeFile(fileBlob);
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
      <div className="video-input__container">
        <input
          type="file"
          className="display-none"
          ref={inputRef}
          accept="video/mp4,video/mkv, video/x-m4v,video/*"
          onChange={onChangeVideo}
        />
        <button onClick={onUploadImageButtonClick}>비디오 선택</button>
      </div>
      <div className="video-preview__container">
        <div className="video-preview__container">{videoUrl ? <video src={videoUrl} controls /> : null}</div>
      </div>
    </div>
  );
};

export default UploadVideo;