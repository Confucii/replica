import "./styles/ArtistTrack.css";
import play from "../images/play.svg";
import { calculateTime, capitalize } from "../../utility";
import fallbackImg from "../images/fallback.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SongDataTransmute } from "../../interfaces";

function ArtistTrack({
  song,
  artist,
  duration,
}: {
  song: SongDataTransmute;
  artist: string;
  duration: boolean;
}) {
  const nav = useNavigate();
  const [durationValue, setDurationValue] = useState(0);

  useEffect(() => {
    if (duration) {
      const audio = new Audio();
      audio.src = song.audioURL;

      audio.addEventListener("loadedmetadata", () => {
        setDurationValue(audio.duration);
      });

      // Clean up the event listener
      return () => {
        audio.removeEventListener("loadedmetadata", () => {
          setDurationValue(audio.duration);
        });
      };
    }
  }, [duration, song.audioURL]);

  function handleRedirectSource() {
    if (song.album === "single") {
      nav("/artist", { state: artist });
    } else {
      nav("/album", { state: { album: song.album, artist: artist } });
    }
  }

  function handleRedirectArtist() {
    nav("/artist", { state: artist });
  }

  function handleMainRedirect() {
    nav("/player", {
      state: { song: { ...song, album: song.album, artist: artist } },
    });
  }

  return (
    <div className="ArtistTrack">
      <div className="artist-track-left">
        <div
          onClick={handleMainRedirect}
          className="artist-track-image"
          style={{
            backgroundImage: `url("${song.imageURL}"), url("${fallbackImg}")`,
          }}
        >
          <img className="artist-track-play" src={play} alt="play" />
        </div>
        <div onClick={handleMainRedirect} className="artist-track-name">
          {capitalize(song.name)}
        </div>
      </div>
      <div className="artist-track-artist" onClick={handleRedirectArtist}>
        {capitalize(artist)}
      </div>
      <div className="artist-track-album" onClick={handleRedirectSource}>
        {capitalize(song.album)}
      </div>
      {duration && (
        <div className="artist-track-duration">
          {calculateTime(durationValue)}
        </div>
      )}
    </div>
  );
}

export default ArtistTrack;
