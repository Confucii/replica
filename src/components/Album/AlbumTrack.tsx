import { useState, useEffect } from "react";
import { calculateTime, capitalize } from "../../utility";
import play from "../images/play.svg";
import "./styles/AlbumTrack.css";
import { useNavigate } from "react-router-dom";
import { SongData } from "../../interfaces";

function AlbumTrack({
  song,
  id,
  album,
  artist,
}: {
  song: SongData;
  id: number;
  artist: string;
  album: string;
}) {
  const [duration, setDuration] = useState<number>(0);

  const nav = useNavigate();

  function handleMainRedirect() {
    nav("/player", {
      state: { song: { ...song, album: album, artist: artist } },
    });
  }

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
  }, [song.audioURL]);

  return (
    <div className="AlbumTrack">
      <div className="album-track-left">
        <img
          onClick={handleMainRedirect}
          className="album-track-play"
          src={play}
          alt="play"
        />
        <div className="album-track-number">{id}</div>
        <div onClick={handleMainRedirect} className="album-track-name">
          {capitalize(song.name)}
        </div>
      </div>
      <div className="album-track-duration">{calculateTime(duration)}</div>
    </div>
  );
}

export default AlbumTrack;
