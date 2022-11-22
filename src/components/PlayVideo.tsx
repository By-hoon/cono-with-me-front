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
    <div className="play-video__container">
      <ReactPlayer
        url={video?.url}
        ref={videoRef}
        playing={true}
        muted={isMuted}
        playsinline={true}
        onProgress={(progress) => setCurrentTime(progress.playedSeconds)}
        onClick={controlMute}
      />
      <div className="video-seek__container">
        <input
          type="range"
          className="video-seek"
          min={0}
          max={videoRef.current?.getDuration()}
          value={currentTime}
          onChange={onChangeCurrentTime}
        />
      </div>
    </div>
  );
};

export default PlayVideo;
