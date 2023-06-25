import "./styles/NoResults.css";
import magnify from "../images/magnify.svg";

function NoResults({ search }: { search: string }) {
  return (
    <div className="NoResults">
      <img className="no-results-image" src={magnify} alt="magnifying glass" />
      <span className="no-results-text">{`No results for ${search}.`}</span>
      <span>Try different keywords</span>
    </div>
  );
}

export default NoResults;
