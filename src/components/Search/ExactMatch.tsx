import { AlbumDataTransmute, PureData, SongFullData } from "../../interfaces";
import FoundItem from "./FoundItem";
import "./styles/ExactMatch.css";

function ExactMatch({
  data,
}: {
  data: SongFullData | PureData | AlbumDataTransmute;
}) {
  let type;

  if ("album" in data) {
    type = "song";
  } else if ("artist" in data && !("album" in data)) {
    type = "album";
  } else {
    type = "artist";
  }

  return (
    <div className="ExactMatch">
      <div className="exact-match-name">Top result</div>
      <div className="background">
        <div className="exact-match-container">
          <FoundItem data={data} type={type} />
        </div>
      </div>
    </div>
  );
}

export default ExactMatch;
