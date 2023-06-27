import "./styles/Controls.css";
import play from "../images/play.svg";
import pause from "./images/pause.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import TrackDisplay from "./TrackDisplay";
import { calculateTime } from "../../utility";
import VolumeControl from "./VolumeControl";
import { SongFullData } from "../../interfaces";
import skipNext from "./images/skip-next.svg";
import skipPrevious from "./images/skip-previous.svg";

function Controls({
  queueLength,
  queueIndex,
  setQueueIndex,
  trackRef,
  track,
  duration,
  currentTime,
  setCurrentTime,
  sliderRef,
  isPlaying,
  setIsPlaying,
}: {
  queueLength: number;
  queueIndex: number;
  setQueueIndex: Function;
  trackRef: React.MutableRefObject<HTMLAudioElement>;
  track: SongFullData;
  duration: number;
  currentTime: number;
  setCurrentTime: Function;
  sliderRef: React.MutableRefObject<HTMLInputElement>;
  isPlaying: boolean;
  setIsPlaying: Function;
}) {
  const [volume, setVolume] = useState(100);

  const playAnimationRef = useRef(0);

  function nextTrack() {
    if (queueIndex + 1 < queueLength) {
      setQueueIndex((index: number) => index + 1);
      setIsPlaying(true);
    }
  }

  function previousTrack() {
    if (queueIndex - 1 >= 0) {
      setQueueIndex((index: number) => index - 1);
    }
    if (queueIndex - 1 === 0) {
      setIsPlaying(false);
    }
  }

  const repeat = useCallback(() => {
    const currentSeconds = trackRef?.current?.currentTime;
    setCurrentTime(currentSeconds);

    if (sliderRef.current) {
      sliderRef.current.value = `${currentSeconds * 100}`;
    }

    playAnimationRef.current = requestAnimationFrame(repeat);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackRef, duration, sliderRef, setCurrentTime]);

  useEffect(() => {
    if (isPlaying) {
      trackRef.current.play();
    } else {
      trackRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);

    return () => {
      cancelAnimationFrame(playAnimationRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackRef, isPlaying]);

  useEffect(() => {
    if (trackRef) {
      trackRef.current.volume = volume / 100;
    }
  }, [volume, trackRef]);

  const togglePlayPause = () => {
    setIsPlaying((prev: boolean) => !prev);
  };

  return (
    <div className="Controls">
      <div className="controls-btns">
        <img
          onClick={previousTrack}
          className={`controls-img ${queueIndex === 0 && "disabled"}`}
          src={skipPrevious}
          alt="skip-previous"
        />
        <img
          onClick={togglePlayPause}
          className="controls-img"
          src={isPlaying ? pause : play}
          alt="play status"
        />
        <img
          onClick={nextTrack}
          className={`controls-img ${
            queueIndex + 1 === queueLength && "disabled"
          }`}
          src={skipNext}
          alt="skip-next"
        />
        <div className="time">
          <div className="current-time">{calculateTime(currentTime)}</div>
          {"/"}
          <div className="duration">{calculateTime(duration)}</div>
        </div>
      </div>
      <TrackDisplay track={track} />
      <VolumeControl volume={volume} setVolume={setVolume} />
    </div>
  );
}

export default Controls;
