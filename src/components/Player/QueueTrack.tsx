import { useEffect, useState } from "react";
import { SongFullData } from "../../interfaces";
import { calculateTime, capitalize } from "../../utility";
import "./styles/QueueTrack.css";
import fallbackImg from "../images/fallback.png";
import play from "../images/play.svg";

function QueueTrack({
  setIsPlaying,
  track,
  chosen,
  id,
  setQueueIndex,
}: {
  setIsPlaying: Function;
  setQueueIndex: Function;
  track: SongFullData;
  chosen: boolean;
  id: number;
}) {
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    const audio = new Audio();
    audio.src = track.audioURL;

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    // Clean up the event listener
    return () => {
      audio.removeEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });
    };
  }, [track.audioURL]);

  return (
    <div
      className={`QueueTrack ${chosen && "chosen"}`}
      onClick={() => {
        setQueueIndex(id);

        if (id !== 0) {
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
      }}
    >
      <div className="queue-track-left">
        <div
          className="queue-track-img"
          style={{
            backgroundImage: `url("${track.imageURL}"), url("${fallbackImg}")`,
          }}
        >
          <img className="play-btn" src={play} alt="play" />{" "}
        </div>
        <div className="queue-track-name">{capitalize(track.name)}</div>
        <div className="queue-track-artist">{capitalize(track.artist)}</div>
      </div>
      <div className="queue-track-duration">{calculateTime(duration)}</div>
    </div>
  );
}

export default QueueTrack;
