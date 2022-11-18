interface VideoProps {
  video: { [key: string]: string };
}

const PlayVideo = ({ video }: VideoProps) => {
  return (
    <div className="play-video__container">
      <video src={video["url"]} autoPlay loop />
    </div>
  );
};

export default PlayVideo;
