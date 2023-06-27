import "./styles/PlayerInfo.css";
import test from "../../laser-gun.png";
import { SongFullData } from "../../interfaces";
import Queue from "./Queue";

function PlayerInfo({
  setQueueIndex,
  queueIndex,
  queue,
  track,
  trackRef,
  setDuration,
  sliderRef,
  setIsPlaying,
}: {
  setQueueIndex: Function;
  queueIndex: number;
  queue: SongFullData[];
  track: SongFullData;
  trackRef: React.MutableRefObject<HTMLAudioElement>;
  setDuration: Function;
  sliderRef: React.MutableRefObject<HTMLInputElement>;
  setIsPlaying: Function;
}) {
  function handleMetaLoad() {
    const seconds = trackRef.current.duration;
    setDuration(seconds);
    sliderRef.current.max = `${seconds * 100}`;
  }

  function handleEnd() {
    if (queueIndex + 1 < queue.length) {
      setQueueIndex((index: number) => index + 1);
    } else {
      setIsPlaying((prev: boolean) => !prev);
    }
  }

  return (
    <div className="PlayerInfo">
      <div
        className="player-info-image"
        style={{
          backgroundImage: `url("${test}")`,
          //backgroundImage: `url("${data.imageURL}")`,
        }}
      />
      <Queue
        setIsPlaying={setIsPlaying}
        setQueueIndex={setQueueIndex}
        queueIndex={queueIndex}
        queue={queue}
      />
      {queueIndex === 0 ? (
        <audio
          src={track.audioURL}
          ref={trackRef}
          onLoadedMetadata={handleMetaLoad}
          onEnded={handleEnd}
        />
      ) : (
        <audio
          src={track.audioURL}
          ref={trackRef}
          onLoadedMetadata={handleMetaLoad}
          onEnded={handleEnd}
          autoPlay
        />
      )}
    </div>
  );
}

export default PlayerInfo;
