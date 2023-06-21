import { capitalize } from "../../utility";
import "./styles/MixTrack.css";
import test from "../../laser-gun.png";
import play from "../recurring/images/play.svg";

function MixTrack({ track }: { track: any }) {
  return (
    <div className="MixTrack">
      <div
        className="mix-track-img"
        // change to imageURL
        style={{
          backgroundImage: `url("${test}")`,
        }}
      >
        <img className="play-btn" src={play} alt="play" />
      </div>
      <div className="mix-track-name">{capitalize(track.name)}</div>
      <div className="mix-track-sources">
        <div data-artist={track.artist} className="mix-track-artist">
          {capitalize(track.artist)}
        </div>
        {" | "}
        <div
          data-artist={track.artist}
          data-album={track.source}
          className="mix-track-album"
        >
          {capitalize(track.source)}
        </div>
      </div>
    </div>
  );
}

export default MixTrack;
