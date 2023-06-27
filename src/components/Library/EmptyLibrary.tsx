import "./styles/EmptyLibrary.css";
import note from "./images/music-note.svg";

function EmptyLibrary() {
  return (
    <div className="EmptyLibrary">
      <img className="empty-library-image" src={note} alt="music note" />
      <span className="empty-library-text">No content yet</span>
      <span>Liked content will be displayed here</span>
    </div>
  );
}

export default EmptyLibrary;
