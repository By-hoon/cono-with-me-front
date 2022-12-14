import { useCallback, useRef, useState } from "react";
import ReactPlayer from "react-player";

interface VideoProps {
  video?: { [key: string]: string };
}

const PlayVideo = ({ video }: VideoProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  const videoRef = useRef<ReactPlayer>(null);

  const controlMute = () => {
    setIsMuted((muted: boolean) => !muted);
  };
  const onChangeCurrentTime = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const valueToNumber = Number(e.target.value);
    setCurrentTime(valueToNumber);
    videoRef.current?.seekTo(valueToNumber);
  }, []);

  return (
    <>
      <ReactPlayer
        className="play-video__container"
        width={"100%"}
        height={"100%"}
        url={video?.url}
        ref={videoRef}
        playing={true}
        muted={isMuted}
        playsinline={true}
        onProgress={(progress) => setCurrentTime(progress.playedSeconds)}
        onClick={controlMute}
      ></ReactPlayer>
      <div className="video-seek__container">
        <input
          type="range"
          className="video-seek"
          min={0}
          max={String(Math.ceil(Number(videoRef.current?.getDuration())))}
          value={currentTime}
          onChange={onChangeCurrentTime}
        />
      </div>
    </>
  );
};

export default PlayVideo;
