import MixTrack from "./MixTrack";
import "./styles/Mix.css";

function Mix({ mix }: { mix: any }) {
  return (
    <div className="Mix">
      <span className="mix-name">Mix</span>
      <div className="mix-tracks">
        {mix.map((song: any) => {
          return <MixTrack key={song.name} data={song} />;
        })}
      </div>
    </div>
  );
}

export default Mix;
