import FoundItem from "./FoundItem";
import "./styles/ExactMatch.css";

function ExactMatch({ data }: { data: any }) {
  let type;

  if (data.album) {
    type = "song";
  } else if (data.artist && !data.album) {
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
