import "./styles/VolumeControl.css";
import volumeImg from "./images/volume-high.svg";
import noVolumeImg from "./images/volume-off.svg";
import { useState } from "react";

function VolumeControl({
  volume,
  setVolume,
}: {
  volume: number;
  setVolume: Function;
}) {
  const [isMute, setIsMute] = useState(false);
  const [tempVolume, setTempVolume] = useState(volume);

  function muteHandler() {
    if (isMute) {
      setVolume(tempVolume);
    } else {
      setVolume(0);
      setTempVolume(volume);
    }

    setIsMute((mute) => !mute);
  }

  return (
    <div className="VolumeControl">
      <img
        className="volume-img"
        src={isMute ? noVolumeImg : volumeImg}
        alt="volume"
        onClick={muteHandler}
      />
      <input
        className="volume-slider"
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
      />
    </div>
  );
}

export default VolumeControl;
