import { SongFullData } from "../../interfaces";
import QueueTrack from "./QueueTrack";
import "./styles/Queue.css";

function Queue({
  setIsPlaying,
  setQueueIndex,
  queue,
  queueIndex,
}: {
  setIsPlaying: Function;
  setQueueIndex: Function;
  queue: SongFullData[];
  queueIndex: number;
}) {
  return (
    <div className="Queue">
      <div className="queue-title">Up next:</div>
      <div className="queue-tracks">
        {queue.map((track: SongFullData, id: number) => {
          return (
            <QueueTrack
              setIsPlaying={setIsPlaying}
              setQueueIndex={setQueueIndex}
              id={id}
              key={id}
              track={track}
              chosen={queueIndex === id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Queue;
