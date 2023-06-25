import "./styles/TrackInfo.css";
import test from "../../laser-gun.png";

function TrackInfo({
  track,
  trackRef,
  setDuration,
  sliderRef,
  isPlaying,
  setIsPlaying,
}: {
  track: any;
  trackRef: any;
  setDuration: Function;
  sliderRef: any;
  isPlaying: boolean;
  setIsPlaying: Function;
}) {
  function handleLoad() {
    const seconds = trackRef.current.duration;
    setDuration(seconds);

    sliderRef.current.max = seconds * 100;
  }

  function handleEnd() {
    setIsPlaying((prev: boolean) => !prev);
  }

  return (
    <div className="TrackInfo">
      <div
        className="track-info-image"
        style={{
          backgroundImage: `url("${test}")`,
          //backgroundImage: `url("${data.imageURL}")`,
        }}
      />
      <audio
        src={track.audioURL}
        ref={trackRef}
        onLoadedMetadata={handleLoad}
        onEnded={handleEnd}
      />
    </div>
  );
}

export default TrackInfo;
