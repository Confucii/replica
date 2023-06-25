import { useLocation } from "react-router-dom";
import Controls from "./Controls";
import Slider from "./Slider";
import TrackInfo from "./TrackInfo";
import "./styles/Player.css";
import { useRef, useState } from "react";

function Player() {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const location = useLocation();

  const sliderRef = useRef();
  const trackRef = useRef();

  return (
    <div className="Player">
      <TrackInfo
        setDuration={setDuration}
        trackRef={trackRef}
        track={location.state.song}
        sliderRef={sliderRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <Slider trackRef={trackRef} sliderRef={sliderRef} />
      <Controls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        sliderRef={sliderRef}
        duration={duration}
        currentTime={currentTime}
        track={location.state.song}
        trackRef={trackRef}
        setCurrentTime={setCurrentTime}
      />
    </div>
  );
}

export default Player;
