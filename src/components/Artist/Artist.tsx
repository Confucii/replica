import { useLocation } from "react-router-dom";
import "./styles/Artist.css";
import { capitalize } from "../../utility";

function Artist() {
  const location = useLocation();

  return <div className="Artist">{capitalize(location.state)}</div>;
}

export default Artist;
