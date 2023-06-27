import { useNavigate } from "react-router-dom";
import "./styles/TrackDisplay.css";
import { capitalize } from "../../utility";
import test from "../../laser-gun.png";
import { SongFullData } from "../../interfaces";
import notLikedImg from "./images/thumb-up-outline.svg";
import likedImg from "./images/thumb-up.svg";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import {
  addToUserLikes,
  getUserLikedStatus,
  removeFromUserLikes,
} from "../../firebase/firebase";

function TrackDisplay({ track }: { track: SongFullData }) {
  const [liked, setLiked] = useState(false);
  const context = useContext(AppContext);
  const nav = useNavigate();

  function handleLike() {
    if (context.user.uid) {
      if (!liked) {
        addToUserLikes(context.user.uid, track);
        setLiked(true);
      } else {
        removeFromUserLikes(context.user.uid, track);
        setLiked(false);
      }
    }
  }

  useEffect(() => {
    async function loadTrackStatus() {
      if (context.user.uid) {
        const status = await getUserLikedStatus(context.user.uid, track.name);

        setLiked(status);
      }
    }

    loadTrackStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);

  function handleArtistRedirect() {
    nav("/artist", { state: track.artist });
  }

  function handleAlbumRedirect() {
    if (track.album === "single") {
      nav("/artist", { state: track.artist });
    } else {
      nav("/album", { state: { album: track.album, artist: track.artist } });
    }
  }

  return (
    <div className="TrackDisplay">
      <div
        className="player-track-img"
        style={{
          backgroundImage: `url("${test}")`,
          //backgroundImage: `url("${track.imageURL}")`,
        }}
      />
      <div className="player-track-name">{capitalize(track.name)}</div>
      <div className="player-track-sources">
        <div onClick={handleArtistRedirect} className="player-track-artist">
          {capitalize(track.artist)}
        </div>
        {" | "}
        <div onClick={handleAlbumRedirect} className="player-track-album">
          {capitalize(track.album)}
        </div>
      </div>
      <div
        className="like-img-container"
        style={context.user.uid ? undefined : { display: "none" }}
        onClick={handleLike}
      >
        <img
          className="like-img"
          src={liked ? likedImg : notLikedImg}
          alt="like"
        />
      </div>
    </div>
  );
}

export default TrackDisplay;
