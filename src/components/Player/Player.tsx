import Controls from "./Controls";
import Slider from "./Slider";
import PlayerInfo from "./PlayerInfo";
import "./styles/Player.css";
import { useEffect, useRef, useState } from "react";
import { SongFullData } from "../../interfaces";
import { useLocation } from "react-router-dom";

function Player({
  queue,
  setQueue,
}: {
  queue: SongFullData[];
  setQueue: Function;
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queueIndex, setQueueIndex] = useState<number>(0);

  const location = useLocation();

  useEffect(() => {
    location.state.song
      ? setQueue([location.state.song])
      : setQueue(location.state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sliderRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const trackRef = useRef<HTMLAudioElement>({} as HTMLAudioElement);

  return (
    <div className="Player">
      {queue.length > 0 && (
        <PlayerInfo
          setQueueIndex={setQueueIndex}
          queueIndex={queueIndex}
          queue={queue}
          setDuration={setDuration}
          trackRef={trackRef}
          track={queue[queueIndex]}
          sliderRef={sliderRef}
          setIsPlaying={setIsPlaying}
        />
      )}
      <Slider trackRef={trackRef} sliderRef={sliderRef} />
      {queue.length > 0 && (
        <Controls
          queueLength={queue.length}
          queueIndex={queueIndex}
          setQueueIndex={setQueueIndex}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          sliderRef={sliderRef}
          duration={duration}
          currentTime={currentTime}
          track={queue[queueIndex]}
          trackRef={trackRef}
          setCurrentTime={setCurrentTime}
        />
      )}
    </div>
  );
}

export default Player;
