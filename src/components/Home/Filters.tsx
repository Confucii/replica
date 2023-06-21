import "./styles/Filters.css";
import { downcase } from "../../utility";

function Filters({ filter, setFilter }: { filter: any; setFilter: Function }) {
  function handleClick(e: React.MouseEvent<HTMLElement>) {
    const elementText = downcase(e.currentTarget.textContent || "error");
    if (filter !== elementText) {
      document.querySelector(".chosen")?.classList.remove("chosen");
      e.currentTarget.classList.add("chosen");
      setFilter(elementText);
    } else {
      e.currentTarget.classList.remove("chosen");
      setFilter(false);
    }
  }

  return (
    <div className="Filters">
      <div onClick={handleClick} className="filter">
        Bath
      </div>
      <div onClick={handleClick} className="filter">
        Kitchen
      </div>
      <div onClick={handleClick} className="filter">
        Terrace
      </div>
      <div onClick={handleClick} className="filter">
        Playroom
      </div>
      <div onClick={handleClick} className="filter">
        Misc
      </div>
    </div>
  );
}

export default Filters;
