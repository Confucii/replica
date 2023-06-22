import { useState, useEffect } from "react";
import { calculateTime, capitalize } from "../../utility";
import play from "../recurring/images/play.svg";
import "./styles/AlbumTrack.css";

function AlbumTrack({ song, id }: { song: any; id: number }) {
  const [duration, setDuration] = useState<any>(0);

  useEffect(() => {
    const audio = new Audio();
    audio.src = song.audioURL;

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    // Clean up the event listener
    return () => {
      audio.removeEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="AlbumTrack">
      <div className="album-track-left">
        <img className="album-track-play" src={play} alt="play" />
        <div className="album-track-number">{id}</div>
        <div className="album-track-name">{capitalize(song.name)}</div>
      </div>
      <div className="album-track-duration">{calculateTime(duration)}</div>
    </div>
  );
}

export default AlbumTrack;
