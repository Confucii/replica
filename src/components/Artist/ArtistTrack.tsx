import "./styles/ArtistTrack.css";
import play from "../recurring/images/play.svg";
import { calculateTime, capitalize } from "../../utility";
import test from "../../laser-gun.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ArtistTrack({
  song,
  artistName,
  duration,
}: {
  song: any;
  artistName: any;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleRedirectSource() {
    if (song.album === "single") {
      nav("/artist", { state: artistName });
    } else {
      nav("/album", { state: { album: song.album, artist: artistName } });
    }
  }

  function handleRedirectArtist() {
    nav("/artist", { state: artistName });
  }

  return (
    <div className="ArtistTrack">
      <div className="artist-track-left">
        <div
          className="artist-track-image"
          style={{
            backgroundImage: `url('${test}')`,
            //backgroundImage: `url('${song.imageURL}')`,
          }}
        >
          <img className="artist-track-play" src={play} alt="play" />
        </div>
        <div className="artist-track-name">{capitalize(song.name)}</div>
      </div>
      <div className="artist-track-artist" onClick={handleRedirectArtist}>
        {capitalize(artistName)}
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
