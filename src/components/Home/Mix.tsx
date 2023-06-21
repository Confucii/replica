import MixTrack from "./MixTrack";
import "./styles/Mix.css";

function Mix({ mix }: { mix: any }) {
  return (
    <div className="Mix">
      <span className="mix-name">Mix</span>
      <div className="mix-tracks">
        {mix.map((track: any) => {
          return <MixTrack key={track.name} track={track} />;
        })}
      </div>
    </div>
  );
}

export default Mix;
