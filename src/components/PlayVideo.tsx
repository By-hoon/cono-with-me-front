import { useState } from "react";
import ReactPlayer from "react-player";

interface VideoProps {
  video: { [key: string]: string };
}

const PlayVideo = ({ video }: VideoProps) => {
  const [isMuted, setIsMuted] = useState(true);

  const controlMute = () => {
    setIsMuted((muted: boolean) => !muted);
  };

  return (
    <div className="play-video__container">
      <ReactPlayer url={video.url} playing={true} muted={isMuted} playsinline={true} onClick={controlMute} />
    </div>
  );
};

export default PlayVideo;
